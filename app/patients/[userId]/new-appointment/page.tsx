import { BrandLink } from "@/components/BrandLink";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Reveal } from "@/components/motion/Reveal";
import { RevealImage } from "@/components/motion/RevealImage";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params }: SearchParamProps) => {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between py-6">
          <Reveal className="mb-6 w-fit" y={-12}>
            <BrandLink />
          </Reveal>

          {patient?.id && (
            <AppointmentForm
              patientId={patient.id}
              userId={userId}
              type="create"
            />
          )}

          <Reveal delay={0.35}>
            <p className="copyright mt-4 pt-6">© 2025 BenCare</p>
          </Reveal>
        </div>
      </section>

      <RevealImage
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        x={24}
        y={0}
        duration={0.7}
      />
    </div>
  );
};

export default Appointment;
