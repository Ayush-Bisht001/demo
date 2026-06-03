import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/ui/Button";
import { ROUTES } from "../constants/routes";

const features = [
  { icon: ShieldCheck, title: "Protected Routing", body: "Authentication-aware route boundaries are ready to extend." },
  { icon: Zap, title: "Service Layer", body: "Axios, interceptors, and API modules keep requests organized." },
  { icon: Sparkles, title: "Reusable UI", body: "Composable controls keep pages clean and consistent." },
];

function Home() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="React 19 starter"
          title="A clean frontend foundation for production work"
          description="Routing, auth structure, API services, reusable components, and polished defaults are already in place."
        />

        <div className="mt-8 flex justify-center">
          <Button as={Link} to={ROUTES.DASHBOARD} size="lg">
            Open dashboard
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <feature.icon className="h-8 w-8 text-brand-600" />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
