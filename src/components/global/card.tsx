"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={'/chatbot'+href} className="block h-full">
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="relative h-fit px-[5vw] py-8 flex flex-col bg-card hover:bg-card/80 transition-colors duration-200 overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-br from-indigo-900 to-black transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-br from-indigo-900 to-black transform origin-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />

          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}

          <CardHeader className="relative z-10 pt-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-300  flex items-center justify-center mb-6 mx-auto transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {icon}
            </div>
            <CardTitle className="text-2xl font-semibold text-center mb-3">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground text-center">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow relative z-10" />

          <CardFooter className="flex justify-center items-center relative z-10 pb-8">
            <Button variant={"outline"}>
              <motion.div
                className="flex items-center text-primary text-sm font-medium"
                whileHover="hover"
              >
                <span className="relative">
                  Explore feature
                  {/* <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  /> */}
                </span>
                <motion.div
                  variants={{
                    hover: {
                      x: [0, 5, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="flex items-center ml-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
