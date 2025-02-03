import GradientText from "@/components/global/grdient-text"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "lucide-react"
import Link from "next/link"


const CallToAction = () => {
  return (
    <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
      <GradientText
        className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
        element="H1"
      >
        Smart AI Chatbot for <br className="md:hidden" />ITR Filing
      </GradientText>
      <p className="text-sm md:text-center text-left text-muted-foreground">
        Filing Income Tax Returns (ITR) can be a complex and confusing process
        for many
        <br className="md:hidden" />
        individuals, especially when choosing the correct ITR form based on
        various income
        <br className="hidden md:block" /> sources. To simplify this process, we
        have developed
        <br className="md:hidden" />
        an AI-powered chatbot.
      </p>
      <div className="flex mt-20 md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
        <Button
          variant="outline"
          className="rounded-xl bg-transparent text-base"
        >
          Watch Demo
        </Button>
        <Link href="/chatbot">
          <Button className="rounded-xl text-base flex gap-2 w-full">
            <BadgePlus /> Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
