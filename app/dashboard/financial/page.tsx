import { BarChart3, DollarSign, PieChart, TrendingUp, Activity } from 'lucide-react';
import { RevenueBarChart, CashFlowLineChart, CostPieChart } from '@/components/dashboards/FinancialCharts';

export default function FinancialDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <DollarSign className="w-8 h-8 text-green-600" />
        Financial Dashboard
      </h1>
      <p className="mb-8 text-gray-700">
        Real-time financial insights, projections, and investment metrics for KPP projects.
      </p>

      {/* Financial Overview Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Financial Overview
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <RevenueBarChart />
        </div>
      </section>

      {/* Revenue & Cost Charts Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <PieChart className="w-6 h-6 text-orange-600" />
          Revenue & Cost Charts
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <CostPieChart />
        </div>
      </section>

      {/* Investment Metrics Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Investment Metrics
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>ROI, payback period, and other investment metrics will be visualized here.</em>
        </div>
      </section>

      {/* Cash Flow Visualization Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Cash Flow Visualization
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <CashFlowLineChart />
        </div>
      </section>

      {/* Recent Financial Activity Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Activity className="w-6 h-6 text-pink-600" />
          Recent Financial Activity
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Recent financial transactions, updates, and activity logs will be displayed here.</em>
        </div>
      </section>
    </main>
  );
} 