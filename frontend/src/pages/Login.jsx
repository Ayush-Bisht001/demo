import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import Input from "../components/ui/Input";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (values) => {
    setError("");

    try {
      login({
        token: "demo-token",
        user: { email: values.email },
      });
      toast.success("Logged in successfully");
      navigate(location.state?.from?.pathname || ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Login</h1>
        <p className="mt-2 text-sm text-slate-600">Access your dashboard and protected workspace.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage message={error} />}
          <Input
            error={errors.email?.message}
            id="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          <Input
            error={errors.password?.message}
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          <Button className="w-full" isLoading={isSubmitting} type="submit">
            Login
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          New here?{" "}
          <Link className="font-semibold text-slate-950 hover:underline" to={ROUTES.REGISTER}>
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
