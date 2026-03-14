import type { ReactNode } from "react"

interface TrustItemProps {
  icon: ReactNode
  title: string
  description: string
}

export default function TrustItem({ icon, title, description }: TrustItemProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-sky-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 rounded-full bg-sky-50 p-3">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-sky-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

