import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { useChat } from "@/context/chatbot"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
    const {clearMessages} = useChat();
  return (
    <Link href={`/chatbot/${href}`} onClick={()=>clearMessages()}>
      <Card
        className={cn(
          "relative group p-6 h-[200px]",
          "bg-[#1C1C1C] border-[#2A2A2A] hover:bg-[#252525]",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-[0_0_20px_2px_rgba(125,125,255,0.1)]",
        )}
      >
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="absolute bottom-6 right-6">
          <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </Card>
    </Link>
  )
}

