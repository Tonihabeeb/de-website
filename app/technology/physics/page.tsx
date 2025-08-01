import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';

export default function PhysicsPage() {
  return (
    <div>
      <HeroSection
        title='The Physics Behind KPP'
        subtitle='In-depth explanation of the scientific principles and engineering that enable continuous, fuel-free power generation.'
      />
      <section className='section-padding bg-white'>
        <div className='container max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold mb-6'>
            Archimedes' Principle & Buoyancy
          </h2>
          <p className='text-lg text-gray-text mb-4'>
            The Kinetic Power Plant (KPP) leverages{' '}
            <strong>Archimedes' Principle</strong>, which states that any object
            submerged in a fluid experiences an upward buoyant force equal to
            the weight of the fluid displaced. In KPP, air is injected into
            underwater floaters, making them less dense than water and causing
            them to rise rapidly.
          </p>
          <div className='bg-gray-50 rounded-lg p-6 mb-8 text-center'>
            <span className='text-primary font-bold'>
              Diagram: Buoyant Force on Floater (Coming Soon)
            </span>
          </div>

          <h2 className='text-2xl font-bold mb-6'>Energy Conversion Process</h2>
          <p className='text-lg text-gray-text mb-4'>
            The rising floaters are attached to a chain system. As they ascend,
            their vertical motion is converted into rotational energy via a
            sprocket and shaft mechanism. This rotational energy is then used to
            drive a high-efficiency permanent magnet generator.
          </p>
          <ul className='list-disc pl-6 mb-6 text-gray-text'>
            <li>Air injection engine creates controlled buoyancy cycles</li>
            <li>Chain system translates vertical to rotational motion</li>
            <li>Generator produces grid-quality AC power at 375 RPM</li>
          </ul>

          <h2 className='text-2xl font-bold mb-6'>
            System Efficiency & Control
          </h2>
          <p className='text-lg text-gray-text mb-4'>
            KPP achieves high system efficiency (~95%) by minimizing friction,
            using direct-drive generators, and optimizing the air injection
            cycle. An integrated SCADA system monitors and controls all
            parameters in real time, ensuring safe, reliable, and optimal
            operation.
          </p>
          <div className='bg-gray-50 rounded-lg p-6 mb-8 text-center'>
            <span className='text-primary font-bold'>
              Diagram: KPP System Schematic (Coming Soon)
            </span>
          </div>

          <h2 className='text-2xl font-bold mb-6'>Key Physics Concepts</h2>
          <ul className='list-disc pl-6 mb-6 text-gray-text'>
            <li>
              <strong>Buoyant Force:</strong> F<sub>b</sub> = ρ<sub>water</sub>{' '}
              × V<sub>floater</sub> × g
            </li>
            <li>
              <strong>Work Done by Buoyancy:</strong> W = F<sub>b</sub> × h
              (height of ascent)
            </li>
            <li>
              <strong>Mechanical Power:</strong> P = τ × ω (torque × angular
              velocity)
            </li>
            <li>
              <strong>Generator Efficiency:</strong> η = P<sub>out</sub> / P
              <sub>in</sub>
            </li>
          </ul>

          <h2 className='text-2xl font-bold mb-6'>
            Engineering Considerations
          </h2>
          <ul className='list-disc pl-6 mb-6 text-gray-text'>
            <li>Material selection for corrosion resistance and durability</li>
            <li>Optimized floater shape for maximum lift and minimal drag</li>
            <li>Redundant safety systems and emergency shutdown protocols</li>
            <li>
              Environmental impact: zero emissions, zero water consumption,
              minimal land use
            </li>
          </ul>

          <div className='mt-12 text-center'>
            <Link
              href='/technology/how-it-works'
              className='inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark focus:bg-primary-dark focus:text-white transition-colors shadow-lg hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-white'
            >
              Back to How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
