import Link from 'next/link';

const footerNavigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ],
  technology: [
    { name: 'KPP Overview', href: '/technology' },
    { name: 'Technical Specifications', href: '/technology/specifications' },
    { name: 'Economics', href: '/economics' },
    { name: 'Resources', href: '/resources' },
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
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-semibold mb-4 text-white drop-shadow-lg">Deep Engineering</h3>
            <p className="text-white mb-4 max-w-md drop-shadow-lg">
              Iraq's pioneer in renewable energy project development, turning innovative 
              technology into sustainable power solutions.
            </p>
            <address className="space-y-2 text-sm text-white not-italic drop-shadow-lg">
              <p>📍 Roya Tower A 1-14, Erbil-44001, Iraq (HQ)</p>
              <p>📍 Al Muhendisen - Al Zubair Road, Basra, Iraq (Branch)</p>
              <p>📧 <a href="mailto:info@deepengineering.co" className="underline">info@deepengineering.co</a></p>
            </address>
          </div>

          {/* Technology Links */}
          <nav aria-label="Technology navigation">
            <h4 className="font-semibold mb-4 text-white drop-shadow-lg">Technology</h4>
            <ul className="space-y-2">
              {footerNavigation.technology.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-white transition-colors duration-200 drop-shadow-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Projects Links */}
          <nav aria-label="Projects navigation">
            <h4 className="font-semibold mb-4 text-white drop-shadow-lg">Projects</h4>
            <ul className="space-y-2">
              {footerNavigation.projects.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-white transition-colors duration-200 drop-shadow-lg"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm drop-shadow-lg">
              © {year} Deep Engineering. All rights reserved.
            </p>
            <nav className="flex space-x-6 mt-4 md:mt-0" aria-label="Company navigation">
              {footerNavigation.company.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-white transition-colors duration-200 text-sm drop-shadow-lg"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
} 