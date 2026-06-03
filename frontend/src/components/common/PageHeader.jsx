import { motion } from "framer-motion";

function PageHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35 }}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
      )}
    </motion.div>
  );
}

export default PageHeader;
