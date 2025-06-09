"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react"; // For star ratings

const testimonials = [
  {
    id: 1,
    name: "Alex P.",
    role: "Freelance Developer",
    testimonial: "AutoApply saved me hours of manual searching and applying! I can now focus on what I do best - coding.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah M.",
    role: "Marketing Consultant",
    testimonial: "The ability to set detailed preferences and let AutoApply handle the rest is a game-changer. I'm getting more relevant leads than ever.",
    rating: 5,
  },
  {
    id: 3,
    name: "John B.",
    role: "Content Writer",
    testimonial: "I was skeptical at first, but AutoApply consistently finds great gigs that match my skills. Highly recommended!",
    rating: 4,
  },
];

// Placeholder stats
const stats = [
    { id: 1, value: "500+", label: "Applications Sent Weekly" },
    { id: 2, value: "80%", label: "More Interview Invitations" },
    { id: 3, value: "10h+", label: "Hours Saved Per Week" },
]

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Loved by Freelancers & Job Seekers
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col bg-slate-50 dark:bg-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">{testimonial.name}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder Stats Section */}
        <div className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.id} className="rounded-lg bg-slate-100 dark:bg-slate-700/50 p-6 shadow">
                        <div className="text-4xl font-bold text-primary">{stat.value}</div>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
