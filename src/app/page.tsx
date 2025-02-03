import CallToAction from "@/components/landing/callToAction";
import DashboardSnippet from "@/components/landing/dashboardSnippet";
import dynamic from "next/dynamic";

const PricingSection = dynamic(
  () =>
    import("@/components/landing/pricingSection").then(
      (component) => component.PricingSection
    ),
  { ssr: true }
);

export default function Home() {
  return (
    <main className="md:px-10 py-20 flex flex-col gap-36">
      <div>
        <CallToAction />
        <DashboardSnippet />
      </div>
      <PricingSection />
    </main>
  );
}
