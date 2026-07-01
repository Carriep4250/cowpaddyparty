import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import TicketForm from "@/sections/TicketForm";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <HowItWorks />
      <TicketForm />
      <Footer />
    </div>
  );
}
