"use client"
import { motion } from "framer-motion"
import { features } from "@/constants"
import { FeatureCard } from "@/components/global/card"
import GradientText from "@/components/global/grdient-text"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
            <GradientText element="H1" className="text-4xl font-bold">AI-Powered Tax Assistants</GradientText>
          <p className="text-base text-muted-foreground mt-4">Simplify your tax process with our intelligent chatbot</p>
         
        </motion.div>
        <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Our Chatbots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} href={feature.href} />
          ))}
        </div>
      </main>
    </div>
  )
}

