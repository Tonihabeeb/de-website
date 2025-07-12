import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="mb-6 text-white drop-shadow-lg">Ready to Power Your Future?</h2>
          <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-lg">
            Join us in revolutionizing Iraq's energy landscape with clean, continuous power. 
            Whether you're interested in our technology, projects, or partnership opportunities, 
            we'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get in Touch
            </Link>
            <Link 
              href="/technology"
              className="border-4 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Learn About KPP
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white drop-shadow-lg">Email Us</h3>
              <p className="text-white drop-shadow-lg"><a href="mailto:info@deepengineering.co" className="underline">info@deepengineering.co</a></p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white drop-shadow-lg">Visit Us</h3>
              <p className="text-white drop-shadow-lg">Roya Tower A 1-14, Erbil-44001, Iraq (HQ)</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white drop-shadow-lg">Call Us</h3>
              <p className="text-white drop-shadow-lg">
                <a href="tel:+9647504663879" className="underline block">+964 750 466 3879</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 