import { LandingHero } from "@/components/landing/LandingHero";
import { LandingProblem } from "@/components/landing/LandingProblem";
import { LandingSteps } from "@/components/landing/LandingSteps";
import { LandingValue } from "@/components/landing/LandingValue";
import { PricingSection } from "@/components/landing/PricingSection";
import { LandingCredibility } from "@/components/landing/LandingCredibility";
import { LandingSocialProof } from "@/components/landing/LandingSocialProof";
import { LandingCTA } from "@/components/landing/LandingCTA";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingProblem />
      <LandingSteps />
      <LandingValue />
      <PricingSection />
      <LandingCredibility />
      <LandingSocialProof />
      <LandingCTA />
    </>
  );
}
