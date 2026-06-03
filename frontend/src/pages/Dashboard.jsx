import { Activity, Users, Wallet } from "lucide-react";
import Loader from "../components/ui/Loader";
import { useAuth } from "../hooks/useAuth";

const metrics = [
  { label: "Active users", value: "1,284", icon: Users },
  { label: "Revenue", value: "$42.8k", icon: Wallet },
  { label: "Uptime", value: "99.98%", icon: Activity },
];

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-950">Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
          <p className="text-slate-600">Protected content and app metrics live here.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <metric.icon className="h-6 w-6 text-brand-600" />
              <p className="mt-4 text-sm text-slate-500">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">{metric.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Recent activity</h2>
          <Loader label="Preparing activity feed" />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
