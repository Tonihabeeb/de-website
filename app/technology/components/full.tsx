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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Material: Reinforced concrete or steel</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Height: ~22 m (customizable per unit)</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Initial fill: ~30 m³ water per 20 m shaft</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Evaporation minimized by underground/indoor siting</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Material: Corrosion-resistant steel</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Quantity: ~66 per module</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Cycle: Air-filled (rising) / Water-filled (sinking)</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Sealed for durability and minimal maintenance</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Heavy-duty, corrosion-resistant chain</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Continuous operation with minimal wear</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Upper/lower sprocket wheels (idler gears)</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Drive shaft: High-strength steel, precision bearings</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Gearbox: Increases RPM, robust for 24/7 operation</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Directly couples mechanical energy to generator</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Type: Brushless, low-speed permanent magnet synchronous
                generator</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Rated Power: ~500–530 kW per module</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Efficiency: Up to 95.2% at 375 RPM</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Voltage/Frequency: 400 V / 50 Hz</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Insulation Class: H (IEC 60034)</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">IP Rating: IP54</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Designed Lifetime: 20 years</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Remote monitoring and overload protection</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Compressor: Oil-lubricated piston type, IE3 electric motor</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Working Pressure: 10 bar (adjustable)</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Max Air Flow: 1.2–1.5 m³/min</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Receiver Tank: 300 L steel</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Power Input: 3.5–5.5 kW</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Auto start/stop, thermal cutout, pressure relief</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Consumes ~1% of net KPP output</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Precision-timed air injection and release</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Automated, PLC-controlled operation</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Ensures continuous, efficient cycling</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">PLC-based automation</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Real-time monitoring and control</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Startup/shutdown sequencing</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Safety interlocks and remote diagnostics</span>
                </li>
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
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Continuous 24/7 operation</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Modular, scalable plant size (500 kW blocks)</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Minimal surface footprint</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Low O&M costs</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Remote monitoring and control</span>
                </li>
            </ul>
          </section>

          {/* KPP Benefits */}
          <section id='benefits'>
            <h2 className='text-2xl font-bold mb-2 text-white'>KPP Benefits</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Zero emissions, no fuel required</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">24/7 continuous power output</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Low maintenance and operating costs</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Scalable and modular for any project size</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Minimal environmental footprint</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Proven, TÜV/SGS/DEKRA-validated technology</span>
                </li>
              <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-text">Ideal for grid, distributed, or off-grid applications</span>
                </li>
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
