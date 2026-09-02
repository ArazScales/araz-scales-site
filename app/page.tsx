import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Method } from "@/components/Method";
import { Fit } from "@/components/Fit";
import { CtaBand } from "@/components/CtaBand";

/**
 * Home.
 *
 * Section order is the argument the page makes: state the position, show the
 * three services, show how an engagement runs, qualify who it's for, then ask.
 * Reordering these changes the pitch — do it deliberately.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <Method />
      <Fit />
      <CtaBand />
    </>
  );
}
