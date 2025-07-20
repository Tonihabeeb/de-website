import { NextRequest, NextResponse } from 'next/server';

// Sample financial data for development
const sampleFinancialData = {
  revenue: [
    { id: 'rev-001', month: 'Jan', year: 2024, revenue: 120000, cost: 80000, profit: 40000, project_id: 'project-001' },
    { id: 'rev-002', month: 'Feb', year: 2024, revenue: 135000, cost: 90000, profit: 45000, project_id: 'project-001' },
    { id: 'rev-003', month: 'Mar', year: 2024, revenue: 150000, cost: 95000, profit: 55000, project_id: 'project-001' },
    { id: 'rev-004', month: 'Apr', year: 2024, revenue: 160000, cost: 100000, profit: 60000, project_id: 'project-001' },
    { id: 'rev-005', month: 'May', year: 2024, revenue: 170000, cost: 110000, profit: 60000, project_id: 'project-001' },
    { id: 'rev-006', month: 'Jun', year: 2024, revenue: 180000, cost: 120000, profit: 60000, project_id: 'project-001' }
  ],
  cashFlow: [
    { id: 'cf-001', month: 'Jan', year: 2024, cashFlow: 40000, project_id: 'project-001' },
    { id: 'cf-002', month: 'Feb', year: 2024, cashFlow: 45000, project_id: 'project-001' },
    { id: 'cf-003', month: 'Mar', year: 2024, cashFlow: 55000, project_id: 'project-001' },
    { id: 'cf-004', month: 'Apr', year: 2024, cashFlow: 60000, project_id: 'project-001' },
    { id: 'cf-005', month: 'May', year: 2024, cashFlow: 60000, project_id: 'project-001' },
    { id: 'cf-006', month: 'Jun', year: 2024, cashFlow: 60000, project_id: 'project-001' }
  ],
  costBreakdown: [
    { id: 'cost-001', category: 'O&M', value: 40000, percentage: 40, project_id: 'project-001' },
    { id: 'cost-002', category: 'Labor', value: 25000, percentage: 25, project_id: 'project-001' },
    { id: 'cost-003', category: 'Materials', value: 20000, percentage: 20, project_id: 'project-001' },
    { id: 'cost-004', category: 'Insurance', value: 10000, percentage: 10, project_id: 'project-001' },
    { id: 'cost-005', category: 'Other', value: 5000, percentage: 5, project_id: 'project-001' }
  ],
  investmentMetrics: [
    {
      id: 'inv-001',
      project_id: 'project-001',
      metric: 'ROI',
      value: 25.5,
      unit: '%',
      description: 'Return on Investment',
      target: 20,
      status: 'above_target',
      updated_at: '2024-07-20T00:00:00.000Z'
    },
    {
      id: 'inv-002',
      project_id: 'project-001',
      metric: 'Payback Period',
      value: 3.2,
      unit: 'years',
      description: 'Time to recover initial investment',
      target: 4,
      status: 'above_target',
      updated_at: '2024-07-20T00:00:00.000Z'
    },
    {
      id: 'inv-003',
      project_id: 'project-001',
      metric: 'NPV',
      value: 2500000,
      unit: 'USD',
      description: 'Net Present Value',
      target: 2000000,
      status: 'above_target',
      updated_at: '2024-07-20T00:00:00.000Z'
    },
    {
      id: 'inv-004',
      project_id: 'project-001',
      metric: 'IRR',
      value: 18.5,
      unit: '%',
      description: 'Internal Rate of Return',
      target: 15,
      status: 'above_target',
      updated_at: '2024-07-20T00:00:00.000Z'
    }
  ],
  transactions: [
    {
      id: 'txn-001',
      project_id: 'project-001',
      type: 'revenue',
      amount: 120000,
      description: 'Monthly revenue for January 2024',
      date: '2024-01-31',
      category: 'Energy Sales',
      user: 'John Smith'
    },
    {
      id: 'txn-002',
      project_id: 'project-001',
      type: 'expense',
      amount: 80000,
      description: 'Monthly operational costs for January 2024',
      date: '2024-01-31',
      category: 'Operations',
      user: 'Sarah Johnson'
    },
    {
      id: 'txn-003',
      project_id: 'project-001',
      type: 'revenue',
      amount: 135000,
      description: 'Monthly revenue for February 2024',
      date: '2024-02-29',
      category: 'Energy Sales',
      user: 'John Smith'
    },
    {
      id: 'txn-004',
      project_id: 'project-001',
      type: 'expense',
      amount: 90000,
      description: 'Monthly operational costs for February 2024',
      date: '2024-02-29',
      category: 'Operations',
      user: 'Sarah Johnson'
    }
  ]
};

// GET /api/admin/financial - Get all financial data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const project_id = searchParams.get('project_id');
    const type = searchParams.get('type'); // revenue, cashFlow, costBreakdown, investmentMetrics, transactions
    const year = searchParams.get('year');

    let response: any = { success: true };

    if (type === 'revenue') {
      let revenue = sampleFinancialData.revenue;
      if (project_id) {
        revenue = revenue.filter(r => r.project_id === project_id);
      }
      if (year) {
        revenue = revenue.filter(r => r.year === parseInt(year));
      }
      response.revenue = revenue;
      response.total = revenue.length;
    } else if (type === 'cashFlow') {
      let cashFlow = sampleFinancialData.cashFlow;
      if (project_id) {
        cashFlow = cashFlow.filter(cf => cf.project_id === project_id);
      }
      if (year) {
        cashFlow = cashFlow.filter(cf => cf.year === parseInt(year));
      }
      response.cashFlow = cashFlow;
      response.total = cashFlow.length;
    } else if (type === 'costBreakdown') {
      let costBreakdown = sampleFinancialData.costBreakdown;
      if (project_id) {
        costBreakdown = costBreakdown.filter(cb => cb.project_id === project_id);
      }
      response.costBreakdown = costBreakdown;
      response.total = costBreakdown.length;
    } else if (type === 'investmentMetrics') {
      let investmentMetrics = sampleFinancialData.investmentMetrics;
      if (project_id) {
        investmentMetrics = investmentMetrics.filter(im => im.project_id === project_id);
      }
      response.investmentMetrics = investmentMetrics;
      response.total = investmentMetrics.length;
    } else if (type === 'transactions') {
      let transactions = sampleFinancialData.transactions;
      if (project_id) {
        transactions = transactions.filter(t => t.project_id === project_id);
      }
      response.transactions = transactions;
      response.total = transactions.length;
    } else {
      // Return all data
      response = {
        success: true,
        revenue: sampleFinancialData.revenue,
        cashFlow: sampleFinancialData.cashFlow,
        costBreakdown: sampleFinancialData.costBreakdown,
        investmentMetrics: sampleFinancialData.investmentMetrics,
        transactions: sampleFinancialData.transactions,
        total: {
          revenue: sampleFinancialData.revenue.length,
          cashFlow: sampleFinancialData.cashFlow.length,
          costBreakdown: sampleFinancialData.costBreakdown.length,
          investmentMetrics: sampleFinancialData.investmentMetrics.length,
          transactions: sampleFinancialData.transactions.length
        }
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching financial data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch financial data' },
      { status: 500 }
    );
  }
}

// POST /api/admin/financial - Create new financial record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'revenue') {
      const { month, year, revenue, cost, project_id } = data;
      
      if (!month || !year || !revenue || !cost || !project_id) {
        return NextResponse.json(
          { success: false, error: 'Month, year, revenue, cost, and project_id are required' },
          { status: 400 }
        );
      }

      const newRevenue = {
        id: `rev-${Date.now()}`,
        month,
        year: parseInt(year),
        revenue: parseFloat(revenue),
        cost: parseFloat(cost),
        profit: parseFloat(revenue) - parseFloat(cost),
        project_id
      };

      // In a real implementation, this would be saved to the database
      sampleFinancialData.revenue.push(newRevenue);

      return NextResponse.json({
        success: true,
        revenue: newRevenue,
        message: 'Revenue record created successfully',
      }, { status: 201 });
    }

    if (type === 'transaction') {
      const { project_id, type: transactionType, amount, description, date, category, user } = data;
      
      if (!project_id || !transactionType || !amount || !description || !date || !user) {
        return NextResponse.json(
          { success: false, error: 'Project ID, type, amount, description, date, and user are required' },
          { status: 400 }
        );
      }

      const newTransaction = {
        id: `txn-${Date.now()}`,
        project_id,
        type: transactionType,
        amount: parseFloat(amount),
        description,
        date,
        category: category || 'General',
        user
      };

      // In a real implementation, this would be saved to the database
      sampleFinancialData.transactions.push(newTransaction);

      return NextResponse.json({
        success: true,
        transaction: newTransaction,
        message: 'Transaction logged successfully',
      }, { status: 201 });
    }

    if (type === 'investmentMetric') {
      const { project_id, metric, value, unit, description, target } = data;
      
      if (!project_id || !metric || !value || !unit || !description) {
        return NextResponse.json(
          { success: false, error: 'Project ID, metric, value, unit, and description are required' },
          { status: 400 }
        );
      }

      const status = target ? (parseFloat(value) >= parseFloat(target) ? 'above_target' : 'below_target') : 'neutral';

      const newMetric = {
        id: `inv-${Date.now()}`,
        project_id,
        metric,
        value: parseFloat(value),
        unit,
        description,
        target: target ? parseFloat(target) : null,
        status,
        updated_at: new Date().toISOString()
      };

      // In a real implementation, this would be saved to the database
      sampleFinancialData.investmentMetrics.push(newMetric);

      return NextResponse.json({
        success: true,
        investmentMetric: newMetric,
        message: 'Investment metric created successfully',
      }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type. Use "revenue", "transaction", or "investmentMetric"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error creating financial record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create financial record' },
      { status: 500 }
    );
  }
} 