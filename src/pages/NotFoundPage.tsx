import { LogoMark } from '@/components/brand/LogoMark';
import { GirihPattern } from '@/components/decor/GirihPattern';
import { Rosette } from '@/components/decor/Rosette';
import { ButtonLink, Container } from '@/components/ui';
import { anchors, site } from '@/config/site';

export function NotFoundPage() {
  return (
    <>
      <title>{`Page not found · ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <Container className="py-16 sm:py-24">
        <div className="bg-night text-cream relative flex flex-col items-center gap-5 overflow-hidden rounded-[34px] px-6 py-20 text-center">
          <GirihPattern tone="dark" />
          <Rosette className="-top-40 left-1/2 w-[560px] -translate-x-1/2" />
          <LogoMark size={76} variant="gold" className="relative" />
          <p className="text-gold relative text-sm font-extrabold tracking-[0.2em] uppercase">Error 404</p>
          <h1 className="relative text-[clamp(34px,5vw,56px)] leading-tight font-extrabold tracking-[-0.03em]">
            This page could not be found
          </h1>
          <p className="text-mist relative max-w-[460px]">
            The page you're looking for doesn't exist or has moved. Let's take you back.
          </p>
          <div className="relative flex flex-wrap justify-center gap-2.5">
            <ButtonLink href="/" variant="gold" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href={anchors.book} variant="ghostDark" size="lg">
              Book a free class
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
