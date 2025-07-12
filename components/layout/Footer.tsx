import Link from 'next/link';

const footerNavigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
    { name: 'Style Guide', href: '/style-guide' },
  ],
  technology: [
    { name: 'KPP Overview', href: '/technology' },
    { name: 'How It Works', href: '/technology/how-it-works' },
    { name: 'Components', href: '/technology/components' },
    { name: 'Performance', href: '/technology/performance' },
  ],
  projects: [
    { name: 'Current Projects', href: '/projects' },
    { name: 'Zakho 100MW', href: '/projects#zakho' },
    { name: 'Soran 100MW', href: '/projects#soran' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-semibold mb-4">Deep Engineering</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Iraq's pioneer in renewable energy project development, turning innovative 
              technology into sustainable power solutions.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Erbil, Iraq (HQ)</p>
              <p>📍 Basra, Iraq (Branch)</p>
              <p>📧 info@deepengineering.co</p>
            </div>
          </div>

          {/* Technology Links */}
          <div>
            <h4 className="font-semibold mb-4">Technology</h4>
            <ul className="space-y-2">
              {footerNavigation.technology.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Links */}
          <div>
            <h4 className="font-semibold mb-4">Projects</h4>
            <ul className="space-y-2">
              {footerNavigation.projects.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 Deep Engineering. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerNavigation.company.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 