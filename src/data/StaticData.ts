// ============================================================
// StaticData.ts — Central static data class for the application
// ============================================================

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
  avatar: string; // initials for avatar
  department: string;
}

export interface NavMenuItem {
  label: string;
  path: string;
  dropdownItems?: { label: string; path: string }[];
}

export interface ProjectCard {
  id: number;
  name: string;
  key: string;
  type: string;
  lead: string;
  lastUpdated: string;
  color: string;
}

// ─── Static Users ────────────────────────────────────────────
export class StaticData {
  static readonly APP_NAME = 'JiraBoard';

  static readonly USERS: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      name: 'Admin User',
      email: 'admin@jiraboard.com',
      role: 'Administrator',
      avatar: 'AU',
      department: 'Engineering',
    },
    {
      id: 2,
      username: 'john.doe',
      password: 'john@123',
      name: 'John Doe',
      email: 'john.doe@jiraboard.com',
      role: 'Developer',
      avatar: 'JD',
      department: 'Frontend',
    },
    {
      id: 3,
      username: 'jane.smith',
      password: 'jane@456',
      name: 'Jane Smith',
      email: 'jane.smith@jiraboard.com',
      role: 'Product Manager',
      avatar: 'JS',
      department: 'Product',
    },
    {
      id: 4,
      username: 'mark.wilson',
      password: 'mark@789',
      name: 'Mark Wilson',
      email: 'mark.wilson@jiraboard.com',
      role: 'QA Engineer',
      avatar: 'MW',
      department: 'Quality Assurance',
    },
  ];

  // ─── Navigation Menu ───────────────────────────────────────
  static readonly NAV_MENU_ITEMS: NavMenuItem[] = [
    {
      label: 'Your Work',
      path: '/your-work',
      dropdownItems: [
        { label: 'Recent', path: '/recent' },
        { label: 'Assigned to me', path: '/assigned' },
        { label: 'Viewed recently', path: '/viewed' },
        { label: 'Done', path: '/done' },
      ],
    },
    {
      label: 'Projects',
      path: '/projects',
      dropdownItems: [
        { label: 'View all projects', path: '/projects' },
        { label: 'Create project', path: '/projects/new' },
      ],
    },
    {
      label: 'Filters',
      path: '/filters',
      dropdownItems: [
        { label: 'View all filters', path: '/filters' },
        { label: 'My open issues', path: '/filters/open' },
        { label: 'Reported by me', path: '/filters/reported' },
      ],
    },
    {
      label: 'Dashboards',
      path: '/dashboards',
      dropdownItems: [
        { label: 'View all dashboards', path: '/dashboards' },
        { label: 'Create dashboard', path: '/dashboards/new' },
      ],
    },
    {
      label: 'Teams',
      path: '/teams',
      dropdownItems: [
        { label: 'View all teams', path: '/teams' },
        { label: 'Create team', path: '/teams/new' },
      ],
    },
  ];

  // ─── Project Cards ─────────────────────────────────────────
  static readonly PROJECTS: ProjectCard[] = [
    {
      id: 1,
      name: 'E-Commerce Platform',
      key: 'ECP',
      type: 'Software',
      lead: 'Admin User',
      lastUpdated: '2 hours ago',
      color: '#0052CC',
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      key: 'MAR',
      type: 'Software',
      lead: 'John Doe',
      lastUpdated: '1 day ago',
      color: '#00875A',
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      key: 'DAD',
      type: 'Business',
      lead: 'Jane Smith',
      lastUpdated: '3 days ago',
      color: '#FF5630',
    },
    {
      id: 4,
      name: 'Customer Portal v2',
      key: 'CPV',
      type: 'Software',
      lead: 'Mark Wilson',
      lastUpdated: '1 week ago',
      color: '#6554C0',
    },
    {
      id: 5,
      name: 'API Gateway Migration',
      key: 'AGM',
      type: 'Infrastructure',
      lead: 'Admin User',
      lastUpdated: '2 weeks ago',
      color: '#FF7A03',
    },
    {
      id: 6,
      name: 'HR Management System',
      key: 'HMS',
      type: 'Business',
      lead: 'Jane Smith',
      lastUpdated: '3 weeks ago',
      color: '#00B8D9',
    },
  ];

  // ─── Helper: Find User by credentials ─────────────────────
  static findUser(username: string, password: string): User | null {
    return (
      StaticData.USERS.find(
        (u) =>
          u.username.toLowerCase() === username.toLowerCase() &&
          u.password === password
      ) ?? null
    );
  }
}
