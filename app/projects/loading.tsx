export default function Loading() {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white animate-pulse text-white">
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='h-10 w-2/3 mx-auto bg-white/30 rounded mb-6' />
            <div className='h-6 w-1/2 mx-auto bg-white/20 rounded' />
          </div>
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='bg-gray-100 p-8 rounded-lg shadow-sm animate-pulse'
              >
                <div className='h-8 w-1/2 bg-gray-300 rounded mb-4 mx-auto' />
                <div className='h-4 w-1/3 bg-gray-200 rounded mb-2 mx-auto' />
                <div className='h-4 w-2/3 bg-gray-200 rounded mx-auto' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
