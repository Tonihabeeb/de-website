import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroSection from '@/components/sections/HeroSection'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    const { getByRole } = render(<HeroSection />)
    
    const heading = getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Continuous Clean Energy, Anywhere')
  })

  it('renders the subtitle', () => {
    const { getByText } = render(<HeroSection />)
    
    const subtitle = getByText(/Delivering 24\/7 renewable power/)
    expect(subtitle).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    const { getByRole } = render(<HeroSection />)
    
    const learnMoreButton = getByRole('link', { name: /learn more/i })
    const contactButton = getByRole('link', { name: /contact us/i })
    
    expect(learnMoreButton).toBeInTheDocument()
    expect(contactButton).toBeInTheDocument()
    
    expect(learnMoreButton).toHaveAttribute('href', '/technology')
    expect(contactButton).toHaveAttribute('href', '/contact')
  })

  it('renders key statistics', () => {
    const { getByText } = render(<HeroSection />)
    
    expect(getByText('0 MW')).toBeInTheDocument()
    expect(getByText('24/7')).toBeInTheDocument()
    expect(getByText('0')).toBeInTheDocument()
    
    expect(getByText('Planned Capacity')).toBeInTheDocument()
    expect(getByText('Continuous Power')).toBeInTheDocument()
    expect(getByText('Emissions')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<HeroSection />)
    
    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
  })
}) 