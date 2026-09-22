import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLinkProps = {
  className?: string;
  /** Logo height in Tailwind sizing classes. Defaults to the 40px header size. */
  logoClassName?: string;
  titleClassName?: string;
};

/**
 * App logo + name, linking back to the landing page.
 */
export const BrandLink = ({
  className,
  logoClassName = "h-10 w-fit",
  titleClassName = "text-24-bold text-white",
}: BrandLinkProps) => (
  <Link
    href="/"
    aria-label="BenCare home"
    className={cn(
      "flex w-fit cursor-pointer items-center gap-2 transition-opacity hover:opacity-80",
      className
    )}
  >
    <Image
      src="/assets/icons/logo-icon.svg"
      height={1000}
      width={1000}
      alt="BenCare logo"
      className={logoClassName}
    />
    <span className={titleClassName}>BenCare</span>
  </Link>
);
