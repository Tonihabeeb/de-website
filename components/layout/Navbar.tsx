'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    submenu: [
      { name: 'Overview', href: '/about' },
      { name: 'Leadership', href: '/about/leadership' },
      { name: 'ESG', href: '/about/esg' },
      { name: 'HSE', href: '/about/hse' },
      { name: 'Vision & Mission', href: '/about/vision-mission' },
      { name: 'CSR', href: '/about/csr' },
    ]
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
        ]
      },
      { name: 'Performance', href: '/technology/performance' },
      { name: 'Specifications', href: '/technology/specifications' },
      { name: 'KPP Technical Documentation', href: '/technology/kpp-documentation' },
      { name: 'Economics', href: '/economics' },
      { name: 'Interactive Features', href: '/interactive-features' },
    ]
  },
  {
    name: 'Dashboards',
    href: '/dashboard',
    submenu: [
      { name: 'Project Progress', href: '/dashboard/project-progress' },
      { name: 'Financial', href: '/dashboard/financial' },
      { name: 'Resources', href: '/resources' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    submenu: [
      { name: 'Supply', href: '/services/supply' },
      { name: 'EPC', href: '/services/epc' },
      { name: 'O&M', href: '/services/om' },
    ]
  },
  { name: 'Projects', href: '/projects' },
  { 
    name: 'Team', 
    href: '/team',
    submenu: [
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/team/careers' },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [technologyDropdownOpen, setTechnologyDropdownOpen] = useState(false);
  const [dashboardsDropdownOpen, setDashboardsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const technologyDropdownRef = useRef<HTMLDivElement>(null);
  const dashboardsDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const technologyButtonRef = useRef<HTMLButtonElement>(null);
  const dashboardsButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const teamButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node) &&
          aboutButtonRef.current && !aboutButtonRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
      if (technologyDropdownRef.current && !technologyDropdownRef.current.contains(event.target as Node) &&
          technologyButtonRef.current && !technologyButtonRef.current.contains(event.target as Node)) {
        setTechnologyDropdownOpen(false);
      }
      if (dashboardsDropdownRef.current && !dashboardsDropdownRef.current.contains(event.target as Node) &&
          dashboardsButtonRef.current && !dashboardsButtonRef.current.contains(event.target as Node)) {
        setDashboardsDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node) &&
          servicesButtonRef.current && !servicesButtonRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node) &&
          teamButtonRef.current && !teamButtonRef.current.contains(event.target as Node)) {
        setTeamDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Deep Engineering - Go to homepage">
            <Image src="/logo.svg" alt="Deep Engineering company logo" height={40} width={120} priority />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="menubar">
            {navigation.map((item) => (
              <li key={item.name} role="none" className="relative">
                {item.submenu ? (
                  <div className="relative" ref={
                    item.name === 'About' ? aboutDropdownRef : 
                    item.name === 'Technology' ? technologyDropdownRef : 
                    item.name === 'Dashboards' ? dashboardsDropdownRef :
                    item.name === 'Services' ? servicesDropdownRef : 
                    teamDropdownRef
                  }>
                    <button
                      ref={
                        item.name === 'About' ? aboutButtonRef : 
                        item.name === 'Technology' ? technologyButtonRef : 
                        item.name === 'Dashboards' ? dashboardsButtonRef :
                        item.name === 'Services' ? servicesButtonRef : 
                        teamButtonRef
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
                        } else if (item.name === 'Dashboards') {
                          setDashboardsDropdownOpen(!dashboardsDropdownOpen);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
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
                        } else if (item.name === 'Dashboards') {
                          setDashboardsDropdownOpen(true);
                          setAboutDropdownOpen(false);
                          setTechnologyDropdownOpen(false);
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
                      className="flex items-center space-x-1 text-gray-text hover:text-primary transition-colors duration-200 font-medium"
                      aria-expanded={
                        item.name === 'About' ? aboutDropdownOpen : 
                        item.name === 'Technology' ? technologyDropdownOpen : 
                        item.name === 'Dashboards' ? dashboardsDropdownOpen :
                        item.name === 'Services' ? servicesDropdownOpen : 
                        teamDropdownOpen
                      }
                      aria-haspopup="true"
                      aria-label={`Toggle ${item.name} menu`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {(
                      item.name === 'About' ? aboutDropdownOpen : 
                      item.name === 'Technology' ? technologyDropdownOpen : 
                      item.name === 'Dashboards' ? dashboardsDropdownOpen :
                      item.name === 'Services' ? servicesDropdownOpen : 
                      teamDropdownOpen
                    ) && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
                        onMouseEnter={() => {
                          if (item.name === 'About') {
                            setAboutDropdownOpen(true);
                          } else if (item.name === 'Technology') {
                            setTechnologyDropdownOpen(true);
                          } else if (item.name === 'Dashboards') {
                            setDashboardsDropdownOpen(true);
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
                          } else if (item.name === 'Dashboards') {
                            setDashboardsDropdownOpen(false);
                          } else if (item.name === 'Services') {
                            setServicesDropdownOpen(false);
                          } else {
                            setTeamDropdownOpen(false);
                          }
                        }}
                      >
                        {item.submenu.map((sub) => (
                          <div key={sub.name} className="relative group">
                            {sub.submenu ? (
                              <>
                                <button
                                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700 group-hover:bg-gray-100"
                                  aria-haspopup="true"
                                  aria-label={`Toggle ${sub.name} submenu`}
                                >
                                  <span>{sub.name}</span>
                                  <ChevronDown className="w-4 h-4 ml-auto" />
                                </button>
                                <div className="absolute top-0 left-full w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30 hidden group-hover:block group-focus-within:block">
                                  {sub.submenu.map((nested) => (
                                    <Link
                                      key={nested.name}
                                      href={nested.href}
                                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    >
                                      {nested.name}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={sub.href}
                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
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
                    role="menuitem"
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`text-gray-text hover:text-primary transition-colors duration-200 font-medium min-w-[44px] min-h-[44px] ${
                      pathname === item.href ? 'text-primary font-bold underline' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-text hover:text-primary min-w-[44px] min-h-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-gray-200" role="navigation" aria-label="Mobile navigation">
            <ul className="px-2 pt-2 pb-3 space-y-1" role="menu">
              {navigation.map((item) => (
                <li key={item.name} role="none">
                  {item.submenu ? (
                    <div>
                      <div className="px-3 py-2 text-gray-text font-medium">{item.name}</div>
                      <ul className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="block px-3 py-2 text-gray-text hover:text-primary transition-colors duration-200 text-sm"
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
                      role="menuitem"
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className="block px-3 py-2 text-gray-text hover:text-primary transition-colors duration-200 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
} 