'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  Home, 
  Zap, 
  Building2, 
  DollarSign, 
  BookOpen, 
  Target, 
  Info, 
  Users, 
  Phone,
  ChevronDown,
  X,
  BarChart3,
  Settings,
  FileText,
  Shield,
  Globe
} from 'lucide-react';

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string; description?: string }[];
}

const mobileNavItems: MobileNavItem[] = [
  { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
  { 
    label: 'About', 
    href: '/about', 
    icon: <Info className="w-5 h-5" />,
    children: [
      { label: 'Overview', href: '/about', description: 'Company overview and vision' },
      { label: 'Leadership', href: '/about/leadership', description: 'Executive team' },
      { label: 'ESG', href: '/about/esg', description: 'Environmental, Social & Governance' },
      { label: 'HSE', href: '/about/hse', description: 'Health, Safety & Environment' },
      { label: 'Vision & Mission', href: '/about/vision-mission', description: 'Our purpose and goals' },
      { label: 'CSR', href: '/about/csr', description: 'Corporate Social Responsibility' },
    ]
  },
  { 
    label: 'Technology', 
    href: '/technology', 
    icon: <Zap className="w-5 h-5" />,
    children: [
      { label: 'Overview', href: '/technology', description: 'KPP technology overview' },
      { label: 'How It Works', href: '/technology/how-it-works', description: 'Technology process' },
      { label: 'Components', href: '/technology/components', description: 'System components' },
      { label: 'Generator', href: '/technology/generator', description: 'Power generation' },
      { label: 'Floater', href: '/technology/floater', description: 'Floating mechanism' },
      { label: 'Conveyor Chain', href: '/technology/conveyor-chain', description: 'Chain system' },
      { label: 'Pneumatic System', href: '/technology/pneumatic-system', description: 'Air system' },
      { label: 'Gearbox', href: '/technology/gearbox', description: 'Transmission system' },
      { label: 'Control System', href: '/technology/control-system', description: 'Automation & control' },
      { label: 'Performance', href: '/technology/performance', description: 'System performance' },
      { label: 'Specifications', href: '/technology/specifications', description: 'Technical specs' },
      { label: 'KPP Documentation', href: '/technology/kpp-documentation', description: 'Technical docs' },
    ]
  },
  {
    label: 'Dashboards',
    href: '/dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: 'Project Progress', href: '/dashboard/project-progress', description: 'Project tracking' },
      { label: 'Financial', href: '/dashboard/financial', description: 'Financial metrics' },
      { label: 'Environment Dashboard', href: '/dashboard/environmental', description: 'Environmental metrics' },
      { label: 'Stakeholders', href: '/dashboard/stakeholders', description: 'Stakeholder management' },
      { label: 'Resources', href: '/resources', description: 'Resource management' },
    ]
  },
  { 
    label: 'Services', 
    href: '/services', 
    icon: <Settings className="w-5 h-5" />,
    children: [
      { label: 'Supply', href: '/services/supply', description: 'Equipment supply' },
      { label: 'EPC', href: '/services/epc', description: 'Engineering, Procurement & Construction' },
      { label: 'O&M', href: '/services/om', description: 'Operations & Maintenance' },
    ]
  },
  { label: 'Projects', href: '/projects', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Economics', href: '/economics', icon: <DollarSign className="w-5 h-5" /> },
  { label: 'Resources', href: '/resources', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Interactive', href: '/interactive-features', icon: <Target className="w-5 h-5" /> },
  { 
    label: 'Team', 
    href: '/team', 
    icon: <Users className="w-5 h-5" />,
    children: [
      { label: 'Our Team', href: '/team', description: 'Meet our team' },
      { label: 'Careers', href: '/team/careers', description: 'Job opportunities' },
    ]
  },
  { label: 'Contact', href: '/contact', icon: <Phone className="w-5 h-5" /> }
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setExpandedItem(null);
    }
  };

  const toggleExpanded = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out touch-target min-w-[48px] min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out" 
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-primary-dark">
            <div className="flex items-center space-x-3">
              <Image src="/logo.svg" alt="Deep Engineering" height={32} width={96} className="filter brightness-0 invert" />
              <h2 className="text-lg font-serif font-bold text-white">Menu</h2>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-target rounded-lg hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4">
              <ul className="space-y-1">
                {mobileNavItems.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 touch-target min-w-[44px] min-h-[44px] text-left ${
                            isActive(item.href) 
                              ? 'bg-primary text-white shadow-md' 
                              : 'hover:bg-gray-50 text-gray-text hover:text-primary'
                          }`}
                          aria-label={`Expand/collapse ${item.label} submenu`}
                          aria-expanded={expandedItem === item.label}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`text-xl ${isActive(item.href) ? 'text-white' : 'text-primary'}`}>
                              {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              expandedItem === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {expandedItem === item.label && (
                          <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/20">
                            <ul className="space-y-1">
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={`block p-3 rounded-lg transition-all duration-200 touch-target min-w-[44px] min-h-[44px] ${
                                      isActive(child.href) 
                                        ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                                        : 'text-gray-text hover:bg-gray-50 hover:text-primary'
                                    }`}
                                    onClick={toggleMenu}
                                  >
                                    <div className="font-medium">{child.label}</div>
                                    {child.description && (
                                      <div className="text-xs text-gray-500 mt-1">{child.description}</div>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 touch-target min-w-[44px] min-h-[44px] ${
                          isActive(item.href) 
                            ? 'bg-primary text-white shadow-md' 
                            : 'hover:bg-gray-50 text-gray-text hover:text-primary'
                        }`}
                        onClick={toggleMenu}
                      >
                        <span className={`text-xl ${isActive(item.href) ? 'text-white' : 'text-primary'}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium text-primary">Deep Engineering</p>
              </div>
              <p className="text-xs text-gray-500">KPP Technology Solutions</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>Continuous Clean Energy</span>
                <span>•</span>
                <span>Anywhere</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 