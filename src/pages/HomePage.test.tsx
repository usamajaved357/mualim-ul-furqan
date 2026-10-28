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
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/learn the quran online/i);
    for (const id of ['how', 'courses', 'classroom', 'teachers', 'pricing', 'reviews', 'faq', 'book']) {
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

  it('switches courses to adults', async () => {
    renderHome();
    const user = userEvent.setup();
    await user.click(
      within(screen.getByRole('group', { name: 'Show courses for' })).getByRole('button', { name: 'Adults' }),
    );
    expect(screen.getByRole('heading', { name: 'Tajweed for adults' })).toBeInTheDocument();
  });
});
