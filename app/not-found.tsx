import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">Page Not Found</h1>
            <p className="text-xl text-white leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-primary mb-4">404</div>
              <h2 className="text-2xl font-semibold text-primary mb-4">Oops! Page Not Found</h2>
              <p className="text-lg text-gray-text mb-8">
                We're sorry, but the page you're looking for doesn't exist. It might have been moved, 
                deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Link 
                href="/"
                className="bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200"
              >
                Go to Homepage
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-primary text-primary px-6 py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="bg-gray-light rounded-lg p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Popular Pages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/technology"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-primary font-semibold mb-2">Technology</div>
                  <div className="text-base text-gray-text">Learn about KPP technology</div>
                </Link>
                <Link 
                  href="/projects"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-primary font-semibold mb-2">Projects</div>
                  <div className="text-base text-gray-text">View our current projects</div>
                </Link>
                <Link 
                  href="/about"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-primary font-semibold mb-2">About Us</div>
                  <div className="text-base text-gray-text">Learn about Deep Engineering</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 