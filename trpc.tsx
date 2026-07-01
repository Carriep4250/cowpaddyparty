import { Button } from "@/components/ui/button";
import { Calendar, Monitor, ExternalLink } from "lucide-react";

export default function Hero() {
  const scrollToTicket = () => {
    document.getElementById("get-ticket")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Hero Image */}
      <div className="relative w-full">
        <img
          src="/hero-banner.png"
          alt="Cow Paddy Party Fundraiser"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Info Bar */}
      <div className="bg-red-700 py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 text-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">October 17</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Virtual Event</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">$20</span>
            <span className="font-semibold">per entry</span>
          </div>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-yellow-500 py-5 px-4 text-center">
        <p className="text-black font-bold text-lg mb-3">
          Purchase a Travel Savings Certificate & Get Your Cow Paddy Party Ticket!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="http://www.certsgalore.com/Bama_Certificates"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-black hover:bg-zinc-800 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105">
              BUY CERTIFICATE <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <Button
            onClick={scrollToTicket}
            className="bg-red-700 hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            GET YOUR TICKET #
          </Button>
        </div>
      </div>
    </section>
  );
}
