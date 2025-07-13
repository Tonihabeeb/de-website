'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Technology', 
    href: '/technology',
    submenu: [
      { name: 'Overview', href: '/technology' },
      { name: 'Technical Specifications', href: '/technology/specifications' },
      { name: 'Economics', href: '/economics' },
      { name: 'Resources', href: '/resources' },
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [technologyDropdownOpen, setTechnologyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setTechnologyDropdownOpen(false);
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
                  <div className="relative" ref={dropdownRef}>
                    <button
                      ref={buttonRef}
                      onClick={() => setTechnologyDropdownOpen(!technologyDropdownOpen)}
                      onMouseEnter={() => setTechnologyDropdownOpen(true)}
                      className="flex items-center space-x-1 text-gray-text hover:text-primary transition-colors duration-200 font-medium"
                      aria-expanded={technologyDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    
                    {technologyDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                        onMouseEnter={() => setTechnologyDropdownOpen(true)}
                        onMouseLeave={() => setTechnologyDropdownOpen(false)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-text hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => setTechnologyDropdownOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`text-gray-text hover:text-primary transition-colors duration-200 font-medium ${
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
            className="md:hidden p-2 text-gray-text hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
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