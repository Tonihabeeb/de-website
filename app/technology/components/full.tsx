import React from 'react';

const toc = [
  { id: 'water-tank', label: 'Water Tank (Shaft)' },
  { id: 'floaters', label: 'Floaters (Buoyancy Bodies)' },
  { id: 'chain', label: 'Endless Chain Conveyor' },
  { id: 'drive-shaft', label: 'Drive Shaft & Gearbox' },
  { id: 'generator', label: 'Generator' },
  { id: 'air-system', label: 'Compressed Air System' },
  { id: 'valve-snorkel', label: 'Valve & Snorkel Mechanism' },
  { id: 'control-unit', label: 'Control Unit' },
  { id: 'integration', label: 'System Integration & Operation' },
  { id: 'benefits', label: 'KPP Benefits' },
];

export default function FullComponentsPage() {
  return (
    <section className='relative py-20 bg-gradient-to-br from-primary via-primary-dark to-primary text-white min-h-screen'>
      <div className='container mx-auto px-4'>
        {/* Hero Section */}
        <div className='max-w-4xl mx-auto text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white'>
            Kinetic Power Plant (KPP) – Full Components Overview
          </h1>
          <p className='text-xl md:text-2xl mb-4 text-white font-semibold'>
            Discover the advanced components that power the KPP’s innovative,
            zero-emission energy system.
          </p>
          <p className='text-lg text-white/80'>
            The Kinetic Power Plant (KPP) is a modular, continuous-operation
            renewable energy system that harnesses buoyancy and gravity to
            generate electricity 24/7, with no fuel, no combustion, and zero
            emissions. Below is a detailed breakdown of each core component and
            its technical role in the system.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className='mb-12 max-w-2xl mx-auto'>
          <ul className='flex flex-wrap justify-center gap-4 text-primary-light/90 text-base md:text-lg font-semibold'>
            {toc.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className='hover:underline focus:underline'
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='space-y-16 max-w-3xl mx-auto'>
          {/* Water Tank (Shaft) */}
          <section id='water-tank'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Water Tank (Shaft)
            </h2>
            <p className='text-white/90 mb-2'>
              The KPP’s vertical, cylindrical, water-filled shaft houses all
              moving components. It can be constructed above or below ground,
              with a typical height of ~22 meters for full-scale units. The tank
              provides the environment for buoyancy-driven motion and is
              engineered for minimal surface footprint and robust, long-term
              operation.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Material: Reinforced concrete or steel</li>
              <li>Height: ~22 m (customizable per unit)</li>
              <li>Initial fill: ~30 m³ water per 20 m shaft</li>
              <li>Evaporation minimized by underground/indoor siting</li>
            </ul>
          </section>

          {/* Floaters (Buoyancy Bodies) */}
          <section id='floaters'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Floaters (Buoyancy Bodies)
            </h2>
            <p className='text-white/90 mb-2'>
              Each KPP module uses ~66 hollow steel floaters attached to an
              endless chain. When filled with air, a floater rises; when filled
              with water, it sinks. This alternating cycle is the heart of the
              KPP’s kinetic energy generation.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Material: Corrosion-resistant steel</li>
              <li>Quantity: ~66 per module</li>
              <li>Cycle: Air-filled (rising) / Water-filled (sinking)</li>
              <li>Sealed for durability and minimal maintenance</li>
            </ul>
          </section>

          {/* Endless Chain Conveyor */}
          <section id='chain'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Endless Chain Conveyor
            </h2>
            <p className='text-white/90 mb-2'>
              Two parallel chains run over upper and lower sprocket wheels,
              carrying the floaters in a continuous loop. The chain transmits
              the combined force of buoyant and heavy floaters, enabling
              efficient energy transfer from the floaters to the drive shaft.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Heavy-duty, corrosion-resistant chain</li>
              <li>Continuous operation with minimal wear</li>
              <li>Upper/lower sprocket wheels (idler gears)</li>
            </ul>
          </section>

          {/* Drive Shaft & Gearbox */}
          <section id='drive-shaft'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Drive Shaft & Gearbox
            </h2>
            <p className='text-white/90 mb-2'>
              The chain loop turns an overhead drive shaft at the top of the
              tank. A gearbox connects this shaft to the generator, increasing
              rotation speed to the generator’s rated RPM for optimal power
              conversion.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Drive shaft: High-strength steel, precision bearings</li>
              <li>Gearbox: Increases RPM, robust for 24/7 operation</li>
              <li>Directly couples mechanical energy to generator</li>
            </ul>
          </section>

          {/* Generator */}
          <section id='generator'>
            <h2 className='text-2xl font-bold mb-2 text-white'>Generator</h2>
            <p className='text-white/90 mb-2'>
              The generator converts mechanical rotation into electricity. KPP
              uses a low-speed, permanent magnet AC generator for high
              efficiency and reliability.
            </p>
            <ul className='list-disc list-inside text-white/80 mb-2'>
              <li>
                Type: Brushless, low-speed permanent magnet synchronous
                generator
              </li>
              <li>Rated Power: ~500–530 kW per module</li>
              <li>Efficiency: Up to 95.2% at 375 RPM</li>
              <li>Voltage/Frequency: 400 V / 50 Hz</li>
              <li>Insulation Class: H (IEC 60034)</li>
              <li>IP Rating: IP54</li>
              <li>Designed Lifetime: 20 years</li>
              <li>Remote monitoring and overload protection</li>
            </ul>
            <p className='text-white/80'>
              <strong>Key Features:</strong> Modular design, compact footprint,
              low maintenance, and robust operation in demanding environments.
            </p>
          </section>

          {/* Compressed Air System */}
          <section id='air-system'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Compressed Air System
            </h2>
            <p className='text-white/90 mb-2'>
              An oil-lubricated piston-type air compressor and storage tank
              inject compressed air into the floaters at the bottom of the tank.
              A pressure regulator and synchronized valve system control air
              injection timing.
            </p>
            <ul className='list-disc list-inside text-white/80 mb-2'>
              <li>
                Compressor: Oil-lubricated piston type, IE3 electric motor
              </li>
              <li>Working Pressure: 10 bar (adjustable)</li>
              <li>Max Air Flow: 1.2–1.5 m³/min</li>
              <li>Receiver Tank: 300 L steel</li>
              <li>Power Input: 3.5–5.5 kW</li>
              <li>Auto start/stop, thermal cutout, pressure relief</li>
              <li>Consumes ~1% of net KPP output</li>
            </ul>
          </section>

          {/* Valve & Snorkel Mechanism */}
          <section id='valve-snorkel'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              Valve & Snorkel Mechanism
            </h2>
            <p className='text-white/90 mb-2'>
              At the lowest point, valves inject air into submerged floaters,
              displacing water. At the top, valves release air so water can
              refill the floater. This ensures a closed-loop cycle of buoyancy
              and sinking.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Precision-timed air injection and release</li>
              <li>Automated, PLC-controlled operation</li>
              <li>Ensures continuous, efficient cycling</li>
            </ul>
          </section>

          {/* Control Unit */}
          <section id='control-unit'>
            <h2 className='text-2xl font-bold mb-2 text-white'>Control Unit</h2>
            <p className='text-white/90 mb-2'>
              A PLC-based control system coordinates the compressor, valves, and
              generator load. It maintains optimal timing for air injection and
              system operation, including startup, shutdown, and safety
              interlocks.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>PLC-based automation</li>
              <li>Real-time monitoring and control</li>
              <li>Startup/shutdown sequencing</li>
              <li>Safety interlocks and remote diagnostics</li>
            </ul>
          </section>

          {/* System Integration & Operation */}
          <section id='integration'>
            <h2 className='text-2xl font-bold mb-2 text-white'>
              System Integration & Operation
            </h2>
            <p className='text-white/90 mb-2'>
              All components are integrated for seamless, round-the-clock
              operation. The KPP’s modular design allows for scalable
              deployment, easy maintenance, and rapid installation. Each module
              can operate independently or in parallel for larger power needs.
            </p>
            <ul className='list-disc list-inside text-white/80'>
              <li>Continuous 24/7 operation</li>
              <li>Modular, scalable plant size (500 kW blocks)</li>
              <li>Minimal surface footprint</li>
              <li>Low O&M costs</li>
              <li>Remote monitoring and control</li>
            </ul>
          </section>

          {/* KPP Benefits */}
          <section id='benefits'>
            <h2 className='text-2xl font-bold mb-2 text-white'>KPP Benefits</h2>
            <ul className='list-disc list-inside text-white/80 mb-2'>
              <li>Zero emissions, no fuel required</li>
              <li>24/7 continuous power output</li>
              <li>Low maintenance and operating costs</li>
              <li>Scalable and modular for any project size</li>
              <li>Minimal environmental footprint</li>
              <li>Proven, TÜV/SGS/DEKRA-validated technology</li>
              <li>Ideal for grid, distributed, or off-grid applications</li>
            </ul>
            <p className='text-white/80'>
              The KPP is a transformative solution for sustainable, reliable,
              and cost-effective power generation, positioning Iraq and its
              partners at the forefront of renewable energy innovation.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
