import { ExternalLink, TicketCheck, Video, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: ExternalLink,
    title: "Buy Certificate",
    description: "Purchase your Hotels Etc. Travel Savings Certificate for $20 at CertsGalore.com.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    action: true,
  },
  {
    icon: TicketCheck,
    title: "Get Your Ticket #",
    description: "Come back here, enter your info, and receive your unique Cow Paddy Party ticket number.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    action: false,
  },
  {
    icon: Video,
    title: "Join Virtual Event",
    description: "Tune in to the virtual Cow Paddy Party event on October 17 for the big drawing.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    action: false,
  },
  {
    icon: Gift,
    title: "Win $5,000!",
    description: "If your ticket number is drawn, you win the $5,000 grand prize!",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    action: false,
  },
];

export default function HowItWorks() {
  const scrollToTicket = () => {
    document.getElementById("get-ticket")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-zinc-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-4">
          HOW IT <span className="text-yellow-400">WORKS</span>
        </h2>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Purchase a Travel Savings Certificate at CertsGalore.com, then register here to get your Cow Paddy Party ticket for a chance to win $5,000!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 text-center hover:border-yellow-500/50 transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className={`${step.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <div className="text-xs font-bold text-yellow-400 mb-2">
                STEP {index + 1}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{step.description}</p>
              {step.action && (
                <a
                  href="http://www.certsgalore.com/Bama_Certificates"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    BUY NOW <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </a>
              )}
              {index === 1 && (
                <Button
                  onClick={scrollToTicket}
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  REGISTER
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
