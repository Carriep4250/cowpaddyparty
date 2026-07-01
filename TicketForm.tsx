import { Phone, Mail, Globe, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-red-800 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-white font-black text-xl mb-2">
              COW <span className="text-yellow-400">PADDY</span> PARTY
            </h3>
            <p className="text-red-200 text-sm">
              Fundraising should be fun! Support your cause and save more with our virtual fundraiser event.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-yellow-400 font-bold mb-3">QUICK LINKS</h4>
            <div className="space-y-2">
              <a
                href="https://cowpaddyparty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-200 text-sm hover:text-white flex items-center justify-center gap-1 transition-colors"
              >
                <Globe className="w-4 h-4" /> cowpaddyparty.com <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => document.getElementById("get-ticket")?.scrollIntoView({ behavior: "smooth" })}
                className="text-red-200 text-sm hover:text-white transition-colors"
              >
                Get Your Ticket
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-yellow-400 font-bold mb-3">CONTACT DOC LETT</h4>
            <div className="space-y-2">
              <a
                href="tel:256-426-2226"
                className="text-red-200 text-sm hover:text-white flex items-center justify-center md:justify-end gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" /> 256-426-2226
              </a>
              <a
                href="mailto:support@cowpaddyparty.com"
                className="text-red-200 text-sm hover:text-white flex items-center justify-center md:justify-end gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" /> support@cowpaddyparty.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-red-700 mt-8 pt-6 text-center">
          <p className="text-red-300 text-xs">
            BAMA Marketing Group Presents | Cow Paddy Party Fundraiser | Virtual Event - October 17
          </p>
          <p className="text-red-400/60 text-xs mt-1">
            "Stack the deck. Build the team. Create the life you desire."
          </p>
        </div>
      </div>
    </footer>
  );
}
