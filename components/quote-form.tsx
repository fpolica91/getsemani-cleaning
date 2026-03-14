"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (service: keyof typeof formState.services) => {
    setFormState((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Format data for webhook
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

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormState({
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
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-green-700">Thank You!</h3>
        <p className="text-green-600">We've received your quote request and will get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
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
        <div className="grid gap-2 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="restroom"
              checked={formState.services.restroom}
              onCheckedChange={() => handleCheckboxChange("restroom")}
            />
            <Label htmlFor="restroom" className="font-normal">
              Commercial Restroom Cleaning
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="supplies"
              checked={formState.services.supplies}
              onCheckedChange={() => handleCheckboxChange("supplies")}
            />
            <Label htmlFor="supplies" className="font-normal">
              Paper Towel & Soap Refills
            </Label>
          </div>
          <div className="flex items-center space-x-2">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={formState.preferredDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredTime">Preferred Time</Label>
          <Input
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={formState.preferredTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
        </div>
      </div>

      <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
        Submit Quote Request
      </Button>
    </form>
  )
}

