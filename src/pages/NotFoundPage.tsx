import { LogoMark } from '@/components/brand/LogoMark';
import { Glow } from '@/components/decor/Glow';
import { ButtonLink, Container } from '@/components/ui';
import { anchors, site } from '@/config/site';

export function NotFoundPage() {
  return (
    <>
      <title>{`Page not found · ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <Container className="py-16 sm:py-24">
        <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#dff3ea] via-[#f3f9f4] to-[#fff0d6] px-6 py-24 text-center">
          <Glow color="mint" className="-top-40 -left-20 size-[480px]" />
          <Glow color="saffron" className="-right-20 -bottom-40 size-[480px]" />
          <LogoMark size={72} className="relative" />
          <p className="font-display text-brand relative text-[96px] leading-none font-bold tracking-[-0.05em]">
            404
          </p>
          <h1 className="relative text-[clamp(32px,4.4vw,52px)] leading-tight">
            This page has <em className="text-brand">wandered off</em>
          </h1>
          <p className="text-muted relative max-w-[460px]">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <div className="relative flex flex-wrap justify-center gap-2.5">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href={anchors.book} variant="outline" size="lg">
              Book a free class
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
