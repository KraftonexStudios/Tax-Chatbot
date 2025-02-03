import BackdropGradient from "@/components/global/backdrop-text";
import GradientText from "@/components/global/grdient-text";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";


export const PricingSection = () => {
  return (
    <div className="w-full  flex flex-col items-center gap-3" id="pricing">
      <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col justify-center items-center">
        <GradientText
          className="text-4xl font-semibold text-center"
          element="H2"
        >
          Pricing Plans
        </GradientText>
        <p className="text-sm md:text-center text-left text-muted-foreground">
          Join our hackathon and unlock exclusive features to supercharge your
          project.
          <br className="hidden md:block" />
          All plans are designed to empower innovative minds.
        </p>
      </BackdropGradient>
      <Card className="p-7 mt-10 md:w-auto w-full bg-themeBlack border-themeGray">
        <div className="flex flex-col gap-2">
          <CardTitle>Free for Hackathon</CardTitle>
          <CardDescription className="text-[#B4B0AE]">
            Perfect for participants looking to innovate.
          </CardDescription>
          <Link href="#" className="w-full mt-3">
            <Button
              variant="default"
              className="bg-[#333337] w-full rounded-2xl text-white hover:text-[#333337]"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-2 text-[#B4B0AE] mt-5">
          <p className="font-medium">Features</p>
          <span className="flex gap-2 mt-3 items-center">
            <Check />
            API Access for seamless integration
          </span>
          <span className="flex gap-2 items-center">
            <Check />
            Real-time Collaboration Tools
          </span>
          <span className="flex gap-2 items-center">
            <Check />
            Instant Feedback & Support
          </span>
          <span className="flex gap-2 items-center">
            <Check />
            Unlimited Project Submissions
          </span>
          <span className="flex gap-2 items-center">
            <Check />
            Exclusive Hackathon Resources
          </span>
        </div>
      </Card>
    </div>
  );
};
