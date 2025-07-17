import React from 'react';
import { Zap, Settings, Droplets, ArrowDownCircle, Wind, Link2, Gauge, Layers, CheckCircle2 } from 'lucide-react';

const toc = [
  { id: 'water-tank', label: 'Water Tank (Shaft)', icon: <Droplets className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'floaters', label: 'Floaters (Buoyancy Bodies)', icon: <ArrowDownCircle className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'chain', label: 'Endless Chain Conveyor', icon: <Link2 className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'drive-shaft', label: 'Drive Shaft & Gearbox', icon: <Gauge className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'generator', label: 'Generator', icon: <Zap className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'air-system', label: 'Compressed Air System', icon: <Wind className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'valve-snorkel', label: 'Valve & Snorkel Mechanism', icon: <Settings className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'control-unit', label: 'Control Unit', icon: <Layers className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'integration', label: 'System Integration & Operation', icon: <CheckCircle2 className="inline w-5 h-5 mr-2 text-accent" /> },
  { id: 'benefits', label: 'KPP Benefits', icon: <Zap className="inline w-5 h-5 mr-2 text-accent" /> },
];

export default function FullComponentsPage() {
  return (
    <section className="relative py-0 bg-gradient-to-br from-primary via-primary-dark to-primary text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 mb-10 bg-gradient-to-br from-primary via-primary-dark to-primary shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[url('/hero-static.svg')] bg-center bg-cover pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-12 h-12 text-accent drop-shadow-lg animate-pulse" aria-hidden="true" />
            <h1 className="ml-4 text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg flex items-center">
              Kinetic Power Plant (KPP)
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">Full Components Overview</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-2">
            The Kinetic Power Plant (KPP) is a modular, continuous-operation renewable energy system that harnesses buoyancy and gravity to generate electricity 24/7, with no fuel, no combustion, and zero emissions.
          </p>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            Below is a detailed breakdown of each core component and its technical role in the system.
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 max-w-3xl mx-auto px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {toc.map((item) => (
            <li key={item.id} className="">
              <a
                href={`#${item.id}`}
                className="flex items-center px-4 py-3 rounded-lg bg-white/10 hover:bg-accent/80 focus:bg-accent/90 transition-colors duration-200 shadow-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
                tabIndex={0}
                aria-label={`Jump to ${item.label}`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-16 max-w-3xl mx-auto px-4">
        {/* Section Card Template */}
        {[
          {
            id: 'water-tank',
            icon: <Droplets className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Water Tank (Shaft)',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  The KPP’s vertical, cylindrical, water-filled shaft houses all moving components. It can be constructed above or below ground, with a typical height of ~22 meters for full-scale units. The tank provides the environment for buoyancy-driven motion and is engineered for minimal surface footprint and robust, long-term operation.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Material: Reinforced concrete or steel</li>
                  <li>Height: ~22 m (customizable per unit)</li>
                  <li>Initial fill: ~30 m³ water per 20 m shaft</li>
                  <li>Evaporation minimized by underground/indoor siting</li>
                </ul>
              </>
            ),
          },
          {
            id: 'floaters',
            icon: <ArrowDownCircle className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Floaters (Buoyancy Bodies)',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  Each KPP module uses ~66 hollow steel floaters attached to an endless chain. When filled with air, a floater rises; when filled with water, it sinks. This alternating cycle is the heart of the KPP’s kinetic energy generation.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Material: Corrosion-resistant steel</li>
                  <li>Quantity: ~66 per module</li>
                  <li>Cycle: Air-filled (rising) / Water-filled (sinking)</li>
                  <li>Sealed for durability and minimal maintenance</li>
                </ul>
              </>
            ),
          },
          {
            id: 'chain',
            icon: <Link2 className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Endless Chain Conveyor',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  Two parallel chains run over upper and lower sprocket wheels, carrying the floaters in a continuous loop. The chain transmits the combined force of buoyant and heavy floaters, enabling efficient energy transfer from the floaters to the drive shaft.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Heavy-duty, corrosion-resistant chain</li>
                  <li>Continuous operation with minimal wear</li>
                  <li>Upper/lower sprocket wheels (idler gears)</li>
                </ul>
              </>
            ),
          },
          {
            id: 'drive-shaft',
            icon: <Gauge className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Drive Shaft & Gearbox',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  The chain loop turns an overhead drive shaft at the top of the tank. A gearbox connects this shaft to the generator, increasing rotation speed to the generator’s rated RPM for optimal power conversion.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Drive shaft: High-strength steel, precision bearings</li>
                  <li>Gearbox: Increases RPM, robust for 24/7 operation</li>
                  <li>Directly couples mechanical energy to generator</li>
                </ul>
              </>
            ),
          },
          {
            id: 'generator',
            icon: <Zap className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Generator',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  The generator converts mechanical rotation into electricity. KPP uses a low-speed, permanent magnet AC generator for high efficiency and reliability.
                </p>
                <ul className="list-disc list-inside text-white/80 mb-2">
                  <li>Type: Brushless, low-speed permanent magnet synchronous generator</li>
                  <li>Rated Power: ~500–530 kW per module</li>
                  <li>Efficiency: Up to 95.2% at 375 RPM</li>
                  <li>Voltage/Frequency: 400 V / 50 Hz</li>
                  <li>Insulation Class: H (IEC 60034)</li>
                  <li>IP Rating: IP54</li>
                  <li>Designed Lifetime: 20 years</li>
                  <li>Remote monitoring and overload protection</li>
                </ul>
                <p className="text-white/80">
                  <strong>Key Features:</strong> Modular design, compact footprint, low maintenance, and robust operation in demanding environments.
                </p>
              </>
            ),
          },
          {
            id: 'air-system',
            icon: <Wind className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Compressed Air System',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  An oil-lubricated piston-type air compressor and storage tank inject compressed air into the floaters at the bottom of the tank. A pressure regulator and synchronized valve system control air injection timing.
                </p>
                <ul className="list-disc list-inside text-white/80 mb-2">
                  <li>Compressor: Oil-lubricated piston type, IE3 electric motor</li>
                  <li>Working Pressure: 10 bar (adjustable)</li>
                  <li>Max Air Flow: 1.2–1.5 m³/min</li>
                  <li>Receiver Tank: 300 L steel</li>
                  <li>Power Input: 3.5–5.5 kW</li>
                  <li>Auto start/stop, thermal cutout, pressure relief</li>
                  <li>Consumes ~1% of net KPP output</li>
                </ul>
              </>
            ),
          },
          {
            id: 'valve-snorkel',
            icon: <Settings className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Valve & Snorkel Mechanism',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  At the lowest point, valves inject air into submerged floaters, displacing water. At the top, valves release air so water can refill the floater. This ensures a closed-loop cycle of buoyancy and sinking.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Precision-timed air injection and release</li>
                  <li>Automated, PLC-controlled operation</li>
                  <li>Ensures continuous, efficient cycling</li>
                </ul>
              </>
            ),
          },
          {
            id: 'control-unit',
            icon: <Layers className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'Control Unit',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  A PLC-based control system coordinates the compressor, valves, and generator load. It maintains optimal timing for air injection and system operation, including startup, shutdown, and safety interlocks.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>PLC-based automation</li>
                  <li>Real-time monitoring and control</li>
                  <li>Startup/shutdown sequencing</li>
                  <li>Safety interlocks and remote diagnostics</li>
                </ul>
              </>
            ),
          },
          {
            id: 'integration',
            icon: <CheckCircle2 className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'System Integration & Operation',
            content: (
              <>
                <p className="text-white/90 mb-2">
                  All components are integrated for seamless, round-the-clock operation. The KPP’s modular design allows for scalable deployment, easy maintenance, and rapid installation. Each module can operate independently or in parallel for larger power needs.
                </p>
                <ul className="list-disc list-inside text-white/80">
                  <li>Continuous 24/7 operation</li>
                  <li>Modular, scalable plant size (500 kW blocks)</li>
                  <li>Minimal surface footprint</li>
                  <li>Low O&M costs</li>
                  <li>Remote monitoring and control</li>
                </ul>
              </>
            ),
          },
          {
            id: 'benefits',
            icon: <Zap className="w-7 h-7 text-accent mb-2" aria-hidden="true" />,
            title: 'KPP Benefits',
            content: (
              <>
                <ul className="list-disc list-inside text-white/80 mb-2">
                  <li>Zero emissions, no fuel required</li>
                  <li>24/7 continuous power output</li>
                  <li>Low maintenance and operating costs</li>
                  <li>Scalable and modular for any project size</li>
                  <li>Minimal environmental footprint</li>
                  <li>Proven, TÜV/SGS/DEKRA-validated technology</li>
                  <li>Ideal for grid, distributed, or off-grid applications</li>
                </ul>
                <p className="text-white/80">
                  The KPP is a transformative solution for sustainable, reliable, and cost-effective power generation, positioning Iraq and its partners at the forefront of renewable energy innovation.
                </p>
              </>
            ),
          },
        ].map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className="bg-white/5 rounded-2xl shadow-xl p-8 transition-all duration-500 hover:scale-[1.02] focus-within:scale-[1.02] group relative animate-fade-in-up"
            tabIndex={-1}
            aria-labelledby={`${section.id}-title`}
          >
            <div className="flex items-center mb-3">
              {section.icon}
              <h2 id={`${section.id}-title`} className="text-xl md:text-2xl font-bold text-white ml-2">
                {section.title}
              </h2>
            </div>
            <div className="text-base md:text-lg leading-relaxed">
              {section.content}
            </div>
          </section>
        ))}
      </div>
      {/* Animations and smooth scroll are handled by Tailwind and browser defaults. */}
    </section>
  );
} 