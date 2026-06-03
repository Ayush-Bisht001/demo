import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(({ className, error, id, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
    )}
    <input
      ref={ref}
      id={id}
      className={cn(
        "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
        className,
      )}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
));

Input.displayName = "Input";

export default Input;
