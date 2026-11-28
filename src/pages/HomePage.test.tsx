import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { HomePage } from './HomePage';

function renderHome() {
  const router = createMemoryRouter([
    { element: <SiteLayout />, children: [{ index: true, element: <HomePage /> }] },
  ]);
  return render(<RouterProvider router={router} />);
}

describe('HomePage', () => {
  it('renders the main headline and every key section', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /quran lessons your child will look forward/i,
    );
    for (const id of ['how', 'courses', 'hifz', 'classroom', 'teachers', 'pricing', 'reviews', 'faq']) {
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it('never shows placeholder text in the reviews section', () => {
    renderHome();
    expect(document.getElementById('reviews')?.textContent).not.toMatch(/\[[^\]]*\]/);
  });

  it('personalises the trial summary from the finder', async () => {
    renderHome();
    const user = userEvent.setup();
    await user.click(
      within(screen.getByRole('group', { name: 'Course' })).getByRole('button', { name: 'Tajweed' }),
    );
    await user.click(
      within(screen.getByRole('group', { name: 'Learner' })).getByRole('button', { name: 'Myself' }),
    );
    expect(screen.getByText('Free 30-min Tajweed trial for you')).toBeInTheDocument();
  });

  it('shows prices in the currency of the country picked from the menu', async () => {
    renderHome();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { expanded: false, name: /Choose your country|United|Pakistan/ }),
    );
    await user.type(
      screen.getByRole('combobox', { name: 'Search countries or currencies' }),
      'United Kingdom',
    );
    await user.click(screen.getByRole('option', { name: /United Kingdom/ }));
    expect(screen.getAllByText(/^£\d/).length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText(/billed as \$49\.99 USD/)).toBeInTheDocument();
  });

  it('switches programme tabs', async () => {
    renderHome();
    const user = userEvent.setup();
    const tabs = screen.getByRole('tablist', { name: 'Programmes' });
    await user.click(within(tabs).getByRole('tab', { name: 'Tajweed' }));
    expect(within(tabs).getByRole('tab', { name: 'Tajweed' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('The Tajweed plan, step by step');
  });
});
