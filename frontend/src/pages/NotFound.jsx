import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { ROUTES } from "../constants/routes";

function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you are looking for does not exist or has moved.</p>
        <Button as={Link} className="mt-6" to={ROUTES.HOME}>
          Go home
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
