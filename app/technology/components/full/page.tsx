import React from 'react';
import {
  Zap,
  Settings,
  Droplets,
  ArrowDownCircle,
  Wind,
  Link2,
  Gauge,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';

const toc = [
  {
    id: 'water-tank',
    label: 'Water Tank (Shaft)',
    icon: <Droplets className='w-6 h-6' />,
  },
  {
    id: 'floaters',
    label: 'Floaters (Buoyancy Bodies)',
    icon: <ArrowDownCircle className='w-6 h-6' />,
  },
  {
    id: 'chain',
    label: 'Endless Chain Conveyor',
    icon: <Link2 className='w-6 h-6' />,
  },
  {
    id: 'drive-shaft',
    label: 'Drive Shaft & Gearbox',
    icon: <Gauge className='w-6 h-6' />,
  },
  { id: 'generator', label: 'Generator', icon: <Zap className='w-6 h-6' /> },
  {
    id: 'air-system',
    label: 'Compressed Air System',
    icon: <Wind className='w-6 h-6' />,
  },
  {
    id: 'valve-snorkel',
    label: 'Valve & Snorkel Mechanism',
    icon: <Settings className='w-6 h-6' />,
  },
  {
    id: 'control-unit',
    label: 'Control Unit',
    icon: <Layers className='w-6 h-6' />,
  },
  {
    id: 'integration',
    label: 'System Integration & Operation',
    icon: <CheckCircle2 className='w-6 h-6' />,
  },
  { id: 'benefits', label: 'KPP Benefits', icon: <Zap className='w-6 h-6' /> },
];

export default function FullComponentsPage() {
  return (
    <div>
      <HeroSection
        title='KPP Full Components Overview'
        subtitle="Discover the advanced components that power the KPP's innovative, zero-emission energy system. Each component is engineered for maximum efficiency and reliability."
      />

      {/* Table of Contents */}
      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='mb-4'>Component Navigation</h2>
            <p className="text-lg text-white">
              Navigate through each core component of the Kinetic Power Plant
              system to understand its role and specifications.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto'>
            {toc.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className='group bg-gray-light hover:bg-primary hover:text-white p-4 rounded-lg transition-all duration-200 text-center'
                aria-label={`Jump to ${item.label}`}
              >
                <div className='w-12 h-12 bg-primary group-hover:bg-white rounded-full flex items-center justify-center mx-auto mb-3'>
                  <div className='text-white group-hover:text-primary transition-colors duration-200'>
                    {item.icon}
                  </div>
                </div>
                <h3 className='font-semibold text-sm'>{item.label}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Components Content */}
      <section className='section-padding bg-gray-light'>
        <div className='container'>
          <div className='max-w-4xl mx-auto space-y-12'>
            {[
              {
                id: 'water-tank',
                icon: <Droplets className='w-8 h-8' />,
                title: 'Water Tank (Shaft)',
                content: (
                  <>
                    <p className="text-lg text-white">
                      The KPP's vertical, cylindrical, water-filled shaft houses
                      all moving components. It can be constructed above or
                      below ground, with a typical height of ~22 meters for
                      full-scale units. The tank provides the environment for
                      buoyancy-driven motion and is engineered for minimal
                      surface footprint and robust, long-term operation.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>
                        Key Specifications:
                      </h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Material: Reinforced concrete or steel
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Height: ~22 m (customizable per unit)
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Initial fill: ~30 m³ water per 20 m shaft
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Evaporation minimized by underground/indoor siting
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'floaters',
                icon: <ArrowDownCircle className='w-8 h-8' />,
                title: 'Floaters (Buoyancy Bodies)',
                content: (
                  <>
                    <p className="text-lg text-white">
                      Each KPP module uses ~66 hollow steel floaters attached to
                      an endless chain. When filled with air, a floater rises;
                      when filled with water, it sinks. This alternating cycle
                      is the heart of the KPP's kinetic energy generation.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>
                        Key Specifications:
                      </h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Material: Corrosion-resistant steel
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Quantity: ~66 per module
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Cycle: Air-filled (rising) / Water-filled (sinking)
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Sealed for durability and minimal maintenance
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'chain',
                icon: <Link2 className='w-8 h-8' />,
                title: 'Endless Chain Conveyor',
                content: (
                  <>
                    <p className="text-lg text-white">
                      Two parallel chains run over upper and lower sprocket
                      wheels, carrying the floaters in a continuous loop. The
                      chain transmits the combined force of buoyant and heavy
                      floaters, enabling efficient energy transfer from the
                      floaters to the drive shaft.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>Key Features:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Heavy-duty, corrosion-resistant chain
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Continuous operation with minimal wear
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Upper/lower sprocket wheels (idler gears)
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'drive-shaft',
                icon: <Gauge className='w-8 h-8' />,
                title: 'Drive Shaft & Gearbox',
                content: (
                  <>
                    <p className="text-lg text-white">
                      The chain loop turns an overhead drive shaft at the top of
                      the tank. A gearbox connects this shaft to the generator,
                      increasing rotation speed to the generator's rated RPM for
                      optimal power conversion.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>Key Features:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Drive shaft: High-strength steel, precision bearings
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Gearbox: Increases RPM, robust for 24/7 operation
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Directly couples mechanical energy to generator
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'generator',
                icon: <Zap className='w-8 h-8' />,
                title: 'Generator',
                content: (
                  <>
                    <p className="text-lg text-white">
                      The generator converts mechanical rotation into
                      electricity. KPP uses a low-speed, permanent magnet AC
                      generator for high efficiency and reliability.
                    </p>
                    <div className='bg-white p-6 rounded-lg mb-6'>
                      <h4 className='font-semibold mb-3'>
                        Technical Specifications:
                      </h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Type: Brushless, low-speed permanent magnet
                          synchronous generator
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Rated Power: ~500–530 kW per module
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Efficiency: Up to 95.2% at 375 RPM
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Voltage/Frequency: 400 V / 50 Hz
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Insulation Class: H (IEC 60034)
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          IP Rating: IP54
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Designed Lifetime: 20 years
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Remote monitoring and overload protection
                        </li>
                      </ul>
                    </div>
                    <div className='bg-primary/10 p-4 rounded-lg border-l-4 border-primary'>
                      <p className="text-white">
                        <strong>Key Features:</strong> Modular design, compact
                        footprint, low maintenance, and robust operation in
                        demanding environments.
                      </p>
                    </div>
                  </>
                ),
              },
              {
                id: 'air-system',
                icon: <Wind className='w-8 h-8' />,
                title: 'Compressed Air System',
                content: (
                  <>
                    <p className="text-lg text-white">
                      An oil-lubricated piston-type air compressor and storage
                      tank inject compressed air into the floaters at the bottom
                      of the tank. A pressure regulator and synchronized valve
                      system control air injection timing.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>
                        Technical Specifications:
                      </h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Compressor: Oil-lubricated piston type, IE3 electric
                          motor
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Working Pressure: 10 bar (adjustable)
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Max Air Flow: 1.2–1.5 m³/min
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Receiver Tank: 300 L steel
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Power Input: 3.5–5.5 kW
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Auto start/stop, thermal cutout, pressure relief
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Consumes ~1% of net KPP output
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'valve-snorkel',
                icon: <Settings className='w-8 h-8' />,
                title: 'Valve & Snorkel Mechanism',
                content: (
                  <>
                    <p className="text-lg text-white">
                      At the lowest point, valves inject air into submerged
                      floaters, displacing water. At the top, valves release air
                      so water can refill the floater. This ensures a
                      closed-loop cycle of buoyancy and sinking.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>Key Features:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Precision-timed air injection and release
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Automated, PLC-controlled operation
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Ensures continuous, efficient cycling
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'control-unit',
                icon: <Layers className='w-8 h-8' />,
                title: 'Control Unit',
                content: (
                  <>
                    <p className="text-lg text-white">
                      A PLC-based control system coordinates the compressor,
                      valves, and generator load. It maintains optimal timing
                      for air injection and system operation, including startup,
                      shutdown, and safety interlocks.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>Key Features:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          PLC-based automation
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Real-time monitoring and control
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Startup/shutdown sequencing
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Safety interlocks and remote diagnostics
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'integration',
                icon: <CheckCircle2 className='w-8 h-8' />,
                title: 'System Integration & Operation',
                content: (
                  <>
                    <p className="text-lg text-white">
                      All components are integrated for seamless,
                      round-the-clock operation. The KPP's modular design allows
                      for scalable deployment, easy maintenance, and rapid
                      installation. Each module can operate independently or in
                      parallel for larger power needs.
                    </p>
                    <div className='bg-white p-6 rounded-lg'>
                      <h4 className='font-semibold mb-3'>Key Features:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Continuous 24/7 operation
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Modular, scalable plant size (500 kW blocks)
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Minimal surface footprint
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Low O&M costs
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Remote monitoring and control
                        </li>
                      </ul>
                    </div>
                  </>
                ),
              },
              {
                id: 'benefits',
                icon: <Zap className='w-8 h-8' />,
                title: 'KPP Benefits',
                content: (
                  <>
                    <div className='bg-white p-6 rounded-lg mb-6'>
                      <h4 className='font-semibold mb-3'>Key Benefits:</h4>
                      <ul className="space-y-2 text-white">
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Zero emissions, no fuel required
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          24/7 continuous power output
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Low maintenance and operating costs
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Scalable and modular for any project size
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Minimal environmental footprint
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Proven, TÜV/SGS/DEKRA-validated technology
                        </li>
                        <li className='flex items-center'>
                          <div className='w-2 h-2 bg-primary rounded-full mr-3'></div>
                          Ideal for grid, distributed, or off-grid applications
                        </li>
                      </ul>
                    </div>
                    <div className='bg-primary/10 p-6 rounded-lg border-l-4 border-primary'>
                      <p className="text-lg text-white">
                        The KPP is a transformative solution for sustainable,
                        reliable, and cost-effective power generation,
                        positioning Iraq and its partners at the forefront of
                        renewable energy innovation.
                      </p>
                    </div>
                  </>
                ),
              },
            ].map(section => (
              <div
                key={section.id}
                id={section.id}
                className='bg-white rounded-lg shadow-sm p-8'
              >
                <div className='flex items-center mb-6'>
                  <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4'>
                    <div className='text-white'>{section.icon}</div>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <div>{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
