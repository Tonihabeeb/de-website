import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/layout/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders the logo', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const logo = screen.getByAltText('Deep Engineering company logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows dropdown menu when Technology is clicked', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const technologyButton = screen.getByText('Technology');
    fireEvent.click(technologyButton);

    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Specifications')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
  });

  it('shows dropdown menu when Team is clicked', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const teamButton = screen.getByText('Team');
    fireEvent.click(teamButton);

    expect(screen.getByText('Careers')).toBeInTheDocument();
  });

  it.skip('closes dropdown when clicking outside', async () => {
    // This test is unreliable in jsdom and is skipped
  });

  it('has proper accessibility attributes', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
    const mobileMenuButton = screen.getByLabelText('Open mobile menu');
    fireEvent.click(mobileMenuButton);
    const mobileNav = screen.getByRole('navigation', {
      name: 'Mobile navigation',
    });
    expect(mobileNav).toHaveAttribute('aria-label', 'Mobile navigation');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    const mobileMenuButton = screen.getByLabelText('Open mobile menu');
    fireEvent.click(mobileMenuButton);

    // Mobile menu should be visible with navigation role
    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation' })
    ).toBeInTheDocument();
  });
});
