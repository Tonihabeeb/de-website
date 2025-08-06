'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  DollarSign,
  Activity,
  AlertCircle,
  Save,
  Target,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface Revenue {
  id: string;
  month: string;
  year: number;
  revenue: number;
  cost: number;
  profit: number;
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

export default function FinancialManagement() {
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [investmentMetrics, setInvestmentMetrics] = useState<
    InvestmentMetric[]
  >([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showRevenueForm, setShowRevenueForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showMetricForm, setShowMetricForm] = useState(false);
  const [editingRevenue, setEditingRevenue] = useState<Revenue | null>(null);
  const [revenueForm, setRevenueForm] = useState({
    project_id: 'project-001',
    month: '',
    year: new Date().getFullYear(),
    revenue: 0,
    cost: 0,
  });

  const [transactionForm, setTransactionForm] = useState({
    project_id: 'project-001',
    type: 'revenue' as 'revenue' | 'expense',
    amount: 0,
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'General',
    user: 'Admin User',
  });

  const [metricForm, setMetricForm] = useState({
    project_id: 'project-001',
    metric: '',
    value: 0,
    unit: '',
    description: '',
    target: 0,
  });

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
        setInvestmentMetrics(data.investmentMetrics || []);
        setTransactions(data.transactions || []);
      } else {
        setError(data.error || 'Failed to load financial data');
      }
    } catch (err) {
      setError('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  const handleRevenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/financial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'revenue', data: revenueForm }),
      });

      const data = await response.json();

      if (data.success) {
        fetchFinancialData();
        resetRevenueForm();
        setShowRevenueForm(false);
        setEditingRevenue(null);
      } else {
        alert('Failed to save revenue: ' + data.error);
      }
    } catch (err) {
      alert('Failed to save revenue');
    }
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/financial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'transaction', data: transactionForm }),
      });

      const data = await response.json();

      if (data.success) {
        fetchFinancialData();
        resetTransactionForm();
        setShowTransactionForm(false);
      } else {
        alert('Failed to log transaction: ' + data.error);
      }
    } catch (err) {
      alert('Failed to log transaction');
    }
  };

  const handleMetricSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/financial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'investmentMetric', data: metricForm }),
      });

      const data = await response.json();

      if (data.success) {
        fetchFinancialData();
        resetMetricForm();
        setShowMetricForm(false);
      } else {
        alert('Failed to save metric: ' + data.error);
      }
    } catch (err) {
      alert('Failed to save metric');
    }
  };

  const resetRevenueForm = () => {
    setRevenueForm({
      project_id: 'project-001',
      month: '',
      year: new Date().getFullYear(),
      revenue: 0,
      cost: 0,
    });
  };

  const resetTransactionForm = () => {
    setTransactionForm({
      project_id: 'project-001',
      type: 'revenue',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'General',
      user: 'Admin User',
    });
  };

  const resetMetricForm = () => {
    setMetricForm({
      project_id: 'project-001',
      metric: '',
      value: 0,
      unit: '',
      description: '',
      target: 0,
    });
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
      <div className='p-6'>
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
      </div>
    );
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Financial Management
            </h1>
            <p className="text-white">
              Manage financial data, revenue, costs, and investment metrics
            </p>
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setShowRevenueForm(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-b from-blue-700 to-blue-500 text-white hover:from-blue-800 hover:to-blue-600 active:from-blue-900 active:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
            >
              <Plus className='w-4 h-4 mr-2' />
              Add Revenue
            </button>
            <button
              onClick={() => setShowTransactionForm(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-b from-green-700 to-green-500 text-white hover:from-green-800 hover:to-green-600 active:from-green-900 active:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-white"
            >
              <Activity className='w-4 h-4 mr-2' />
              Log Transaction
            </button>
            <button
              onClick={() => setShowMetricForm(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-b from-purple-700 to-purple-500 text-white hover:from-purple-800 hover:to-purple-600 active:from-purple-900 active:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl select-none focus:outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white"
            >
              <Target className='w-4 h-4 mr-2' />
              Add Metric
            </button>
          </div>
        </div>
      </div>

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
            </div>
          </div>
        </div>
      )}

      {/* Revenue Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
          <DollarSign className='w-5 h-5 text-green-600' />
          Revenue & Costs
        </h2>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">
                    Profit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {revenue.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {item.month} {item.year}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium'>
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-red-600'>
                      {formatCurrency(item.cost)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium'>
                      {formatCurrency(item.profit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {((item.profit / item.revenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Investment Metrics Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
          <Target className='w-5 h-5 text-purple-600' />
          Investment Metrics
        </h2>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
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
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
          <Activity className='w-5 h-5 text-orange-600' />
          Recent Transactions
        </h2>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
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
        </div>
      </section>

      {/* Revenue Form Modal */}
      {showRevenueForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className="text-lg font-medium text-white">
                Add Revenue Record
              </h3>
              <form onSubmit={handleRevenueSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Month
                    </label>
                    <select
                      value={revenueForm.month}
                      onChange={e =>
                        setRevenueForm({
                          ...revenueForm,
                          month: e.target.value,
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      required
                    >
                      <option value=''>Select Month</option>
                      <option value='Jan'>January</option>
                      <option value='Feb'>February</option>
                      <option value='Mar'>March</option>
                      <option value='Apr'>April</option>
                      <option value='May'>May</option>
                      <option value='Jun'>June</option>
                      <option value='Jul'>July</option>
                      <option value='Aug'>August</option>
                      <option value='Sep'>September</option>
                      <option value='Oct'>October</option>
                      <option value='Nov'>November</option>
                      <option value='Dec'>December</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Year
                    </label>
                    <input
                      type='number'
                      value={revenueForm.year}
                      onChange={e =>
                        setRevenueForm({
                          ...revenueForm,
                          year: parseInt(e.target.value),
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Revenue (USD)
                  </label>
                  <input
                    type='number'
                    value={revenueForm.revenue}
                    onChange={e =>
                      setRevenueForm({
                        ...revenueForm,
                        revenue: parseFloat(e.target.value),
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Cost (USD)
                  </label>
                  <input
                    type='number'
                    value={revenueForm.cost}
                    onChange={e =>
                      setRevenueForm({
                        ...revenueForm,
                        cost: parseFloat(e.target.value),
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowRevenueForm(false);
                      resetRevenueForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
                  >
                    <Save className='w-4 h-4 mr-2' />
                    Save Revenue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className="text-lg font-medium text-white">
                Log Transaction
              </h3>
              <form onSubmit={handleTransactionSubmit} className='space-y-4'>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Transaction Type
                  </label>
                  <select
                    value={transactionForm.type}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        type: e.target.value as 'revenue' | 'expense',
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value='revenue'>Revenue</option>
                    <option value='expense'>Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Amount (USD)
                  </label>
                  <input
                    type='number'
                    value={transactionForm.amount}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Description
                  </label>
                  <input
                    type='text'
                    value={transactionForm.description}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        description: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Category
                  </label>
                  <input
                    type='text'
                    value={transactionForm.category}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        category: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Date
                  </label>
                  <input
                    type='date'
                    value={transactionForm.date}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        date: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    User
                  </label>
                  <input
                    type='text'
                    value={transactionForm.user}
                    onChange={e =>
                      setTransactionForm({
                        ...transactionForm,
                        user: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowTransactionForm(false);
                      resetTransactionForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                  >
                    <Save className='w-4 h-4 mr-2' />
                    Log Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Metric Form Modal */}
      {showMetricForm && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <h3 className="text-lg font-medium text-white">
                Add Investment Metric
              </h3>
              <form onSubmit={handleMetricSubmit} className='space-y-4'>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Metric Name
                  </label>
                  <input
                    type='text'
                    value={metricForm.metric}
                    onChange={e =>
                      setMetricForm({ ...metricForm, metric: e.target.value })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='e.g., ROI, NPV, IRR'
                    required
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Value
                    </label>
                    <input
                      type='number'
                      step='0.01'
                      value={metricForm.value}
                      onChange={e =>
                        setMetricForm({
                          ...metricForm,
                          value: parseFloat(e.target.value),
                        })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Unit
                    </label>
                    <input
                      type='text'
                      value={metricForm.unit}
                      onChange={e =>
                        setMetricForm({ ...metricForm, unit: e.target.value })
                      }
                      className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='e.g., %, USD, years'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Description
                  </label>
                  <input
                    type='text'
                    value={metricForm.description}
                    onChange={e =>
                      setMetricForm({
                        ...metricForm,
                        description: e.target.value,
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Target Value (Optional)
                  </label>
                  <input
                    type='number'
                    step='0.01'
                    value={metricForm.target}
                    onChange={e =>
                      setMetricForm({
                        ...metricForm,
                        target: parseFloat(e.target.value),
                      })
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowMetricForm(false);
                      resetMetricForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                  >
                    <Save className='w-4 h-4 mr-2' />
                    Add Metric
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
