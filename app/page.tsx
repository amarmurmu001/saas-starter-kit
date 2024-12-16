"use client"

import Link from "next/link";
import { PlanCard } from "../components/Plancards";

export default function Home() {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for small projects",
      amount: 999,
      features: ["Up to 5 projects", "Basic analytics", "24/7 support"]
    },
    {
      name: "Pro",
      description: "Best for growing businesses",
      amount: 1999,
      features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domain"]
    },
    {
      name: "Enterprise",
      description: "For large scale operations",
      amount: 4999,
      features: ["Everything in Pro", "Custom solutions", "Dedicated support", "SLA guarantee"]
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">Build Your SaaS Product Faster</h1>
            <p className="py-6 text-xl">
              Launch your SaaS product in minutes, not months. Complete with authentication, 
              payments, and a beautiful UI - everything you need to get started.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/register" className="btn btn-primary">
                Get Started
              </Link>
              <a href="#features" className="btn btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Authentication Ready</h3>
                <p>Complete authentication system with Firebase. Login, register, and password reset - all set up for you.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Payment Integration</h3>
                <p>Accept payments easily with Razorpay integration. Subscription management made simple.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Modern UI</h3>
                <p>Beautiful and responsive UI built with Tailwind CSS and DaisyUI. Customizable to match your brand.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} onSubscribe={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-xl">
            Join thousands of developers who are building their SaaS products with our starter kit.
          </p>
          <Link href="/auth/register" className="btn btn-primary btn-lg">
            Start Building Now
          </Link>
        </div>
      </section>
    </main>
  );
}
