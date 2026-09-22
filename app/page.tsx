import Link from "next/link";

import { BrandLink } from "@/components/BrandLink";
import { PatientForm } from "@/components/forms/PatientForm";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Reveal className="mb-12 w-fit" y={-12}>
            <BrandLink />
          </Reveal>

          <PatientForm />

          <Reveal
            delay={0.35}
            className="text-14-regular mt-20 flex justify-between"
          >
            <div className="flex flex-col">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2025 BenCare
              </p>
              <Link href="/privacy" className="text-sm text-blue-500">
                Privacy Policy
              </Link>
            </div>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </Reveal>
        </div>
      </section>

      <RevealImage
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
        x={24}
        y={0}
        duration={0.7}
      />
    </div>
  );
};

export default Home;
