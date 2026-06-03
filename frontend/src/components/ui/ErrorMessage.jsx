import { AlertCircle } from "lucide-react";

function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
