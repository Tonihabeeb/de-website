'use client';

import { useState } from 'react';

interface CalculationResult {
  kppCost: number;
  dieselCost: number;
  solarCost: number;
  gasCost: number;
  kppSavings: number;
  paybackPeriod: number;
  annualSavings: number;
}

export default function EnergyCostCalculator() {
  const [energyNeeds, setEnergyNeeds] = useState(1000); // MWh per year
  const [operatingHours, setOperatingHours] = useState(8760); // hours per year
  const [currentFuelCost, setCurrentFuelCost] = useState(0.15); // €/kWh
  const [results, setResults] = useState<CalculationResult | null>(null);

  const calculateCosts = () => {
    // KPP Technology costs
    const kppLCOE = 25; // €/MWh
    const kppCost = (energyNeeds * kppLCOE) / 1000; // Convert to thousands

    // Diesel Generator costs
    const dieselLCOE = 180; // €/MWh
    const dieselCost = (energyNeeds * dieselLCOE) / 1000;

    // Solar PV costs
    const solarLCOE = 45; // €/MWh
    const solarCost = (energyNeeds * solarLCOE) / 1000;

    // Natural Gas costs
    const gasLCOE = 80; // €/MWh
    const gasCost = (energyNeeds * gasLCOE) / 1000;

    // Calculate savings vs diesel (most common comparison)
    const kppSavings = dieselCost - kppCost;
    const annualSavings = kppSavings * 1000; // Convert back to full amount

    // Calculate payback period (assuming €1.2M capital cost for 1MW)
    const capitalCost = energyNeeds * 1.2; // €1.2M per MW
    const paybackPeriod = capitalCost / annualSavings;

    setResults({
      kppCost,
      dieselCost,
      solarCost,
      gasCost,
      kppSavings,
      paybackPeriod,
      annualSavings,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 1000); // Convert back to full amount
  };

  const formatPercentage = (value: number) => {
    return `${((value / results!.dieselCost) * 100).toFixed(1)}%`;
  };

  return (
    <div className='bg-white rounded-lg shadow-lg p-8'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-primary mb-4'>
          Energy Cost Calculator
        </h2>
        <p className='text-gray-600'>
          Compare the costs of KPP technology with traditional energy sources
          and see your potential savings.
        </p>
      </div>

      {/* Input Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Annual Energy Needs (MWh)
          </label>
          <input
            type='number'
            value={energyNeeds}
            onChange={e => setEnergyNeeds(Number(e.target.value))}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px]'
            placeholder='1000'
            min='1'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Operating Hours per Year
          </label>
          <input
            type='number'
            value={operatingHours}
            onChange={e => setOperatingHours(Number(e.target.value))}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px]'
            placeholder='8760'
            min='1'
            max='8760'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Current Fuel Cost (€/kWh)
          </label>
          <input
            type='number'
            step='0.01'
            value={currentFuelCost}
            onChange={e => setCurrentFuelCost(Number(e.target.value))}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mobile-input touch-target min-h-[44px]'
            placeholder='0.15'
            min='0'
          />
        </div>
      </div>

      <div className='text-center mb-8'>
        <button
          onClick={calculateCosts}
          className='bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 mobile-button touch-target w-full md:w-auto min-h-[44px]'
        >
          Calculate Costs
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className='space-y-6'>
          {/* Cost Comparison */}
          <div className='bg-gray-50 rounded-lg p-4 md:p-6'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Annual Energy Costs
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-white p-4 rounded-lg border border-green-200'>
                <div className='text-2xl font-bold text-green-600 mb-2'>
                  {formatCurrency(results.kppCost)}
                </div>
                <div className='text-sm text-gray-600'>KPP Technology</div>
                <div className='text-xs text-green-600 font-medium'>
                  {formatPercentage(results.kppCost)} of diesel cost
                </div>
              </div>

              <div className='bg-white p-4 rounded-lg border border-red-200'>
                <div className='text-2xl font-bold text-red-600 mb-2'>
                  {formatCurrency(results.dieselCost)}
                </div>
                <div className='text-sm text-gray-600'>Diesel Generators</div>
                <div className='text-xs text-red-600 font-medium'>Baseline</div>
              </div>

              <div className='bg-white p-4 rounded-lg border border-yellow-200'>
                <div className='text-2xl font-bold text-yellow-600 mb-2'>
                  {formatCurrency(results.solarCost)}
                </div>
                <div className='text-sm text-gray-600'>Solar PV</div>
                <div className='text-xs text-yellow-600 font-medium'>
                  {formatPercentage(results.solarCost)} of diesel cost
                </div>
              </div>

              <div className='bg-white p-4 rounded-lg border border-orange-200'>
                <div className='text-2xl font-bold text-orange-600 mb-2'>
                  {formatCurrency(results.gasCost)}
                </div>
                <div className='text-sm text-gray-600'>Natural Gas</div>
                <div className='text-xs text-orange-600 font-medium'>
                  {formatPercentage(results.gasCost)} of diesel cost
                </div>
              </div>
            </div>
          </div>

          {/* Savings Analysis */}
          <div className='bg-gray-50 rounded-lg p-4 md:p-6'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Savings Analysis
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-green-600 mb-2'>
                  {formatCurrency(results.kppSavings)}
                </div>
                <div className='text-sm text-gray-600'>
                  Annual Savings vs Diesel
                </div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>
                  {results.paybackPeriod.toFixed(1)} years
                </div>
                <div className='text-sm text-gray-600'>Payback Period</div>
              </div>

              <div className='text-center'>
                <div className='text-3xl font-bold text-purple-600 mb-2'>
                  {((results.kppSavings / results.dieselCost) * 100).toFixed(1)}
                  %
                </div>
                <div className='text-sm text-gray-600'>Cost Reduction</div>
              </div>
            </div>
          </div>

          {/* Visual Comparison */}
          <div className='bg-gray-50 rounded-lg p-6'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cost Comparison
            </h3>
            <div className='space-y-4'>
              {[
                {
                  name: 'KPP Technology',
                  cost: results.kppCost,
                  color: 'bg-green-500',
                },
                {
                  name: 'Solar PV',
                  cost: results.solarCost,
                  color: 'bg-yellow-500',
                },
                {
                  name: 'Natural Gas',
                  cost: results.gasCost,
                  color: 'bg-orange-500',
                },
                {
                  name: 'Diesel Generators',
                  cost: results.dieselCost,
                  color: 'bg-red-500',
                },
              ].map((tech, index) => {
                const percentage = (tech.cost / results.dieselCost) * 100;
                return (
                  <div key={index} className='flex items-center gap-4'>
                    <span className='w-32 text-sm font-medium text-gray-700'>
                      {tech.name}
                    </span>
                    <div className='flex-1 bg-gray-200 rounded-full h-4'>
                      <div
                        className={`h-4 rounded-full ${tech.color} transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className='w-24 text-sm font-semibold text-gray-800'>
                      {formatCurrency(tech.cost)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className='text-center bg-primary text-white rounded-lg p-6'>
            <h3 className='text-xl font-semibold mb-2'>
              Ready to Save on Energy Costs?
            </h3>
            <p className='mb-4'>
              Based on your calculations, you could save{' '}
              {formatCurrency(results.kppSavings)} annually by switching to KPP
              technology.
            </p>
            <button className='bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
              Contact Us for Detailed Quote
            </button>
          </div>
        </div>
      )}

      {/* Assumptions */}
      <div className='mt-8 p-4 bg-blue-50 rounded-lg'>
        <h4 className='font-semibold text-blue-800 mb-2'>
          Calculation Assumptions
        </h4>
        <ul className='text-sm text-blue-700 space-y-1'>
          <li>• KPP LCOE: €25/MWh (includes all operational costs)</li>
          <li>• Diesel LCOE: €180/MWh (includes fuel and maintenance)</li>
          <li>• Solar PV LCOE: €45/MWh (includes intermittency costs)</li>
          <li>
            • Natural Gas LCOE: €80/MWh (includes fuel and infrastructure)
          </li>
          <li>• Capital cost: €1.2M per MW for KPP technology</li>
          <li>• Operating hours: 24/7 availability for KPP</li>
        </ul>
      </div>
    </div>
  );
}
