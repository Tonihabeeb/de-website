import { CalendarCheck, CheckCircle, Clock } from 'lucide-react';

interface Milestone {
  name: string;
  start: string; // ISO date
  end: string; // ISO date
  status: 'completed' | 'in-progress' | 'upcoming';
}

const sampleMilestones: Milestone[] = [
  {
    name: 'Site Assessment',
    start: '2024-01-01',
    end: '2024-01-15',
    status: 'completed',
  },
  {
    name: 'Permitting',
    start: '2024-01-16',
    end: '2024-02-10',
    status: 'completed',
  },
  {
    name: 'Engineering Design',
    start: '2024-02-11',
    end: '2024-03-05',
    status: 'in-progress',
  },
  {
    name: 'Procurement',
    start: '2024-03-06',
    end: '2024-04-01',
    status: 'upcoming',
  },
  {
    name: 'Construction',
    start: '2024-04-02',
    end: '2024-06-30',
    status: 'upcoming',
  },
  {
    name: 'Commissioning',
    start: '2024-07-01',
    end: '2024-07-15',
    status: 'upcoming',
  },
];

function getStatusColor(status: Milestone['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-yellow-500';
    case 'upcoming':
      return 'bg-gray-300';
  }
}

export default function ProgressTracker({
  milestones = sampleMilestones,
}: {
  milestones?: Milestone[];
}) {
  // Calculate Gantt bar positions (simple linear for placeholder)
  const minDate = new Date(
    Math.min(...milestones.map(m => new Date(m.start).getTime()))
  );
  const maxDate = new Date(
    Math.max(...milestones.map(m => new Date(m.end).getTime()))
  );
  const totalDays =
    (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);

  return (
    <div className='w-full overflow-x-auto'>
      <div className='min-w-[600px]'>
        <div className='flex flex-col gap-4'>
          {milestones.map((m, i) => {
            const startOffset =
              ((new Date(m.start).getTime() - minDate.getTime()) /
                (1000 * 60 * 60 * 24) /
                totalDays) *
              100;
            const duration =
              ((new Date(m.end).getTime() - new Date(m.start).getTime()) /
                (1000 * 60 * 60 * 24) /
                totalDays) *
              100;
            return (
              <div key={i} className='flex items-center gap-4'>
                <div className='w-48 flex items-center gap-2'>
                  {m.status === 'completed' && (
                    <CheckCircle className='w-5 h-5 text-green-500' />
                  )}
                  {m.status === 'in-progress' && (
                    <Clock className='w-5 h-5 text-yellow-500' />
                  )}
                  {m.status === 'upcoming' && (
                    <CalendarCheck className="w-5 h-5 text-white" />
                  )}
                  <span className="font-medium text-white">{m.name}</span>
                </div>
                <div className='relative flex-1 h-6'>
                  <div className='absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded -translate-y-1/2' />
                  <div
                    className={`absolute top-1/2 h-2 rounded ${getStatusColor(m.status)}`}
                    style={{
                      left: `${startOffset}%`,
                      width: `${duration}%`,
                      transform: 'translateY(-50%)',
                    }}
                  />
                </div>
                <div className="w-32 text-sm text-white">
                  {m.start} → {m.end}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
