import Link from 'next/link';

export default function MiniAbout() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="mb-6">About Deep Engineering</h2>
            <p className="text-lg text-gray-text mb-6 leading-relaxed">
              Deep Engineering is Iraq's pioneer in renewable energy project development, 
              turning innovative technology into sustainable power solutions. Founded in 2019 
              in Erbil with a branch in Basra, we've assembled a multidisciplinary team to 
              drive Iraq's clean energy future.
            </p>
            <p className="text-lg text-gray-text mb-8 leading-relaxed">
              As the exclusive KPP licensee for Iraq, we are deploying world-class kinetic 
              power plants to deliver reliable green electricity where it's needed most.
            </p>
            
            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">2019</div>
                <div className="text-sm text-gray-text">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">35+</div>
                <div className="text-sm text-gray-text">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-gray-text">Offices</div>
              </div>
            </div>
            
            <Link 
              href="/about"
              className="btn-primary"
            >
              Learn More About Us
            </Link>
          </div>
          
          {/* Visual/Image Placeholder */}
          <div className="bg-gray-light rounded-lg p-8 text-center">
            <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-lg font-semibold">Deep Engineering HQ</p>
                <p className="text-sm opacity-90">Erbil, Iraq</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 