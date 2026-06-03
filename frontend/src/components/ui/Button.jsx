import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-950",
  secondary:
    "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-400",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

const Button = forwardRef(
  (
    {
      as: Component = "button",
      children,
      className,
      disabled,
      isLoading = false,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      type={Component === "button" ? type : undefined}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </Component>
  ),
);

Button.displayName = "Button";

export default Button;
