import { BarChart3, CalendarCheck, ListChecks, Activity } from 'lucide-react';
import ProgressTracker from '@/components/dashboards/ProgressTracker';
import { RevenueBarChart, CashFlowLineChart } from '@/components/dashboards/FinancialCharts';

export default function ProjectProgressDashboard() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        Project Progress Dashboard
      </h1>
      <p className="mb-8 text-gray-700">
        Real-time overview of project milestones, progress, and key performance indicators for KPP projects.
      </p>

      {/* Milestones Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <CalendarCheck className="w-6 h-6 text-green-600" />
          Project Milestones
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Milestone timeline and completion status will be displayed here.</em>
        </div>
      </section>

      {/* Gantt Chart / Progress Tracker Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <ListChecks className="w-6 h-6 text-orange-600" />
          Progress Tracker
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <ProgressTracker />
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Key Metrics
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Revenue & Cost</h3>
              <RevenueBarChart />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Cash Flow</h3>
              <CashFlowLineChart />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
          <Activity className="w-6 h-6 text-pink-600" />
          Recent Activity
        </h2>
        <div className="bg-gray-50 border rounded p-4 text-gray-600">
          <em>Recent project updates, changes, and activity logs will be shown here.</em>
        </div>
      </section>
    </main>
  );
} 