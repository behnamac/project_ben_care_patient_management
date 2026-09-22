import { redirect } from "next/navigation";

import { BrandLink } from "@/components/BrandLink";
import RegisterForm from "@/components/forms/RegisterForm";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params }: SearchParamProps) => {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Reveal className="mb-12 w-fit" y={-12}>
            <BrandLink />
          </Reveal>

          {user && <RegisterForm user={user} />}

          <Reveal delay={0.35}>
            <p className="copyright py-12">© 2025 BenCare</p>
          </Reveal>
        </div>
      </section>

      <RevealImage
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
        x={24}
        y={0}
        duration={0.7}
      />
    </div>
  );
};

export default Register;
