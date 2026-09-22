import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { Reveal } from "@/components/motion/Reveal";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const isAdmin = resolvedSearchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Reveal y={-12}>
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
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

      <Reveal
        as="aside"
        x={24}
        y={0}
        duration={0.7}
        className="side-img max-w-[50%]"
      >
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="size-full object-cover"
        />
      </Reveal>
    </div>
  );
};

export default Home;
