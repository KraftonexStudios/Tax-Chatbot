"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/global/card";
import GradientText from "@/components/global/grdient-text";
import { features } from "@/constants";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background to-background" />

      <main className="container mx-auto  py-16 px-[9vw] relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <GradientText
            element="H1"
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            AI-Powered Tax Assistants
          </GradientText>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplify your tax process with our intelligent chatbots. Get
            personalized advice and optimize your returns effortlessly.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* First Row - 2 Cards */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6"
          >
            <FeatureCard {...features[0]} />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6"
          >
            <FeatureCard {...features[1]} />
          </motion.div>

          {/* Middle Row - 1 Card Centered */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-start-4 md:col-span-6"
          >
            <FeatureCard {...features[2]} />
          </motion.div>

          {/* Last Row - 2 Cards */}
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6"
          >
            <FeatureCard {...features[3]} />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6"
          >
            <FeatureCard {...features[4]} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
