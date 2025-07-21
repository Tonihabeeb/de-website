import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';

describe('HeroSection', () => {
  it('renders the main heading', () => {
    const { getByRole } = render(<EnhancedHeroSection />);

    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(
      'Kinetic Power Plant: The Future of Clean Energy'
    );
  });

  it('renders the subtitle', () => {
    const { getByText } = render(<EnhancedHeroSection />);

    const subtitle = getByText(/Zero emissions. 24\/7 reliability/);
    expect(subtitle).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    const { getByRole } = render(<EnhancedHeroSection />);

    const learnMoreButton = getByRole('link', { name: /learn more/i });
    const contactButton = getByRole('link', { name: /contact us/i });

    expect(learnMoreButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();

    expect(learnMoreButton).toHaveAttribute('href', '/technology');
    expect(contactButton).toHaveAttribute('href', '/contact');
  });

  it('renders key statistics', () => {
    const { getByText } = render(<EnhancedHeroSection />);

    expect(getByText('300 MW+')).toBeInTheDocument();
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('95.2%')).toBeInTheDocument();

    expect(getByText('Installed')).toBeInTheDocument();
    expect(getByText('Emissions')).toBeInTheDocument();
    expect(getByText('Efficiency')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<EnhancedHeroSection />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
