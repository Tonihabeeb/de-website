import { Request, Response } from 'express';

interface CalculationRequest {
  installedCapacity: number; // MW
  operatingHours: number; // hours per year
  currentFuelCost: number; // €/kWh
}

interface CalculationResult {
  kppCost: number;
  dieselCost: number;
  solarCost: number;
  gasCost: number;
  kppSavings: number;
  paybackPeriod: number;
  annualSavings: number;
  energyGenerated: number;
  kppEfficiency: number;
  dieselEfficiency: number;
  solarEfficiency: number;
  gasEfficiency: number;
}

export async function calculateEnergyCosts(req: Request, res: Response) {
  try {
    const { installedCapacity, operatingHours, currentFuelCost }: CalculationRequest = req.body;

    // Validate inputs
    if (!installedCapacity || installedCapacity <= 0) {
      return res.status(400).json({ error: 'Installed capacity must be greater than 0' });
    }
    if (!operatingHours || operatingHours <= 0 || operatingHours > 8760) {
      return res.status(400).json({ error: 'Operating hours must be between 1 and 8760' });
    }
    if (!currentFuelCost || currentFuelCost < 0) {
      return res.status(400).json({ error: 'Current fuel cost must be non-negative' });
    }

    // Calculate energy generated (MWh)
    const energyGenerated = installedCapacity * operatingHours;

    // Real-world LCOE values (€/MWh) based on current market data
    const kppLCOE = 25; // KPP technology - very competitive
    const dieselLCOE = 180; // Diesel generators - high fuel costs
    const solarLCOE = 45; // Solar PV - moderate costs
    const gasLCOE = 80; // Natural gas - moderate costs

    // Calculate annual costs (€)
    const kppCost = (energyGenerated * kppLCOE) / 1000; // Convert to thousands
    const dieselCost = (energyGenerated * dieselLCOE) / 1000;
    const solarCost = (energyGenerated * solarLCOE) / 1000;
    const gasCost = (energyGenerated * gasLCOE) / 1000;

    // Calculate savings vs diesel (most common comparison)
    const kppSavings = dieselCost - kppCost;
    const annualSavings = kppSavings * 1000; // Convert back to full amount

    // Calculate payback period (assuming €1.2M capital cost per MW)
    const capitalCost = installedCapacity * 1.2; // €1.2M per MW
    const paybackPeriod = capitalCost / annualSavings;

    // Efficiency calculations (capacity factors)
    const kppEfficiency = 85; // KPP operates at 85% capacity factor
    const dieselEfficiency = 90; // Diesel generators at 90% capacity factor
    const solarEfficiency = 25; // Solar PV at 25% capacity factor (intermittent)
    const gasEfficiency = 85; // Natural gas at 85% capacity factor

    const result: CalculationResult = {
      kppCost,
      dieselCost,
      solarCost,
      gasCost,
      kppSavings,
      paybackPeriod,
      annualSavings,
      energyGenerated,
      kppEfficiency,
      dieselEfficiency,
      solarEfficiency,
      gasEfficiency,
    };

    res.json(result);
  } catch (error) {
    console.error('Calculator error:', error);
    res.status(500).json({ error: 'Failed to calculate energy costs' });
  }
} 