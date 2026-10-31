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
    for (const id of [
      'how',
      'courses',
      'hifz',
      'classroom',
      'teachers',
      'pricing',
      'reviews',
      'faq',
      'book',
    ]) {
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

  it('switches pricing currency', async () => {
    renderHome();
    const user = userEvent.setup();
    await user.click(
      within(screen.getByRole('group', { name: 'Currency' })).getByRole('button', { name: 'GBP' }),
    );
    expect(screen.getByText('£39')).toBeInTheDocument();
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
