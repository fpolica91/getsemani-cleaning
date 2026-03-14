"use client"

import type React from "react"

import { useState } from "react"
import { format, addDays } from "date-fns"
import { CalendarDays, Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const TIME_SLOTS = ["Morning (8–11 AM)", "Midday (11 AM–1 PM)", "Afternoon (1–4 PM)", "Late Afternoon (4–6 PM)"]

export default function QuoteForm() {
  const [formState, setFormState] = useState({
    name: "",
    businessName: "",
    serviceAddress: "",
    services: {
      restroom: false,
      supplies: false,
      maintenance: false,
    },
    preferredDate: "",
    preferredTime: "",
    phone: "",
    email: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [dateOpen, setDateOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [serviceError, setServiceError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (service: keyof typeof formState.services) => {
    setServiceError("")
    setFormState((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }))
  }

  const handleDateSelect = (day: Date | undefined) => {
    setSelectedDate(day)
    setFormState((prev) => ({
      ...prev,
      preferredDate: day ? format(day, "MMM d, yyyy") : "",
    }))
    setDateOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const hasService = Object.values(formState.services).some(Boolean)
    if (!hasService) {
      setServiceError("Please select at least one service")
      return
    }

    setIsSubmitting(true)
    setError("")
    setServiceError("")

    const webhookData = {
      ...formState,
      services: Object.entries(formState.services)
        .filter(([_, selected]) => selected)
        .map(([service]) => service)
        .join(", "),
    }

    try {
      const response = await fetch("https://formspree.io/f/mnjgbnjl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setSubmitted(true)
      setError("")

      setTimeout(() => {
        setSubmitted(false)
        setSelectedDate(undefined)
        setFormState({
          name: "",
          businessName: "",
          serviceAddress: "",
          services: { restroom: false, supplies: false, maintenance: false },
          preferredDate: "",
          preferredTime: "",
          phone: "",
          email: "",
        })
      }, 5000)
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-green-700">Thank You!</h3>
        <p className="text-green-600">We&apos;ve received your quote request and will get back to you shortly.</p>
      </div>
    )
  }

  const tomorrow = addDays(new Date(), 1)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            value={formState.businessName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serviceAddress">Service Address</Label>
        <Textarea
          id="serviceAddress"
          name="serviceAddress"
          value={formState.serviceAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Services Needed</Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="restroom"
              checked={formState.services.restroom}
              onCheckedChange={() => handleCheckboxChange("restroom")}
            />
            <Label htmlFor="restroom" className="font-normal">
              Commercial Restroom Cleaning
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="supplies"
              checked={formState.services.supplies}
              onCheckedChange={() => handleCheckboxChange("supplies")}
            />
            <Label htmlFor="supplies" className="font-normal">
              Paper Towel & Soap Refills
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="maintenance"
              checked={formState.services.maintenance}
              onCheckedChange={() => handleCheckboxChange("maintenance")}
            />
            <Label htmlFor="maintenance" className="font-normal">
              Scheduled Maintenance
            </Label>
          </div>
        </div>
        {serviceError && <p className="text-sm text-red-600">{serviceError}</p>}
      </div>

      {/* Date & Time */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label>Preferred Date</Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
              >
                <CalendarDays className="size-4 text-gray-400" />
                {formState.preferredDate ? (
                  <span className="text-black">{formState.preferredDate}</span>
                ) : (
                  <span className="text-gray-500">Pick a date</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={{ before: tomorrow }}
                defaultMonth={tomorrow}
              />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="preferredDate" value={formState.preferredDate} required />
        </div>

        {/* Time Slot Picker */}
        <div className="space-y-2">
          <Label>Preferred Time</Label>
          <div className="grid grid-cols-1 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setFormState((prev) => ({ ...prev, preferredTime: slot }))}
                className={`flex h-11 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
                  formState.preferredTime === slot
                    ? "border-sky-600 bg-sky-50 text-sky-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-sky-300 hover:bg-sky-50/50"
                }`}
              >
                <Clock className="size-4 flex-shrink-0" />
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
        </div>
      </div>

      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </Button>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </form>
  )
}
