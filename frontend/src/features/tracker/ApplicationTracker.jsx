import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  ExternalLink, 
  Calendar, 
  Building2, 
  DollarSign, 
  MapPin, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trophy, 
  Sparkles,
  LayoutGrid,
  List,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { applicationService } from '../../services/api';

const STATUS_COLUMNS = [
  { id: 'wishlist', title: 'Wishlist', color: 'border-slate-700 bg-slate-900/60', badge: 'bg-slate-800 text-slate-300' },
  { id: 'applied', title: 'Applied', color: 'border-indigo-800/60 bg-indigo-950/20', badge: 'bg-indigo-900/60 text-indigo-300' },
  { id: 'interviewing', title: 'Interviewing', color: 'border-amber-800/60 bg-amber-950/20', badge: 'bg-amber-900/60 text-amber-300' },
  { id: 'offer', title: 'Offer Received', color: 'border-emerald-800/60 bg-emerald-950/20', badge: 'bg-emerald-900/60 text-emerald-300' },
  { id: 'rejected', title: 'Archived / Rejected', color: 'border-rose-800/40 bg-rose-950/15', badge: 'bg-rose-900/50 text-rose-300' }
];

const SAMPLE_APPLICATIONS = [
  {
    id: 'sample-1',
    company: 'Stripe',
    position: 'Senior Full Stack Engineer',
    location: 'San Francisco, CA / Remote',
    salary: '$180,000 - $215,000',
    status: 'interviewing',
    appliedDate: '2026-10-12',
    jobUrl: 'https://stripe.com/jobs',
    resumeUsed: 'Full Stack Tech Lead Resume',
    notes: 'Technical screen passed with Engineering Manager. System design round scheduled next Tuesday.'
  },
  {
    id: 'sample-2',
    company: 'OpenAI',
    position: 'Full Stack Web Platform Developer',
    location: 'San Francisco, CA',
    salary: '$200,000 - $240,000',
    status: 'applied',
    appliedDate: '2026-10-18',
    jobUrl: 'https://openai.com/careers',
    resumeUsed: 'ATS-Friendly Software Engineer',
    notes: 'Applied via referral from former colleague. Emphasized React performance and Node.js microservices.'
  },
  {
    id: 'sample-3',
    company: 'Vercel',
    position: 'Frontend Systems Engineer',
    location: 'Remote (Worldwide)',
    salary: '$170,000 - $195,000',
    status: 'offer',
    appliedDate: '2026-09-28',
    jobUrl: 'https://vercel.com/careers',
    resumeUsed: 'Minimalist Senior Dev Resume',
    notes: 'Received written offer! Reviewing equity package and bonus structure with mentor.'
  },
  {
    id: 'sample-4',
    company: 'Datadog',
    position: 'Backend API Engineer',
    location: 'New York, NY',
    salary: '$165,000 - $190,000',
    status: 'wishlist',
    appliedDate: '2026-10-21',
    jobUrl: 'https://datadoghq.com',
    resumeUsed: 'Not yet submitted',
    notes: 'Need to tailor resume with distributed tracing and Kafka keywords using the JD Matcher tool first.'
  }
];

export default function ApplicationTracker({ currentResumeTitle = 'Active Resume' }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied',
    appliedDate: new Date().toISOString().split('T')[0],
    jobUrl: '',
    resumeUsed: currentResumeTitle,
    notes: ''
  });

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);
    try {
      const items = await applicationService.listApplications();
      setApplications(items && items.length > 0 ? items : SAMPLE_APPLICATIONS);
    } catch {
      setApplications(SAMPLE_APPLICATIONS);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenAdd() {
    setEditingApp(null);
    setFormData({
      company: '',
      position: '',
      location: '',
      salary: '',
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      jobUrl: '',
      resumeUsed: currentResumeTitle,
      notes: ''
    });
    setIsModalOpen(true);
  }

  function handleOpenEdit(app) {
    setEditingApp(app);
    setFormData({
      company: app.company,
      position: app.position,
      location: app.location || '',
      salary: app.salary || '',
      status: app.status || 'applied',
      appliedDate: app.appliedDate || new Date().toISOString().split('T')[0],
      jobUrl: app.jobUrl || '',
      resumeUsed: app.resumeUsed || currentResumeTitle,
      notes: app.notes || ''
    });
    setIsModalOpen(true);
  }

  async function handleSaveApp(e) {
    e.preventDefault();
    if (!formData.company.trim() || !formData.position.trim()) return;

    if (editingApp) {
      const updated = await applicationService.updateApplication(editingApp.id, formData);
      setApplications(prev => prev.map(a => (a.id === editingApp.id ? updated : a)));
    } else {
      const created = await applicationService.createApplication(formData);
      setApplications(prev => [created, ...prev]);
    }
    setIsModalOpen(false);
  }

  async function handleDeleteApp(id) {
    if (!confirm('Are you sure you want to delete this job application?')) return;
    await applicationService.deleteApplication(id);
    setApplications(prev => prev.filter(a => a.id !== id));
  }

  async function handleStatusChange(id, newStatus) {
    const updated = await applicationService.updateApplication(id, { status: newStatus });
    setApplications(prev => prev.map(a => (a.id === id ? { ...a, status: newStatus } : a)));
  }

  function handleLoadSamplePipeline() {
    setApplications(SAMPLE_APPLICATIONS);
    applicationService.setLocal(SAMPLE_APPLICATIONS);
  }

  // Filtered Applications
  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = applications.length;
  const appliedCount = applications.filter(a => a.status === 'applied').length;
  const interviewingCount = applications.filter(a => a.status === 'interviewing').length;
  const offerCount = applications.filter(a => a.status === 'offer').length;
  const activePipeline = interviewingCount + appliedCount;
  const interviewRate = totalCount > 0 ? Math.round(((interviewingCount + offerCount) / totalCount) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 border border-indigo-800/40 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Job Application Tracker & Pipeline</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Track Your Job Applications & Interviews
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Keep your entire job search organized in one place. Monitor submission dates, active interview stages, compensation ranges, and linked resumes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSamplePipeline}
              className="px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Load demo applications"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Sample Pipeline</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Application</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{totalCount}</div>
            <div className="text-[11px] text-slate-400 uppercase font-medium">Total Tracked</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{appliedCount}</div>
            <div className="text-[11px] text-slate-400 uppercase font-medium">In Review</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-amber-400">{interviewingCount}</div>
            <div className="text-[11px] text-slate-400 uppercase font-medium">Interviewing</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400">{offerCount}</div>
            <div className="text-[11px] text-slate-400 uppercase font-medium">Offers</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">{interviewRate}%</div>
            <div className="text-[11px] text-slate-400 uppercase font-medium">Interview Rate</div>
          </div>
        </div>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search company, job role, or location..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Stages ({applications.length})</option>
            <option value="wishlist">Wishlist</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1 rounded ${viewMode === 'kanban' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map(col => {
            const colApps = filteredApps.filter(a => a.status === col.id);
            return (
              <div
                key={col.id}
                className={`flex flex-col rounded-2xl border ${col.color} p-3.5 min-w-[240px]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white uppercase tracking-wider">
                      {col.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${col.badge}`}>
                      {colApps.length}
                    </span>
                  </div>
                </div>

                {/* Column Application Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-0.5">
                  {colApps.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-500 border border-dashed border-slate-800 rounded-xl">
                      No jobs in {col.title}
                    </div>
                  ) : (
                    colApps.map(app => (
                      <div
                        key={app.id}
                        className="p-3.5 bg-slate-900 border border-slate-800/90 rounded-xl hover:border-slate-700 shadow-md space-y-2 group transition"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="font-bold text-xs text-white leading-tight">
                              {app.position}
                            </h4>
                            <div className="text-[11px] font-semibold text-indigo-400 mt-0.5 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span>{app.company}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleOpenEdit(app)}
                              className="p-1 text-slate-400 hover:text-white rounded"
                              title="Edit"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteApp(app.id)}
                              className="p-1 text-slate-400 hover:text-red-400 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {app.location && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span className="truncate">{app.location}</span>
                          </div>
                        )}

                        {app.salary && (
                          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <DollarSign className="w-3 h-3" />
                            <span>{app.salary}</span>
                          </div>
                        )}

                        {app.notes && (
                          <p className="text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg line-clamp-2 leading-relaxed">
                            {app.notes}
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            <span>{app.appliedDate}</span>
                          </span>

                          {/* Quick Stage Mover */}
                          <select
                            value={app.status}
                            onChange={e => handleStatusChange(app.id, e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-[10px] text-slate-300 focus:outline-none"
                          >
                            <option value="wishlist">Wishlist</option>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Data Table List View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Company & Role</th>
                  <th className="py-3 px-4">Stage / Status</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Resume Version</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No job applications match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-slate-850 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{app.position}</div>
                        <div className="text-indigo-400 font-medium text-[11px]">{app.company}</div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={app.status}
                          onChange={e => handleStatusChange(app.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs font-semibold capitalize text-slate-200"
                        >
                          <option value="wishlist">Wishlist</option>
                          <option value="applied">Applied</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{app.location || '—'}</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">{app.salary || '—'}</td>
                      <td className="py-3 px-4 text-slate-400">{app.appliedDate}</td>
                      <td className="py-3 px-4 text-slate-400 truncate max-w-[150px]">{app.resumeUsed || 'Default'}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(app)}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="p-1 text-slate-400 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingApp ? 'Edit Job Application' : 'Add New Job Application'}
            </h3>

            <form onSubmit={handleSaveApp} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Google, Stripe"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Job Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Stage / Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Date Applied</label>
                  <input
                    type="date"
                    value={formData.appliedDate}
                    onChange={e => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={e => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="e.g. $140,000 - $170,000"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Job Posting URL</label>
                <input
                  type="url"
                  value={formData.jobUrl}
                  onChange={e => setFormData({ ...formData, jobUrl: e.target.value })}
                  placeholder="https://company.com/careers/job-id"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Notes & Follow-ups</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Referral contact, recruiter name, interview notes..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                >
                  {editingApp ? 'Update Application' : 'Save Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
