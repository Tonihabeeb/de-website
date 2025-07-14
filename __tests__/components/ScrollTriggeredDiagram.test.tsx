import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScrollTriggeredDiagram from '@/components/animations/ScrollTriggeredDiagram'

const mockSteps = [
  {
    step: '1',
    title: 'Step One',
    description: 'This is the first step',
    icon: '🚀'
  },
  {
    step: '2',
    title: 'Step Two',
    description: 'This is the second step',
    icon: '⚡'
  },
  {
    step: '3',
    title: 'Step Three',
    description: 'This is the third step',
    icon: '💡'
  }
]

describe('ScrollTriggeredDiagram', () => {
  it('renders all steps', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
    expect(screen.getByText('Step Three')).toBeInTheDocument()
  })

  it('renders step numbers', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders step descriptions', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    expect(screen.getByText('This is the first step')).toBeInTheDocument()
    expect(screen.getByText('This is the second step')).toBeInTheDocument()
    expect(screen.getByText('This is the third step')).toBeInTheDocument()
  })

  it('renders step icons', () => {
    render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    expect(screen.getByText('🚀')).toBeInTheDocument()
    expect(screen.getByText('⚡')).toBeInTheDocument()
    expect(screen.getByText('💡')).toBeInTheDocument()
  })

  it('has proper grid layout classes', () => {
    const { container } = render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    const grid = container.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4')
  })

  it('renders background grid pattern', () => {
    const { container } = render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    const background = container.querySelector('.absolute.inset-0.opacity-5')
    expect(background).toBeInTheDocument()
  })

  it('renders floating particles', () => {
    const { container } = render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    const particles = container.querySelectorAll('.absolute.w-1.h-1.bg-primary-light')
    expect(particles.length).toBeGreaterThan(0)
  })

  it('renders connection line on large screens', () => {
    const { container } = render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    const connectionLine = container.querySelector('.hidden.lg\\:block')
    expect(connectionLine).toBeInTheDocument()
  })

  it('applies proper styling to step cards', () => {
    const { container } = render(<ScrollTriggeredDiagram steps={mockSteps} />)
    
    const cards = container.querySelectorAll('.bg-white\\/80.backdrop-blur-sm.rounded-xl')
    expect(cards.length).toBe(mockSteps.length)
  })
}) 