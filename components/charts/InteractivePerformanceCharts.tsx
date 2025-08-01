'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface ChartData {
  day: number;
  value: number;
}

// Separate component for Efficiency Chart
function EfficiencyChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; day: number } | null>(null);

  const efficiencyData: ChartData[] = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 96 + Math.sin(i * 0.4) * 1.2 + Math.cos(i * 0.7) * 0.8 + Math.sin(i * 0.2) * 0.6, // Deterministic variations around 96%
    })), 
    [] // Empty dependency array - data is generated once and stays fixed
  );

  useEffect(() => {
    const drawChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = rect.width;
      const height = rect.height;
      const padding = 40;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Use fixed range for Y-axis to prevent shaking
      const minValue = 93; // Fixed minimum
      const maxValue = 99; // Fixed maximum

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Horizontal grid lines
      const gridLines = 4;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        const x = padding + (width - 2 * padding) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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

      // Y-axis labels (fixed values) - ascending from bottom to top with better readability
      const yAxisValues = [93, 94, 95, 96, 97, 98, 99];
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      yAxisValues.forEach((value, i) => {
        const y = height - padding - (height - 2 * padding) * (i / (yAxisValues.length - 1));
        ctx.fillText(`${value}`, 12, y + 4);
      });

      // X-axis labels with better readability
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      for (let i = 0; i <= 5; i++) {
        const dayIndex = Math.floor((efficiencyData.length - 1) * (i / 5));
        const x = padding + (width - 2 * padding) * (i / 5);
        ctx.fillText(efficiencyData[dayIndex]?.day.toString() || '', x - 12, height - padding + 18);
      }

      // Target line removed for cleaner interface

      // Draw average efficiency line (96%) - dashed style
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      const averageY = height - padding - (height - 2 * padding) * ((96 - minValue) / (maxValue - minValue));
      ctx.moveTo(padding, averageY);
      ctx.lineTo(width - padding, averageY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw data line (real-time efficiency variations)
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 3;
      ctx.beginPath();

      efficiencyData.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / (efficiencyData.length - 1));
        const y = height - padding - (height - 2 * padding) * ((point.value - minValue) / (maxValue - minValue));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points with hover effect
      efficiencyData.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / (efficiencyData.length - 1));
        const y = height - padding - (height - 2 * padding) * ((point.value - minValue) / (maxValue - minValue));
        
        // Check if mouse is hovering over this point
        const mouseX = hoveredPoint?.x || 0;
        const mouseY = hoveredPoint?.y || 0;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        
        if (distance < 10) {
          // Draw hover effect
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw tooltip with better styling and positioning
          ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
          ctx.fillRect(x + 10, y - 35, 90, 30);
          ctx.fillStyle = 'white';
          ctx.font = 'bold 11px Arial';
          ctx.fillText(`Day ${point.day}: ${point.value.toFixed(1)}%`, x + 15, y - 18);
        } else {
          // Draw normal point
          ctx.fillStyle = '#60a5fa';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Removed titles for cleaner interface

      // Draw line labels with better positioning and readability
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('Average: 96%', width - 90, averageY - 8);

      // Draw Y-axis label on the right side in red, centered with average line
      ctx.save();
      ctx.translate(width - 8, averageY);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px Arial';
      ctx.fillText('Efficiency %', 0, 0);
      ctx.restore();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const padding = 40;
      const width = rect.width;
      const height = rect.height;

      // Check if mouse is within chart bounds
      if (x < padding || x > width - padding || y < padding || y > height - padding) {
        setHoveredPoint(null);
        return;
      }

      // Use fixed range for calculations
      const minValue = 93;
      const maxValue = 99;

      let closestPoint = null;
      let minDistance = Infinity;

      efficiencyData.forEach((point, index) => {
        const pointX = padding + (width - 2 * padding) * (index / (efficiencyData.length - 1));
        const pointY = height - padding - (height - 2 * padding) * ((point.value - minValue) / (maxValue - minValue));
        
        const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = { x: pointX, y: pointY, value: point.value, day: point.day };
        }
      });

      setHoveredPoint(closestPoint);
    };

    drawChart();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [hoveredPoint]);

  return (
    <div className='bg-gray-light rounded-lg p-6 text-center shadow-lg'>
      <div className='w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center relative overflow-hidden shadow-xl'>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='text-white text-center z-10'>
            <svg
              className='w-8 h-8 mx-auto mb-3 opacity-80'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <p className='text-lg font-bold mb-1'>Efficiency Trends</p>
            <p className='text-sm opacity-80'>Stability in Output</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full cursor-pointer'
        />
      </div>
    </div>
  );
}

// Separate component for Power Output Chart
function PowerOutputChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; value: number; day: number } | null>(null);

  const powerData: ChartData[] = useMemo(() => {
    // Generate cumulative energy data similar to the attached chart
    // Starting from 0 and building up to ~2,200,000 kWh over 180 days
    const data = [];
    let cumulative = 0;
    
    for (let i = 0; i < 180; i++) {
      // Daily generation varies between 10,000-15,000 kWh with some randomness
      const dailyGeneration = 12000 + Math.sin(i * 0.1) * 2000 + (Math.random() - 0.5) * 1000;
      cumulative += dailyGeneration;
      data.push({
        day: i + 1,
        value: cumulative
      });
    }
    
    return data;
  }, []); // Empty dependency array - data is generated once and stays fixed

  useEffect(() => {
    const drawChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const width = rect.width;
      const height = rect.height;
      const padding = 40;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Use fixed range for cumulative energy data (0 to 2,500,000 kWh)
      const minValue = 0;
      const maxValue = 2500000;

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      // Horizontal grid lines
      const gridLines = 4;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding + (height - 2 * padding) * (i / gridLines);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i <= 5; i++) {
        const x = padding + (width - 2 * padding) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
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

      // Y-axis labels for cumulative energy (in millions) with better readability
      const yAxisValues = [0, 500000, 1000000, 1500000, 2000000, 2500000];
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      yAxisValues.forEach((value, i) => {
        const y = height - padding - (height - 2 * padding) * (i / (yAxisValues.length - 1));
        ctx.fillText(`${(value / 1000000).toFixed(1)}M`, 8, y + 4);
      });

      // X-axis labels for 180 days with better readability
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      const xAxisValues = [0, 45, 90, 135, 180];
      xAxisValues.forEach((day, i) => {
        const x = padding + (width - 2 * padding) * (i / (xAxisValues.length - 1));
        ctx.fillText(day.toString(), x - 12, height - padding + 18);
      });

      // Draw data line
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();

      powerData.forEach((point, index) => {
        const x = padding + (width - 2 * padding) * (index / (powerData.length - 1));
        const y = height - padding - (height - 2 * padding) * ((point.value - minValue) / (maxValue - minValue));
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Calculate and draw average line
      const totalEnergy = powerData[powerData.length - 1].value; // Total cumulative energy
      const averageDailyOutput = totalEnergy / 180; // Average daily output
      const averageHourlyOutput = averageDailyOutput / 24; // Average hourly output
      
      // Position the line at the cumulative value that represents the average daily rate
      // For a cumulative chart, we need to show where the average daily rate would be at day 90 (middle)
      const averageCumulativeValue = averageDailyOutput * 90; // Average daily rate * 90 days
      const averageY = height - padding - (height - 2 * padding) * ((averageCumulativeValue - minValue) / (maxValue - minValue));
      
      // Draw average line (red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, averageY);
      ctx.lineTo(width - padding, averageY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw average label
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Avg: ${averageDailyOutput.toFixed(0)} kWh/day`, width - 120, averageY - 8);

      // Draw hover effect only (no permanent data points)
      if (hoveredPoint) {
        const x = hoveredPoint.x;
        const y = hoveredPoint.y;
        
        // Draw hover indicator
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw tooltip above the chart
        const tooltipText = `Day ${hoveredPoint.day}: ${(hoveredPoint.value / 1000000).toFixed(1)}M kWh`;
        ctx.font = 'bold 12px Arial';
        const textWidth = ctx.measureText(tooltipText).width;
        
        // Position tooltip below the chart area to avoid overlapping with title
        const tooltipX = Math.max(padding, Math.min(width - padding - textWidth, x - textWidth / 2));
        const tooltipY = height - 35; // Fixed position at bottom of chart
        
        // Draw tooltip background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(tooltipX - 8, tooltipY - 8, textWidth + 16, 20);
        
        // Draw tooltip border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tooltipX - 8, tooltipY - 8, textWidth + 16, 20);
        
        // Draw tooltip text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillText(tooltipText, tooltipX, tooltipY + 5);
      }

      // Removed titles for cleaner interface

      // Draw Y-axis label with white color, smaller font, and moved left
      ctx.save();
      ctx.translate(8, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 9px Arial';
      ctx.fillText('kWh', 0, 0);
      ctx.restore();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const padding = 40;
      const width = rect.width;
      const height = rect.height;

      // Check if mouse is within chart bounds
      if (x < padding || x > width - padding || y < padding || y > height - padding) {
        setHoveredPoint(null);
        return;
      }

      // Use fixed range for calculations
      const minValue = 0;
      const maxValue = 2500000;

      let closestPoint = null;
      let minDistance = Infinity;

      powerData.forEach((point, index) => {
        const pointX = padding + (width - 2 * padding) * (index / (powerData.length - 1));
        const pointY = height - padding - (height - 2 * padding) * ((point.value - minValue) / (maxValue - minValue));
        
        const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = { x: pointX, y: pointY, value: point.value, day: point.day };
        }
      });

      setHoveredPoint(closestPoint);
    };

    drawChart();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [hoveredPoint]);

  return (
    <div className='bg-gray-light rounded-lg p-6 text-center shadow-lg'>
      <div className='w-full h-64 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center relative overflow-hidden shadow-xl'>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='text-white text-center z-10'>
            <svg
              className='w-8 h-8 mx-auto mb-3 opacity-80'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
              />
            </svg>
            <p className='text-lg font-bold mb-1'>Power Output</p>
            <p className='text-sm opacity-80'>kWh Over Time</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className='absolute inset-0 w-full h-full cursor-pointer'
        />
      </div>
    </div>
  );
}

// Main component that renders both charts separately
export default function InteractivePerformanceCharts() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <EfficiencyChart />
      <PowerOutputChart />
    </div>
  );
} 