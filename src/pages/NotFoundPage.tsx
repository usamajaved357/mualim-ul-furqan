import { LogoMark } from '@/components/brand/LogoMark';
import { ButtonLink, Container } from '@/components/ui';

export function NotFoundPage() {
  return (
    <>
      <title>Page not found · Mulaim-ul-Furqan</title>
      <meta name="robots" content="noindex" />
      <Container className="flex flex-col items-center gap-5 py-28 text-center">
        <LogoMark size={72} />
        <h1 className="text-4xl font-extrabold tracking-[-0.03em]">Page not found</h1>
        <p className="text-muted">The page you're looking for doesn't exist or has moved.</p>
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
      </Container>
    </>
  );
}
