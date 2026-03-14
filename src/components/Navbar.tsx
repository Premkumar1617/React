import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StaticData } from '../data/StaticData';
import type { NavMenuItem } from '../data/StaticData';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMenuEnter = (label: string) => setActiveMenu(label);
  const handleMenuLeave = () => setActiveMenu(null);

  return (
    <header className="navbar">
      {/* ── Left: Logo + Menu ── */}
      <div className="navbar-left">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate('/landing')}>
          <div className="navbar-logo-icon">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 16L9 16L9 30L23 30L23 16L30 16L16 2Z" fill="white" />
            </svg>
          </div>
          <span className="navbar-logo-text">{StaticData.APP_NAME}</span>
        </div>

        {/* Nav Menu */}
        <nav className="navbar-menu">
          {StaticData.NAV_MENU_ITEMS.map((item: NavMenuItem) => (
            <div
              key={item.label}
              className="navbar-menu-item"
              onMouseEnter={() => handleMenuEnter(item.label)}
              onMouseLeave={handleMenuLeave}
            >
              <button className="navbar-menu-btn">
                {item.label}
                <svg className="navbar-chevron" width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 3L5 7L8 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>

              {/* Dropdown */}
              {activeMenu === item.label && item.dropdownItems && (
                <div className="navbar-dropdown">
                  {item.dropdownItems.map((di) => (
                    <button
                      key={di.label}
                      className="navbar-dropdown-item"
                      onClick={() => {
                        setActiveMenu(null);
                        navigate(di.path);
                      }}
                    >
                      {di.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="navbar-menu-btn navbar-create-btn" onClick={() => {}}>
            + Create
          </button>
        </nav>
      </div>

      {/* ── Right: Search + Icons + Avatar ── */}
      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="navbar-search-input"
          />
        </div>

        {/* Notification Bell */}
        <button className="navbar-icon-btn" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C9.24 2 7 4.24 7 7v2.29C5.77 10.23 5 11.52 5 13v4h14v-4c0-1.48-.77-2.77-2-3.71V7c0-2.76-2.24-5-5-5zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"
              fill="currentColor"
            />
          </svg>
          <span className="navbar-badge">3</span>
        </button>

        {/* Help */}
        <button className="navbar-icon-btn" title="Help">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.5-2.5 2.5-2.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="17" r="0.8" fill="currentColor" />
          </svg>
        </button>

        {/* Profile Avatar */}
        <div className="navbar-profile" ref={profileRef}>
          <button
            className="navbar-avatar"
            onClick={() => setProfileOpen((prev) => !prev)}
            style={{ background: `hsl(${(user?.id ?? 1) * 60}, 65%, 50%)` }}
          >
            {user?.avatar ?? 'U'}
          </button>

          {profileOpen && (
            <div className="navbar-profile-dropdown">
              <div className="profile-header">
                <div
                  className="profile-avatar-lg"
                  style={{ background: `hsl(${(user?.id ?? 1) * 60}, 65%, 50%)` }}
                >
                  {user?.avatar}
                </div>
                <div>
                  <div className="profile-name">{user?.name}</div>
                  <div className="profile-email">{user?.email}</div>
                  <div className="profile-role">{user?.role}</div>
                </div>
              </div>
              <div className="profile-divider" />
              <button className="profile-menu-item">👤 Profile</button>
              <button className="profile-menu-item">⚙️ Settings</button>
              <button className="profile-menu-item">🔒 Security</button>
              <div className="profile-divider" />
              <button className="profile-menu-item profile-logout" onClick={handleLogout}>
                🚪 Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
