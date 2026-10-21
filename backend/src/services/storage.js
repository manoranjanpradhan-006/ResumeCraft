import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { User } from '../models/User.js';
import { Resume } from '../models/Resume.js';
import { Application } from '../models/Application.js';

let MongoUser = null;
let MongoResume = null;
let MongoApplication = null;
let isMongoConnected = false;

// Initialize MongoDB connection if URI provided
export async function initDatabase() {
  if (config.mongodbUri) {
    try {
      console.log('Connecting to MongoDB at:', config.mongodbUri.replace(/:[^:]*@/, ':****@'));
      await mongoose.connect(config.mongodbUri, {
        serverSelectionTimeoutMS: 5000
      });
      MongoUser = User;
      MongoResume = Resume;
      MongoApplication = Application;
      isMongoConnected = true;
      console.log(' Successfully connected to MongoDB Database!');
      return;
    } catch (err) {
      console.warn(' MongoDB connection failed or timed out:', err.message);
      console.log(' Falling back to zero-configuration Local JSON Data Store (instant local mode).');
    }
  } else {
    console.log(' No MONGODB_URI configured. Using zero-config Local JSON Data Store.');
    console.log(' To connect free cloud MongoDB, set MONGODB_URI in backend/.env');
  }

  ensureLocalStore();
}

// Local File Store Fallback
function ensureLocalStore() {
  const dir = path.dirname(config.dataFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(config.dataFile)) {
    fs.writeFileSync(
      config.dataFile,
      JSON.stringify({ users: [], resumes: [], applications: [] }, null, 2),
      'utf8'
    );
  }
}

function readLocalStore() {
  ensureLocalStore();
  try {
    const raw = fs.readFileSync(config.dataFile, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.applications) parsed.applications = [];
    return parsed;
  } catch (err) {
    console.error('Error reading local store:', err);
    return { users: [], resumes: [], applications: [] };
  }
}

function writeLocalStore(data) {
  ensureLocalStore();
  fs.writeFileSync(config.dataFile, JSON.stringify(data, null, 2), 'utf8');
}

// User Storage Operations
export const userStore = {
  async findByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoConnected && MongoUser) {
      const u = await MongoUser.findOne({ email: cleanEmail });
      return u ? { id: u._id.toString(), email: u.email, name: u.name, passwordHash: u.passwordHash, createdAt: u.createdAt } : null;
    }
    const store = readLocalStore();
    return store.users.find(u => u.email === cleanEmail) || null;
  },

  async findById(id) {
    if (isMongoConnected && MongoUser) {
      const u = await MongoUser.findById(id);
      return u ? { id: u._id.toString(), email: u.email, name: u.name, createdAt: u.createdAt } : null;
    }
    const store = readLocalStore();
    const u = store.users.find(u => u.id === id);
    if (!u) return null;
    const { passwordHash, ...rest } = u;
    return rest;
  },

  async create({ email, passwordHash, name }) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoConnected && MongoUser) {
      const u = await MongoUser.create({ email: cleanEmail, passwordHash, name });
      return { id: u._id.toString(), email: u.email, name: u.name, createdAt: u.createdAt };
    }
    const store = readLocalStore();
    const newUser = {
      id: crypto.randomUUID(),
      email: cleanEmail,
      passwordHash,
      name: name || cleanEmail.split('@')[0],
      createdAt: new Date().toISOString()
    };
    store.users.push(newUser);
    writeLocalStore(store);
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  }
};

// Resume Storage Operations
export const resumeStore = {
  async listByUser(userId) {
    if (isMongoConnected && MongoResume) {
      const items = await MongoResume.find({ userId }).sort({ updatedAt: -1 });
      return items.map(r => ({
        id: r._id.toString(),
        userId: r.userId,
        title: r.title,
        template: r.template,
        data: r.data,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      }));
    }
    const store = readLocalStore();
    return store.resumes
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  async getById(id, userId) {
    if (isMongoConnected && MongoResume) {
      const r = await MongoResume.findOne({ _id: id, userId });
      if (!r) return null;
      return {
        id: r._id.toString(),
        userId: r.userId,
        title: r.title,
        template: r.template,
        data: r.data,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      };
    }
    const store = readLocalStore();
    return store.resumes.find(r => r.id === id && r.userId === userId) || null;
  },

  async create({ userId, title, template, data }) {
    if (isMongoConnected && MongoResume) {
      const r = await MongoResume.create({
        userId,
        title: title || 'Untitled Resume',
        template: template || 'ats',
        data: data || {},
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return {
        id: r._id.toString(),
        userId: r.userId,
        title: r.title,
        template: r.template,
        data: r.data,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      };
    }
    const store = readLocalStore();
    const newResume = {
      id: crypto.randomUUID(),
      userId,
      title: title || 'Untitled Resume',
      template: template || 'ats',
      data: data || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.resumes.push(newResume);
    writeLocalStore(store);
    return newResume;
  },

  async update(id, userId, updates) {
    if (isMongoConnected && MongoResume) {
      const r = await MongoResume.findOneAndUpdate(
        { _id: id, userId },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
      if (!r) return null;
      return {
        id: r._id.toString(),
        userId: r.userId,
        title: r.title,
        template: r.template,
        data: r.data,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt
      };
    }
    const store = readLocalStore();
    const index = store.resumes.findIndex(r => r.id === id && r.userId === userId);
    if (index === -1) return null;
    store.resumes[index] = {
      ...store.resumes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.resumes[index];
  },

  async delete(id, userId) {
    if (isMongoConnected && MongoResume) {
      const res = await MongoResume.deleteOne({ _id: id, userId });
      return res.deletedCount > 0;
    }
    const store = readLocalStore();
    const initialLen = store.resumes.length;
    store.resumes = store.resumes.filter(r => !(r.id === id && r.userId === userId));
    const deleted = store.resumes.length < initialLen;
    if (deleted) {
      writeLocalStore(store);
    }
    return deleted;
  }
};

// Application Tracking Operations
export const applicationStore = {
  async listByUser(userId) {
    if (isMongoConnected && MongoApplication) {
      const items = await MongoApplication.find({ userId }).sort({ updatedAt: -1 });
      return items.map(a => ({
        id: a._id.toString(),
        userId: a.userId,
        company: a.company,
        position: a.position,
        location: a.location,
        salary: a.salary,
        status: a.status,
        appliedDate: a.appliedDate,
        jobUrl: a.jobUrl,
        resumeUsed: a.resumeUsed,
        notes: a.notes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      }));
    }
    const store = readLocalStore();
    return (store.applications || [])
      .filter(a => a.userId === userId)
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
  },

  async getById(id, userId) {
    if (isMongoConnected && MongoApplication) {
      const a = await MongoApplication.findOne({ _id: id, userId });
      if (!a) return null;
      return {
        id: a._id.toString(),
        userId: a.userId,
        company: a.company,
        position: a.position,
        location: a.location,
        salary: a.salary,
        status: a.status,
        appliedDate: a.appliedDate,
        jobUrl: a.jobUrl,
        resumeUsed: a.resumeUsed,
        notes: a.notes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      };
    }
    const store = readLocalStore();
    return (store.applications || []).find(a => a.id === id && a.userId === userId) || null;
  },

  async create({ userId, company, position, location, salary, status, appliedDate, jobUrl, resumeUsed, notes }) {
    if (isMongoConnected && MongoApplication) {
      const a = await MongoApplication.create({
        userId,
        company,
        position,
        location: location || '',
        salary: salary || '',
        status: status || 'applied',
        appliedDate: appliedDate || new Date().toISOString().split('T')[0],
        jobUrl: jobUrl || '',
        resumeUsed: resumeUsed || 'Default Resume',
        notes: notes || ''
      });
      return {
        id: a._id.toString(),
        userId: a.userId,
        company: a.company,
        position: a.position,
        location: a.location,
        salary: a.salary,
        status: a.status,
        appliedDate: a.appliedDate,
        jobUrl: a.jobUrl,
        resumeUsed: a.resumeUsed,
        notes: a.notes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      };
    }
    const store = readLocalStore();
    if (!store.applications) store.applications = [];
    const newApp = {
      id: crypto.randomUUID(),
      userId,
      company,
      position,
      location: location || '',
      salary: salary || '',
      status: status || 'applied',
      appliedDate: appliedDate || new Date().toISOString().split('T')[0],
      jobUrl: jobUrl || '',
      resumeUsed: resumeUsed || 'Default Resume',
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.applications.push(newApp);
    writeLocalStore(store);
    return newApp;
  },

  async update(id, userId, updates) {
    if (isMongoConnected && MongoApplication) {
      const a = await MongoApplication.findOneAndUpdate(
        { _id: id, userId },
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
      if (!a) return null;
      return {
        id: a._id.toString(),
        userId: a.userId,
        company: a.company,
        position: a.position,
        location: a.location,
        salary: a.salary,
        status: a.status,
        appliedDate: a.appliedDate,
        jobUrl: a.jobUrl,
        resumeUsed: a.resumeUsed,
        notes: a.notes,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      };
    }
    const store = readLocalStore();
    if (!store.applications) store.applications = [];
    const index = store.applications.findIndex(a => a.id === id && a.userId === userId);
    if (index === -1) return null;
    store.applications[index] = {
      ...store.applications[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
    return store.applications[index];
  },

  async delete(id, userId) {
    if (isMongoConnected && MongoApplication) {
      const res = await MongoApplication.deleteOne({ _id: id, userId });
      return res.deletedCount > 0;
    }
    const store = readLocalStore();
    if (!store.applications) return false;
    const initialLen = store.applications.length;
    store.applications = store.applications.filter(a => !(a.id === id && a.userId === userId));
    const deleted = store.applications.length < initialLen;
    if (deleted) {
      writeLocalStore(store);
    }
    return deleted;
  }
};

