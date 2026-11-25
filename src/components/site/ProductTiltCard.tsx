import { type StudioProduct } from "@/data/products";
import { TiltedCard, TiltedCardLayer } from "@/components/site/TiltedCard";

interface ProductTiltCardProps {
  product: StudioProduct;
  variant?: "flagship" | "grid";
}

export function ProductTiltCard({ product, variant = "flagship" }: ProductTiltCardProps) {
  const isFlagship = variant === "flagship";

  return (
    <div className={isFlagship ? "h-[380px] w-full md:h-[460px]" : "h-[340px] w-full md:h-[400px]"}>
      <TiltedCard
        containerWidth="100%"
        containerHeight="100%"
        imageWidth="100%"
        imageHeight="100%"
        rotateAmplitude={isFlagship ? 15 : 14}
        scaleOnHover={1.03}
        perspective={1000}
        radius={0}
        smoothness={0.62}
        glare={0.42}
        shadow={0.45}
        parallax={1}
        showTooltip={false}
        intro={false}
        displayOverlayContent={true}
        overlayDepth={36}
        faceClassName="bg-primary text-primary-foreground"
        overlayContent={
          <div className="flex h-full w-full flex-col justify-between p-8 text-primary-foreground md:p-10">
            <div className="flex items-start justify-between gap-6 drop-shadow-[0_4px_14px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3 label-mono text-primary-foreground/75">
                <span className="tabular-nums">{product.index}</span>
                {product.logo && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.category}</span>
                  </>
                )}
              </div>

              {!product.logo && (
                <span className="label-mono text-primary-foreground/70">{product.category}</span>
              )}
            </div>

            <div className="pt-12 drop-shadow-[0_8px_22px_rgba(0,0,0,0.7)]">
              <p
                className={`font-bold tracking-[-0.03em] ${
                  isFlagship ? "text-3xl md:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl"
                }`}
              >
                {product.name.toUpperCase()}
              </p>
              <p className="mt-3 label-mono text-primary-foreground/80">{product.platform}</p>
            </div>
          </div>
        }
      >
        {product.logo && (
          <>
            <TiltedCardLayer
              depth={-14}
              className="pointer-events-none flex items-center justify-end pr-4 select-none md:pr-8"
            >
              <img
                src={product.logo.src}
                alt=""
                draggable={false}
                className={`studio-ease object-contain grayscale contrast-125 transition-transform duration-500 ${
                  product.logo.blendScreen
                    ? "scale-[1.15] mix-blend-screen group-hover:scale-[1.19]"
                    : "group-hover:scale-[1.03]"
                } ${
                  isFlagship
                    ? "h-[78%] w-[78%] max-w-[360px] md:h-[84%] md:w-[84%] md:max-w-[400px]"
                    : "h-[76%] w-[76%] max-w-[290px] md:h-[82%] md:w-[82%] md:max-w-[330px]"
                }`}
              />
            </TiltedCardLayer>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/25 to-transparent"
            />
          </>
        )}
      </TiltedCard>
    </div>
  );
}
