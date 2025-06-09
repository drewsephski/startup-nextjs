"use client";

import { CheckCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect Your Accounts",
    description: "Securely link your job platform accounts (Upwork, LinkedIn, etc.) with AutoApply.",
  },
  {
    id: 2,
    title: "Set Your Job Preferences",
    description: "Define your desired roles, keywords, budget, job types, and target platforms.",
  },
  {
    id: 3,
    title: "Smart Auto-Application",
    description: "Our AI-powered engine finds relevant jobs and automatically applies using your tailored profiles.",
  },
  {
    id: 4,
    title: "Track Your Progress",
    description: "Monitor all your applications, view statuses, and manage interviews from a single dashboard.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            How AutoApply Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Getting started is simple. Follow these easy steps to supercharge your job hunt.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 md:gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary text-white">
                {/* Using CheckCircle as a placeholder icon, ideally different icons per step */}
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
