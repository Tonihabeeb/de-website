'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavItem {
  label: string;
  href: string;
  icon: string;
  children?: { label: string; href: string }[];
}

const mobileNavItems: MobileNavItem[] = [
  { label: 'Home', href: '/', icon: '🏠' },
  { 
    label: 'Technology', 
    href: '/technology', 
    icon: '⚡',
    children: [
      { label: 'How It Works', href: '/technology/how-it-works' },
      { label: 'Components', href: '/technology/components' },
      { label: 'Performance', href: '/technology/performance' },
      { label: 'Specifications', href: '/technology/specifications' }
    ]
  },
  { label: 'Projects', href: '/projects', icon: '🏗️' },
  { label: 'Economics', href: '/economics', icon: '💰' },
  { label: 'Resources', href: '/resources', icon: '📚' },
  { label: 'Interactive', href: '/interactive-features', icon: '🎯' },
  { label: 'About', href: '/about', icon: 'ℹ️' },
  { label: 'Team', href: '/team', icon: '👥' },
  { label: 'Contact', href: '/contact', icon: '📞' }
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
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-primary text-white rounded-lg shadow-lg touch-target min-w-[44px] min-h-[44px]"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-500 hover:text-gray-700 touch-target"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {mobileNavItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-200 touch-target min-w-[44px] min-h-[44px] ${
                          isActive(item.href) ? 'bg-primary text-white' : 'hover:bg-gray-100'
                        }`}
                        aria-label={`Expand/collapse ${item.label} submenu`}
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            expandedItem === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedItem === item.label && (
                        <ul className="ml-8 mt-2 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`block p-3 rounded-lg transition-colors duration-200 touch-target min-w-[44px] min-h-[44px] ${
                                  isActive(child.href) ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50'
                                }`}
                                onClick={toggleMenu}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center p-4 rounded-lg transition-colors duration-200 touch-target min-w-[44px] min-h-[44px] ${
                        isActive(item.href) ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                      onClick={toggleMenu}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Deep Engineering</p>
              <p className="text-xs text-gray-600">KPP Technology Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 