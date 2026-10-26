import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { env } from '@/config/env';
import { initMetaPixel } from '@/lib/analytics';
import { router } from './router';

export function App() {
  useEffect(() => {
    initMetaPixel(env.metaPixelId);
  }, []);

  return <RouterProvider router={router} />;
}
