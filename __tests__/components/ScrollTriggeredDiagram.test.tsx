import { render, screen } from '@testing-library/react';
import ScrollTriggeredDiagram from '@/components/animations/ScrollTriggeredDiagram';
import { Zap } from 'lucide-react';

const mockSteps = [
  {
    step: '1',
    title: 'Step One',
    description: 'First step description',
    icon: <Zap className='w-8 h-8' />,
  },
  {
    step: '2',
    title: 'Step Two',
    description: 'Second step description',
    icon: <Zap className='w-8 h-8' />,
  },
];

describe('ScrollTriggeredDiagram', () => {
  it('renders all steps', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />);

    expect(screen.getByText('Step One')).toBeInTheDocument();
    expect(screen.getByText('Step Two')).toBeInTheDocument();
    expect(screen.getByText('First step description')).toBeInTheDocument();
    expect(screen.getByText('Second step description')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />);

    // Check that icons are rendered (they will be SVG elements)
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });
});
