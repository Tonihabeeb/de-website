import Link from 'next/link';

export default function MiniAbout() {
  return (
    <section className='section-padding bg-white'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <div>
            <h2 className='mb-6'>About Deep Engineering</h2>
            <p className="text-lg text-white">
              Deep Engineering is Iraq's pioneer in renewable energy project
              development, turning innovative technology into sustainable power
              solutions. Founded in 2019 in Erbil with a branch in Basra, we've
              assembled a multidisciplinary team to drive Iraq's clean energy
              future.
            </p>
            <p className="text-lg text-white">
              As the exclusive KPP licensee for Iraq, we are deploying
              world-class kinetic power plants to deliver reliable green
              electricity where it's needed most.
            </p>

            {/* Key Highlights */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary mb-2'>2019</div>
                <div className="text-sm text-white">Founded</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary mb-2'>35+</div>
                <div className="text-sm text-white">Team Members</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary mb-2'>2</div>
                <div className="text-sm text-white">Offices</div>
              </div>
            </div>

            <Link href='/about' className='btn-primary'>
              Learn More About Us
            </Link>
          </div>

          {/* Visual/Image Placeholder */}
          <div className='bg-gray-light rounded-lg p-8 text-center'>
            <div className='w-full h-64 relative rounded-lg flex items-center justify-center overflow-hidden'>
              <video
                className='absolute inset-0 w-full h-full object-cover rounded-lg'
                src='/hq-video.mp4'
                autoPlay
                loop
                muted
                playsInline
                aria-label='Deep Engineering HQ video background'
              />
              <div className='relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none select-none'>
                <span className='text-4xl md:text-6xl font-extrabold tracking-widest text-white opacity-20 whitespace-pre-line text-center drop-shadow-lg'>
                  Deep Engineering HQ\nErbil, Iraq
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
