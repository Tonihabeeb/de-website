'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  day: number;
  energy: number;
}

interface CumulativeData {
  day: number;
  cumulative: number;
}

export default function EnergyGenerationCharts() {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);

  // Sample data based on the charts from the images
  const dailyEnergyData: ChartData[] = Array.from({ length: 181 }, (_, i) => ({
    day: i + 1,
    energy: 11000 + Math.random() * 2000 + Math.sin(i * 0.1) * 500, // Fluctuating between 11000-13000 kWh
  }));

  const cumulativeData: CumulativeData[] = dailyEnergyData.map((data, index) => ({
    day: data.day,
    cumulative: dailyEnergyData.slice(0, index + 1).reduce((sum, item) => sum + item.energy, 0),
  }));

  useEffect(() => {
      const drawLineChart = (
    canvas: HTMLCanvasElement,
    data: ChartData[] | CumulativeData[],
    title: string,
    yAxisLabel: string,
    isCumulative = false
  ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const padding = 60;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set background
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, width, height);

      // Find min/max values
      const values = data.map(d => isCumulative ? (d as CumulativeData).cumulative : (d as ChartData).energy);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      // Draw grid lines
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Horizontal grid lines
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = padding + (width - 2 * padding) * (i / 10);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw axes
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.stroke();

      // X-axis
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // Y-axis labels
      for (let i = 0; i <= gridLines; i++) {
        const value = minValue + (maxValue - minValue) * (i / gridLines);
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.fillText(`${(value / 1000).toFixed(0)}k`, 10, y + 4);
      }

      // X-axis labels
      const xStep = Math.floor(data.length / 10);
      for (let i = 0; i <= 10; i++) {
        const dayIndex = i * xStep;
        if (dayIndex < data.length) {
          const x = padding + (width - 2 * padding) * (i / 10);
          ctx.fillText(data[dayIndex].day.toString(), x - 10, height - padding + 20);
        }
      }

      // Draw data line
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.beginPath();

      data.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / (data.length - 1));
        const value = isCumulative ? (point as CumulativeData).cumulative : (point as ChartData).energy;
        const y = height - padding - (height - 2 * padding) * ((value - minValue) / (maxValue - minValue));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points
      ctx.fillStyle = '#60a5fa';
      data.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / (data.length - 1));
        const value = isCumulative ? (point as CumulativeData).cumulative : (point as ChartData).energy;
        const y = height - padding - (height - 2 * padding) * ((value - minValue) / (maxValue - minValue));
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(title, width / 2, 25);
      ctx.textAlign = 'left';

      // Draw Y-axis label
      ctx.save();
      ctx.translate(20, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yAxisLabel, 0, 0);
      ctx.restore();
    };

    const drawBarChart = (canvas: HTMLCanvasElement, data: ChartData[]) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const padding = 60;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Set background
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(0, 0, width, height);

      // Find min/max values
      const values = data.map(d => d.energy);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      // Draw grid lines
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Horizontal grid lines
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw axes
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.stroke();

      // X-axis
      ctx.beginPath();
      ctx.moveTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // Y-axis labels
      for (let i = 0; i <= gridLines; i++) {
        const value = minValue + (maxValue - minValue) * (i / gridLines);
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.fillText(`${(value / 1000).toFixed(0)}k`, 10, y + 4);
      }

      // Draw bars
      const barWidth = (width - 2 * padding) / data.length * 0.8;
      const barSpacing = (width - 2 * padding) / data.length * 0.2;

      data.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / data.length) + barSpacing / 2;
        const barHeight = (height - 2 * padding) * ((point.energy - minValue) / (maxValue - minValue));
        const y = height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw bar border
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barWidth, barHeight);
      });

      // Draw title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Generated energy per day', width / 2, 25);
      ctx.textAlign = 'left';

      // Draw Y-axis label
      ctx.save();
      ctx.translate(20, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('kWh', 0, 0);
      ctx.restore();
    };

    if (canvasRef1.current) {
      drawLineChart(canvasRef1.current, dailyEnergyData, 'Generated energy per day', 'kWh');
    }
    if (canvasRef2.current) {
      drawLineChart(canvasRef2.current, cumulativeData, 'Generated energy from: 15.11.2020 to: 15.05.2021', 'kWh', true);
    }
    if (canvasRef3.current) {
      drawBarChart(canvasRef3.current, dailyEnergyData);
    }
  }, []);

  return (
    <div className='bg-black border-2 border-green-500 p-6 rounded-lg'>
      {/* Logo */}
      <div className='flex items-center mb-6'>
        <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-4'>
          <div className='w-8 h-8 bg-white rounded-full'></div>
        </div>
        <div className='text-white'>
          <div className='text-sm font-semibold'>Southland</div>
          <div className='text-xs'>HOLDING LTD.</div>
          <div className='text-lg font-bold'>Deep Engineering</div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        {/* Top Left Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className='bg-white rounded-lg p-4'
        >
          <canvas
            ref={canvasRef1}
            width={400}
            height={300}
            className='w-full h-auto'
          />
        </motion.div>

        {/* Top Right Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='bg-white rounded-lg p-4'
        >
          <canvas
            ref={canvasRef2}
            width={400}
            height={300}
            className='w-full h-auto'
          />
        </motion.div>
      </div>

      {/* Bottom Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='bg-white rounded-lg p-4'
      >
        <canvas
          ref={canvasRef3}
          width={800}
          height={300}
          className='w-full h-auto'
        />
      </motion.div>
    </div>
  );
} 