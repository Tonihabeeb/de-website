'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  DollarSign,
  PieChart,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  RevenueBarChart,
  CashFlowLineChart,
  CostPieChart,
} from '@/components/dashboards/FinancialCharts';
import AuthGuard from '@/components/auth/AuthGuard';

interface Revenue {
  id: string;
  month: string;
  year: number;
  revenue: number;
  cost: number;
  profit: number;
  project_id: string;
}

interface CashFlow {
  id: string;
  month: string;
  year: number;
  cashFlow: number;
  project_id: string;
}

interface CostBreakdown {
  id: string;
  category: string;
  value: number;
  percentage: number;
  project_id: string;
}

interface InvestmentMetric {
  id: string;
  project_id: string;
  metric: string;
  value: number;
  unit: string;
  description: string;
  target: number | null;
  status: 'above_target' | 'below_target' | 'neutral';
  updated_at: string;
}

interface Transaction {
  id: string;
  project_id: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
  user: string;
}

export default function FinancialDashboard() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [cashFlow, setCashFlow] = useState<CashFlow[]>([]);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown[]>([]);
  const [investmentMetrics, setInvestmentMetrics] = useState<
    InvestmentMetric[]
  >([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/financial');

      if (!response.ok) {
        setError('Failed to load financial data');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setRevenue(data.revenue || []);
        setCashFlow(data.cashFlow || []);
        setCostBreakdown(data.costBreakdown || []);
        setInvestmentMetrics(data.investmentMetrics || []);
        setTransactions(data.transactions || []);
      } else {
        setError(data.error || 'Failed to load financial data');
      }
    } catch (err) {
      setError('Failed to load financial data');
      console.error('Error fetching financial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'above_target':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case 'below_target':
        return <AlertTriangle className='w-4 h-4 text-red-500' />;
      case 'neutral':
        return <AlertCircle className="w-4 h-4 text-white" />;
      default:
        return <AlertCircle className="w-4 h-4 text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above_target':
        return 'bg-green-100 text-green-800';
      case 'below_target':
        return 'bg-red-100 text-red-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <AuthGuard>
        <main className='max-w-6xl mx-auto px-4 py-8'>
          <div className='animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-1/4 mb-6'></div>
            <div className='space-y-4'>
              {[...Array(5)].map((_, i) => (
                <div key={i} className='bg-white p-4 rounded-lg shadow'>
                  <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6 flex items-center gap-2'>
          <DollarSign className='w-8 h-8 text-green-600' />
          Financial Dashboard
        </h1>
        <p className="mb-8 text-white">
          Real-time financial insights, projections, and investment metrics for
          KPP projects.
        </p>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-md'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <AlertCircle className='h-5 w-5 text-red-400' />
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>Error</h3>
                <div className='mt-2 text-sm text-red-700'>
                  <p>{error}</p>
                </div>
                <div className='mt-4'>
                  <button
                    onClick={fetchFinancialData}
                    className='text-sm font-medium text-red-800 hover:text-red-900 underline'
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Overview Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <BarChart3 className='w-6 h-6 text-blue-600' />
            Financial Overview
          </h2>
          <div className='bg-white rounded-lg shadow p-6'>
            {revenue.length > 0 ? (
              <RevenueBarChart />
            ) : (
              <div className="text-white">
                <em>
                  No revenue data available. Add revenue records through the
                  admin panel.
                </em>
              </div>
            )}
          </div>
        </section>

        {/* Investment Metrics Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <TrendingUp className='w-6 h-6 text-green-600' />
            Investment Metrics
          </h2>
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            {investmentMetrics.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Target
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {investmentMetrics.map(metric => (
                      <tr key={metric.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className="text-sm font-medium text-white">
                            {metric.metric}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {metric.value} {metric.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {metric.target
                            ? `${metric.target} ${metric.unit}`
                            : 'N/A'}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}
                          >
                            {getStatusIcon(metric.status)}
                            <span className='ml-1 capitalize'>
                              {metric.status.replace('_', ' ')}
                            </span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {metric.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-white">
                <em>
                  No investment metrics available. Add metrics through the admin
                  panel.
                </em>
              </div>
            )}
          </div>
        </section>

        {/* Revenue & Cost Charts Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <PieChart className='w-6 h-6 text-orange-600' />
            Cost Breakdown
          </h2>
          <div className='bg-white rounded-lg shadow p-6'>
            {costBreakdown.length > 0 ? (
              <CostPieChart />
            ) : (
              <div className="text-white">
                <em>
                  No cost breakdown data available. Add cost data through the
                  admin panel.
                </em>
              </div>
            )}
          </div>
        </section>

        {/* Cash Flow Visualization Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <BarChart3 className='w-6 h-6 text-blue-600' />
            Cash Flow Visualization
          </h2>
          <div className='bg-white rounded-lg shadow p-6'>
            {cashFlow.length > 0 ? (
              <CashFlowLineChart />
            ) : (
              <div className="text-white">
                <em>
                  No cash flow data available. Add cash flow records through the
                  admin panel.
                </em>
              </div>
            )}
          </div>
        </section>

        {/* Recent Financial Activity Section */}
        <section className='mb-10'>
          <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2'>
            <Activity className='w-6 h-6 text-pink-600' />
            Recent Financial Activity
          </h2>
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            {transactions.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white">
                        User
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {transactions.slice(0, 10).map(transaction => (
                      <tr key={transaction.id}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-white">
                              {transaction.category}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.type === 'revenue'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            transaction.type === 'revenue'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transaction.user}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 text-white">
                <em>
                  No recent financial activity found. Transactions will appear
                  here when logged.
                </em>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
