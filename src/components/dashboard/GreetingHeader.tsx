"use client";

interface GreetingHeaderProps {
  name: string;
}

export const GreetingHeader = ({ name }: GreetingHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
        Welcome back, {name}!
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
        Here's an overview of your automated job search.
      </p>
    </div>
  );
};
