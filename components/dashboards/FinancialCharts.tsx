'use client';

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#2563eb', '#22c55e', '#f59e42', '#e11d48', '#a21caf'];

// Default sample data for fallback
const defaultRevenueData = [
  { month: 'Jan', revenue: 120000, cost: 80000 },
  { month: 'Feb', revenue: 135000, cost: 90000 },
  { month: 'Mar', revenue: 150000, cost: 95000 },
  { month: 'Apr', revenue: 160000, cost: 100000 },
  { month: 'May', revenue: 170000, cost: 110000 },
  { month: 'Jun', revenue: 180000, cost: 120000 },
];

const defaultCashFlowData = [
  { month: 'Jan', cashFlow: 40000 },
  { month: 'Feb', cashFlow: 45000 },
  { month: 'Mar', cashFlow: 55000 },
  { month: 'Apr', cashFlow: 60000 },
  { month: 'May', cashFlow: 60000 },
  { month: 'Jun', cashFlow: 60000 },
];

const defaultCostBreakdown = [
  { name: 'O&M', value: 40000 },
  { name: 'Labor', value: 25000 },
  { name: 'Materials', value: 20000 },
  { name: 'Insurance', value: 10000 },
  { name: 'Other', value: 5000 },
];

interface RevenueData {
  month: string;
  revenue: number;
  cost: number;
}

interface CashFlowData {
  month: string;
  cashFlow: number;
}

interface CostBreakdownData {
  name: string;
  value: number;
}

interface RevenueBarChartProps {
  data?: RevenueData[];
}

interface CashFlowLineChartProps {
  data?: CashFlowData[];
}

interface CostPieChartProps {
  data?: CostBreakdownData[];
}

export function RevenueBarChart({ data = defaultRevenueData }: RevenueBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
        <Bar dataKey="cost" fill="#f59e42" name="Cost" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CashFlowLineChart({ data = defaultCashFlowData }: CashFlowLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cashFlow" stroke="#22c55e" strokeWidth={3} name="Cash Flow" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CostPieChart({ data = defaultCostBreakdown }: CostPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
} 