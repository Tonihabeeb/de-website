'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  FileText,
  Settings,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import RoleGuard from '@/components/auth/RoleGuard';

interface SubMenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
  requiresAuth?: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'Learn more', href: '/about/learn-more' },
      { name: 'Leadership', href: '/about/leadership' },
    ],
  },
  {
    name: 'Technology',
    href: '/technology',
    submenu: [
      { name: 'Overview', href: '/technology' },
      { name: 'How It Works', href: '/technology/how-it-works' },
      {
        name: 'Components',
        href: '/technology/components',
        submenu: [
          { name: 'Overview', href: '/technology/components' },
          { name: 'Floater', href: '/technology/floater' },
          { name: 'Pneumatic System', href: '/technology/pneumatic-system' },
          { name: 'Conveyor Chain', href: '/technology/conveyor-chain' },
          { name: 'Generator', href: '/technology/generator' },
          { name: 'Control System', href: '/technology/control-system' },
          { name: 'Gearbox', href: '/technology/gearbox' },
        ],
      },
      { name: 'Performance', href: '/technology/performance' },
      { name: 'Specifications', href: '/technology/specifications' },
      {
        name: 'KPP Technical Documentation',
        href: '/technology/kpp-documentation',
      },
      { name: 'Economics', href: '/economics' },
      { name: 'Interactive Features', href: '/interactive-features' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Supply', href: '/services/supply' },
      { name: 'EPC', href: '/services/epc' },
      { name: 'O&M', href: '/services/om' },
    ],
  },
  { name: 'Projects', href: '/projects' },
  {
    name: 'Team',
    href: '/team',
    submenu: [
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/team/careers' },
    ],
  },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [technologyDropdownOpen, setTechnologyDropdownOpen] = useState(false);
  const [dashboardsDropdownOpen, setDashboardsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const technologyDropdownRef = useRef<HTMLDivElement>(null);
  const dashboardsDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const technologyButtonRef = useRef<HTMLButtonElement>(null);
  const dashboardsButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const teamButtonRef = useRef<HTMLButtonElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [dynamicNavigation, setDynamicNavigation] = useState<NavigationItem[] | null>(null);
  const [navLoading, setNavLoading] = useState(true);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        setNavLoading(true);
        const res = await fetch('/api/navigation');
        const data = await res.json();
        if (data && data.length > 0 && data[0].items_json) {
          setDynamicNavigation(JSON.parse(data[0].items_json));
        } else {
          setDynamicNavigation(null);
        }
      } catch (err) {
        setDynamicNavigation(null);
      } finally {
        setNavLoading(false);
      }
    }
    fetchNavigation();
  }, []);

  const menuToRender = dynamicNavigation || navigation;

  // Filter navigation items based on authentication
  const filteredNavigation = menuToRender.filter(item => {
    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }
    return true;
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node) &&
        aboutButtonRef.current &&
        !aboutButtonRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
      if (
        technologyDropdownRef.current &&
        !technologyDropdownRef.current.contains(event.target as Node) &&
        technologyButtonRef.current &&
        !technologyButtonRef.current.contains(event.target as Node)
      ) {
        setTechnologyDropdownOpen(false);
      }
      if (
        dashboardsDropdownRef.current &&
        !dashboardsDropdownRef.current.contains(event.target as Node) &&
        dashboardsButtonRef.current &&
        !dashboardsButtonRef.current.contains(event.target as Node)
      ) {
        setDashboardsDropdownOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(event.target as Node) &&
        teamButtonRef.current &&
        !teamButtonRef.current.contains(event.target as Node)
      ) {
        setTeamDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if we're on the homepage and if hero section is visible
  const isHomePage = pathname === '/';
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  // Check if hero section is visible (for homepage only)
  useEffect(() => {
    if (isHomePage) {
      const checkHeroVisibility = () => {
        const heroSection = document.querySelector('section');
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          // Hero is visible if it's in the viewport
          setIsHeroVisible(rect.top <= 0 && rect.bottom > 0);
        }
      };

      checkHeroVisibility();
      window.addEventListener('scroll', checkHeroVisibility);
      return () => window.removeEventListener('scroll', checkHeroVisibility);
    }
  }, [isHomePage]);
  
  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      isHomePage && isHeroVisible
        ? 'bg-transparent border-b border-gray-300/30 shadow-none' 
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
    }`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link
            href='/'
            aria-label='Deep Engineering - Go to homepage'
            className='flex-shrink-0 focus:outline-none'
          >
            <Image
              src='/logo.svg'
              alt='Deep Engineering company logo'
              height={40}
              width={120}
              priority
              className={isHomePage && isHeroVisible ? 'filter brightness-0 invert' : ''}
            />
          </Link>

          {/* Centered Navigation */}
          <ul
            className='flex-grow flex items-center justify-center space-x-8 mx-auto'
            role='menubar'
          >
            {filteredNavigation.map(item => (
              <li key={item.name} role='none' className='relative'>
                {item.submenu ? (
                  <div
                    className='relative'
                    ref={
                      item.name === 'About'
                        ? aboutDropdownRef
                        : item.name === 'Technology'
                          ? technologyDropdownRef
                          : item.name === 'Services'
                            ? servicesDropdownRef
                            : teamDropdownRef
                    }
                  >
                    <button
                      ref={
                        item.name === 'About'
                          ? aboutButtonRef
                          : item.name === 'Technology'
                            ? technologyButtonRef
                            : item.name === 'Services'
                              ? servicesButtonRef
                              : teamButtonRef
                      }
                      onClick={() => {
                        if (item.name === 'About') {
                          setAboutDropdownOpen(!aboutDropdownOpen);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else if (item.name === 'Technology') {
                          setTechnologyDropdownOpen(!technologyDropdownOpen);
                          setAboutDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else if (item.name === 'Services') {
                          setServicesDropdownOpen(!servicesDropdownOpen);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else {
                          setTeamDropdownOpen(!teamDropdownOpen);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                        }
                      }}
                      onMouseEnter={() => {
                        if (item.name === 'About') {
                          setAboutDropdownOpen(true);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else if (item.name === 'Technology') {
                          setTechnologyDropdownOpen(true);
                          setAboutDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else if (item.name === 'Services') {
                          setServicesDropdownOpen(true);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setTeamDropdownOpen(false);
                        } else {
                          setTeamDropdownOpen(true);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
                          setDashboardsDropdownOpen(false);
                          setServicesDropdownOpen(false);
                        }
                      }}
                                            className={`flex items-center space-x-1 transition-colors duration-200 font-medium focus:outline-none ${
                        isHomePage && isHeroVisible
                          ? 'text-white hover:text-gray-200'
                          : 'text-gray-text hover:text-gray-300'
                      }`}
                      aria-expanded={
                        item.name === 'About'
                          ? aboutDropdownOpen
                          : item.name === 'Technology'
                            ? technologyDropdownOpen
                            : item.name === 'Services'
                              ? servicesDropdownOpen
                              : teamDropdownOpen
                      }
                      aria-haspopup='true'
                      aria-label={`Toggle ${item.name} menu`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className='w-4 h-4' />
                    </button>
                    {(item.name === 'About'
                      ? aboutDropdownOpen
                      : item.name === 'Technology'
                        ? technologyDropdownOpen
                        : item.name === 'Services'
                          ? servicesDropdownOpen
                          : teamDropdownOpen) && (
                      <div
                        className='absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 py-2 z-20'
                        onMouseEnter={() => {
                          if (item.name === 'About') {
                            setAboutDropdownOpen(true);
                          } else if (item.name === 'Technology') {
                            setTechnologyDropdownOpen(true);
                          } else if (item.name === 'Services') {
                            setServicesDropdownOpen(true);
                          } else {
                            setTeamDropdownOpen(true);
                          }
                        }}
                        onMouseLeave={() => {
                          if (item.name === 'About') {
                            setAboutDropdownOpen(false);
                          } else if (item.name === 'Technology') {
                            setTechnologyDropdownOpen(false);
                          } else if (item.name === 'Services') {
                            setServicesDropdownOpen(false);
                          } else {
                            setTeamDropdownOpen(false);
                          }
                        }}
                      >
                        {item.submenu.map(sub => (
                          <div key={sub.name} className='relative group'>
                            {sub.submenu ? (
                              <>
                                <button
                                  className='flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700 group-hover:bg-gray-100 focus:outline-none'
                                  aria-haspopup='true'
                                  aria-label={`Toggle ${sub.name} submenu`}
                                >
                                  <span>{sub.name}</span>
                                  <ChevronDown className='w-4 h-4 ml-auto' />
                                </button>
                                <div className='absolute top-0 left-full w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 py-2 z-30 hidden group-hover:block group-focus-within:block'>
                                  {sub.submenu.map((nested: SubMenuItem) => (
                                    <Link
                                      key={nested.name}
                                      href={nested.href}
                                      className='block px-4 py-2 hover:bg-gray-100 text-gray-700 focus:outline-none'
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={sub.href}
                                className='block px-4 py-2 hover:bg-gray-100 text-gray-700 focus:outline-none'
                              >
                                {sub.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    role='menuitem'
                    aria-current={pathname === item.href ? 'page' : undefined}
                                          className={`transition-colors duration-200 font-medium min-w-[44px] min-h-[44px] focus:outline-none ${
                        isHomePage && isHeroVisible
                          ? 'text-white hover:text-gray-200'
                          : 'text-gray-text hover:text-gray-300'
                      } ${
                        pathname === item.href
                          ? isHomePage && isHeroVisible
                            ? 'text-white font-bold border-b-2 border-white'
                            : 'text-primary font-bold border-b-2 border-primary'
                          : ''
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* User Avatar & Dropdown - Far Right */}
          <div className='flex items-center space-x-4 flex-shrink-0'>
            {isAuthenticated ? (
              <div className='relative' ref={userDropdownRef}>
                <button
                  ref={userButtonRef}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className={`flex items-center space-x-3 p-2 rounded-full transition-colors duration-200 focus:outline-none ${
                    isHomePage && isHeroVisible
                      ? 'hover:bg-white/10'
                      : 'hover:bg-gray-50'
                  }`}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup='true'
                  aria-label='User menu'
                >
                  <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className='hidden lg:block text-left'>
                                                          <div className={`text-sm font-medium ${
                      isHomePage && isHeroVisible ? 'text-white' : 'text-primary'
                    }`}>
                    {user?.name || 'User'}
                  </div>
                                      <div className={`text-xs ${
                      isHomePage && isHeroVisible ? 'text-gray-200' : 'text-gray-500'
                    }`}>
                      {user?.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : 'User'}
                    </div>
                  </div>
                  <ChevronDown
                                          className={`w-4 h-4 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''} ${
                        isHomePage && isHeroVisible ? 'text-white' : 'text-gray-400'
                      }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 py-2 z-30'>
                    {/* User Info Header */}
                    <div className='px-4 py-3 border-b border-gray-100'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className='text-sm font-medium text-primary'>
                            {user?.name || 'User'}
                          </div>
                          <div className='text-xs text-gray-500'>
                            {user?.role
                              ? user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)
                              : 'User'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className='py-1'>
                      <Link
                        href='/documents'
                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-300 transition-colors duration-200 focus:outline-none'
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <FileText className='w-4 h-4 mr-3' />
                        Documents
                      </Link>
                      <RoleGuard roles={['admin', 'super_admin']}>
                        <Link
                          href='/admin/'
                          className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-300 transition-colors duration-200 focus:outline-none'
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Settings className='w-4 h-4 mr-3' />
                          Admin Home
                        </Link>
                        <Link
                          href='/admin/dashboard'
                          className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-300 transition-colors duration-200 focus:outline-none'
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Settings className='w-4 h-4 mr-3' />
                          Admin Panel
                        </Link>
                      </RoleGuard>
                      <Link
                        href='/dashboard'
                        className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-300 transition-colors duration-200 focus:outline-none'
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <svg
                          className='w-4 h-4 mr-3'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V7H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V7h-2v2z'
                          />
                        </svg>
                        Dashboard
                      </Link>
                      <div className='border-t border-gray-100 my-1'></div>
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 focus:outline-none'
                      >
                        <LogOut className='w-4 h-4 mr-3' />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  href='/login'
                                    className={`text-sm transition-colors duration-200 font-medium px-3 py-2 rounded-md focus:outline-none ${
                    isHomePage && isHeroVisible
                      ? 'text-white hover:text-gray-200 hover:bg-white/10'
                      : 'text-gray-700 hover:text-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href='/register'
                                    className={`text-sm px-4 py-2 rounded-md transition-colors duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none ${
                    isHomePage && isHeroVisible
                      ? 'bg-white text-primary hover:bg-gray-100'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type='button'
                            className={`md:hidden p-3 rounded-lg transition-all duration-200 min-w-[48px] min-h-[48px] focus:outline-none ${
                  isHomePage && isHeroVisible
                    ? 'text-white hover:text-gray-200 hover:bg-white/10'
                    : 'text-gray-text hover:text-gray-300 hover:bg-gray-50'
                }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls='mobile-menu'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          id='mobile-menu'
          className={`md:hidden border-t shadow-lg ${
            isHomePage 
              ? 'border-white/20 bg-white/95 backdrop-blur-sm' 
              : 'border-gray-200 bg-white'
          }`}
          role='navigation'
          aria-label='Mobile navigation'
        >
          <div className='px-4 py-6 space-y-4'>
            <ul className='space-y-2' role='menu'>
              {filteredNavigation.map(item => (
                <li key={item.name} role='none'>
                  {item.submenu ? (
                    <div>
                                              <div className={`px-3 py-3 font-semibold text-lg border-b ${
                          isHomePage && isHeroVisible
                            ? 'text-white border-white/20'
                            : 'text-primary border-gray-100'
                        }`}>
                        {item.name}
                      </div>
                      <ul className='pl-4 space-y-1 mt-2'>
                        {item.submenu.map(subItem => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                                                            className={`block px-3 py-3 rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none ${
                                pathname === subItem.href
                                  ? 'bg-primary text-white shadow-md'
                                  : isHomePage && isHeroVisible
                                    ? 'text-white hover:bg-white/10 hover:text-gray-200'
                                    : 'text-gray-text hover:bg-gray-50 hover:text-gray-300'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      role='menuitem'
                      aria-current={pathname === item.href ? 'page' : undefined}
                                            className={`block px-3 py-3 rounded-lg transition-all duration-200 font-medium focus:outline-none ${
                        pathname === item.href
                          ? 'bg-primary text-white shadow-md'
                          : isHomePage && isHeroVisible
                            ? 'text-white hover:bg-white/10 hover:text-gray-200'
                            : 'text-gray-text hover:bg-gray-50 hover:text-gray-300'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Authentication Section */}
            <div className={`border-t pt-6 mt-6 ${
              isHomePage && isHeroVisible
                ? 'border-gray-200' 
                : 'border-gray-200'
            }`}>
              {isAuthenticated ? (
                <div className='space-y-4'>
                  {/* User Info */}
                  <div className='flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg'>
                    <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                      {user?.userId?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className='text-sm font-medium text-primary'>
                        {user?.userId}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {user?.role
                          ? user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)
                          : 'User'}
                      </div>
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className='space-y-2'>
                    <Link
                      href='/documents'
                      className='flex items-center px-3 py-3 text-sm text-gray-700 hover:text-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FileText className='w-4 h-4 mr-3' />
                      Documents
                    </Link>
                    <RoleGuard roles={['admin', 'super_admin']}>
                      <Link
                        href='/admin'
                        className='flex items-center px-3 py-3 text-sm text-gray-700 hover:text-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className='w-4 h-4 mr-3' />
                        Admin Panel
                      </Link>
                    </RoleGuard>
                  </div>

                  {/* Logout Button */}
                  <div className='border-t border-gray-200 pt-2'>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className='flex items-center w-full px-3 py-3 text-sm text-gray-700 hover:text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200'
                    >
                      <LogOut className='w-4 h-4 mr-3' />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className='space-y-3'>
                  <div className='text-sm text-gray-text font-medium px-3'>
                    Account
                  </div>
                  <div className='space-y-2'>
                    <Link
                      href='/login'
                      className='block px-3 py-3 text-sm text-gray-text hover:text-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href='/register'
                      className='block px-3 py-3 text-sm bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-200 text-center'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className='border-t border-gray-200 pt-6 mt-6'>
              <div className='text-center space-y-2'>
                <div className='flex items-center justify-center space-x-2'>
                  <div className='w-4 h-4 bg-primary rounded-full'></div>
                  <p className='text-sm font-medium text-primary'>
                    Deep Engineering
                  </p>
                </div>
                <p className='text-xs text-gray-500'>
                  KPP Technology Solutions
                </p>
                <div className='flex items-center justify-center space-x-4 text-xs text-gray-400'>
                  <span>Continuous Clean Energy</span>
                  <span>•</span>
                  <span>Anywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
