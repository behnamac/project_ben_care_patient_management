
import { BrandLink } from "@/components/BrandLink";
import { Reveal } from "@/components/motion/Reveal";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <Reveal as="header" className="admin-header" y={-16}>
        <BrandLink
          logoClassName="h-8 w-fit"
          titleClassName="text-18-bold text-white"
        />

        <p className="text-16-semibold">Admin Dashboard</p>
      </Reveal>

      <main className="admin-main">
        <Reveal as="section" className="w-full space-y-4" delay={0.1}>
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </Reveal>

        <Reveal as="section" className="admin-stat" stagger={0.08} delay={0.2}>
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount || 0}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount || 0}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount || 0}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </Reveal>

        <Reveal delay={0.35} className="w-full">
          <DataTable columns={columns} data={appointments?.documents || []} />
        </Reveal>
      </main>
    </div>
  );
};

export default AdminPage;
