import Image from "next/image"
import { Droplets, MapPin, Phone, Mail, Sparkles, Clock, Shield } from "lucide-react"
import QuoteForm from "@/components/quote-form"
import ServiceCard from "@/components/service-card"
import TrustItem from "@/components/trust-item"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Getsemaní Logo" width={50} height={50} className="h-10 w-auto" priority />
            <span className="text-xl font-bold text-sky-700">Getsemaní</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-sky-700">
              Services
            </a>
            <a href="#quote" className="text-sm font-medium hover:text-sky-700">
              Request Quote
            </a>
            <a href="#why-us" className="text-sm font-medium hover:text-sky-700">
              Why Choose Us
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="#quote"
              className="inline-flex h-9 items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-700"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-sky-50 to-white">
          <div className="container flex flex-col items-center justify-center space-y-4 py-20 text-center md:py-32">
            <h1 className="text-3xl font-bold tracking-tighter text-sky-800 sm:text-5xl md:text-6xl">
              Getsemaní – Clean Spaces, Happy Customers
            </h1>
            <p className="max-w-[700px] text-gray-600 md:text-xl">
              Professional commercial restroom hygiene services that keep your business spotless and your customers
              coming back.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-8 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                Request a Quote
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container space-y-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-sky-800 sm:text-4xl">Our Services</h2>
              <p className="max-w-[700px] text-gray-600">
                We provide comprehensive commercial restroom hygiene services to keep your facilities clean, fresh, and
                well-maintained.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <ServiceCard
                icon={<Droplets className="h-10 w-10 text-sky-600" />}
                title="Commercial Restroom Cleaning"
                description="Thorough cleaning and sanitization of all restroom surfaces, fixtures, and floors to maintain the highest standards of hygiene."
              />
              <ServiceCard
                icon={<Sparkles className="h-10 w-10 text-sky-600" />}
                title="Paper Towel & Soap Dispenser Refills"
                description="Regular restocking of all essential supplies including paper towels, toilet paper, hand soap, and sanitizer."
              />
              <ServiceCard
                icon={<Clock className="h-10 w-10 text-sky-600" />}
                title="Scheduled Hygiene Maintenance"
                description="Customized maintenance schedules for offices, clinics, gyms, and retail stores to ensure consistent cleanliness."
              />
            </div>
          </div>
        </section>

        {/* Quote Request Section */}
        <section id="quote" className="py-16 bg-sky-50">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-lg sm:p-6 md:p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-sky-800 sm:text-3xl">Request a Quote</h2>
                <p className="mt-2 text-gray-600">
                  Fill out the form below and we'll get back to you with a customized quote for your business.
                </p>
              </div>
              <QuoteForm />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 bg-sky-50">
          <div className="container space-y-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-sky-800 sm:text-4xl">Why Choose Getsemaní</h2>
              <p className="max-w-[700px] text-gray-600">
                We're committed to providing exceptional service that keeps your business looking its best.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <TrustItem
                icon={<Clock className="h-10 w-10 text-sky-600" />}
                title="Reliable Scheduling"
                description="We arrive on time, every time, with a consistent schedule you can depend on."
              />
              <TrustItem
                icon={<Sparkles className="h-10 w-10 text-sky-600" />}
                title="Spotless Results"
                description="Our attention to detail ensures your facilities are always impeccably clean."
              />
              <TrustItem
                icon={<Shield className="h-10 w-10 text-sky-600" />}
                title="Trusted by Businesses"
                description="Join the many local businesses who rely on our professional services."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Getsemaní Logo" width={40} height={40} className="h-8 w-auto" priority />
                <span className="text-lg font-bold text-sky-700">Getsemaní</span>
              </div>
              <p className="text-sm text-gray-600">
                Professional commercial restroom hygiene services for businesses of all sizes.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-sky-600" />
                  <a href="tel:+17042365045" className="text-sm text-gray-600 hover:text-sky-700">(704) 236-5045</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-sky-600" />
                  <a href="mailto:gpolicarpo@getsemani.pro" className="text-sm text-gray-600 hover:text-sky-700">gpolicarpo@getsemani.pro</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-600" />
                  <span className="text-sm text-gray-600">Serving local businesses across Charlotte, NC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Getsemaní. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

