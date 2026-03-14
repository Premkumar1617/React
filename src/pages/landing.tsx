import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { StaticData } from '../data/StaticData';
import type { ProjectCard } from '../data/StaticData';
import './landing.css';

const Landing: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'starred' | 'recent'>('projects');

  const stats = [
    { label: 'Open Issues', value: '24', icon: '🐛', color: '#de350b' },
    { label: 'In Progress', value: '10', icon: '🔄', color: '#0052cc' },
    { label: 'Done This Week', value: '18', icon: '✅', color: '#00875a' },
    { label: 'Team Members', value: '4', icon: '👥', color: '#6554c0' },
  ];

  const recentActivity = [
    { action: 'Bug fix merged', project: 'E-Commerce Platform', time: '5 min ago', type: 'merge' },
    { action: 'Sprint 14 started', project: 'Mobile App Redesign', time: '2 hours ago', type: 'sprint' },
    { action: 'New issue created', project: 'Data Analytics Dashboard', time: '3 hours ago', type: 'issue' },
    { action: 'Release v2.1.0', project: 'Customer Portal v2', time: '1 day ago', type: 'release' },
    { action: 'Design review completed', project: 'API Gateway Migration', time: '2 days ago', type: 'review' },
  ];

  const activityIcon: Record<string, string> = {
    merge: '🔀',
    sprint: '🏃',
    issue: '🐛',
    release: '🚀',
    review: '👁️',
  };

  return (
    <div className="landing-root">
      <Navbar />

      <main className="landing-main">
        {/* ── Welcome Banner ── */}
        <section className="landing-welcome">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Good {getGreeting()}, <span className="welcome-name">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="welcome-sub">Here's what's happening across your projects today.</p>
          </div>
          <div
            className="welcome-avatar"
            style={{ background: `hsl(${(user?.id ?? 1) * 60}, 65%, 50%)` }}
          >
            {user?.avatar}
          </div>
        </section>

        {/* ── Stats Row ── */}
        <section className="landing-stats">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon" style={{ color: s.color }}>{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ── Projects + Activity ── */}
        <div className="landing-grid">
          {/* Projects Section */}
          <section className="projects-section">
            <div className="section-header">
              <h2 className="section-title">Projects</h2>
              <div className="tab-group">
                {(['projects', 'starred', 'recent'] as const).map((t) => (
                  <button
                    key={t}
                    className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-grid">
              {StaticData.PROJECTS.map((project: ProjectCard) => (
                <div className="project-card" key={project.id}>
                  <div className="project-card-header">
                    <div
                      className="project-key-badge"
                      style={{ background: project.color }}
                    >
                      {project.key}
                    </div>
                    <span className="project-type-tag">{project.type}</span>
                  </div>
                  <div className="project-name">{project.name}</div>
                  <div className="project-meta">
                    <span className="project-lead">👤 {project.lead}</span>
                    <span className="project-updated">🕐 {project.lastUpdated}</span>
                  </div>
                  <div className="project-progress">
                    <div
                      className="project-progress-bar"
                      style={{
                        width: `${Math.floor(Math.random() * 60) + 30}%`,
                        background: project.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activity Feed */}
          <section className="activity-section">
            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
              <button className="view-all-btn">View all</button>
            </div>
            <div className="activity-feed">
              {recentActivity.map((item, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-icon">{activityIcon[item.type]}</div>
                  <div className="activity-content">
                    <div className="activity-action">{item.action}</div>
                    <div className="activity-project">{item.project}</div>
                  </div>
                  <div className="activity-time">{item.time}</div>
                </div>
              ))}
            </div>

            {/* Quick Info Card */}
            <div className="info-card">
              <div className="info-card-title">Your Profile</div>
              <div className="info-rows">
                <div className="info-row"><span>Role</span><span className="info-val">{user?.role}</span></div>
                <div className="info-row"><span>Department</span><span className="info-val">{user?.department}</span></div>
                <div className="info-row"><span>Email</span><span className="info-val">{user?.email}</span></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

export default Landing;