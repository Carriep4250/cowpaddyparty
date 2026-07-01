import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/providers/trpc";
import { Loader2, Ticket, Phone, Mail, User, Copy, CheckCircle, ExternalLink, BadgeCheck, FileCheck } from "lucide-react";

export default function TicketForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [certOrderNum, setCertOrderNum] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [copied, setCopied] = useState(false);

  const purchaseMutation = trpc.ticket.purchase.useMutation({
    onSuccess: (data) => {
      setTicketNumber(data.ticketNumber);
      setShowConfirm(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setCertOrderNum("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !certOrderNum.trim()) return;
    purchaseMutation.mutate({ fullName, email, phone, certificateOrderNumber: certOrderNum });
  };

  const copyTicketNumber = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  return (
    <>
      <section id="get-ticket" className="w-full bg-black py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Step 1 - Buy Certificate */}
          <Card className="bg-zinc-900 border-yellow-500/30 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="bg-yellow-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                <BadgeCheck className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-xs font-bold text-yellow-400 mb-1">STEP 1</div>
              <CardTitle className="text-xl md:text-2xl font-black text-white">
                PURCHASE YOUR <span className="text-yellow-400">CERTIFICATE</span>
              </CardTitle>
              <p className="text-zinc-400 mt-2 text-sm">
                Buy your Travel Savings Certificate at CertsGalore.com for $20. <strong className="text-yellow-400">Save your order number!</strong>
              </p>
            </CardHeader>
            <CardContent className="pt-4 pb-6 text-center">
              <a
                href="http://www.certsgalore.com/Bama_Certificates"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-105">
                  GO TO CERTSGALORE.COM <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <p className="text-yellow-500/70 text-xs mt-3 font-medium">
                Important: Write down or screenshot your order confirmation number - you'll need it in Step 2!
              </p>
            </CardContent>
          </Card>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-px h-8 bg-yellow-500/50"></div>
          </div>

          {/* Step 2 - Register for Ticket */}
          <Card className="bg-zinc-900 border-yellow-500/30 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                <Ticket className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-xs font-bold text-yellow-400 mb-1">STEP 2</div>
              <CardTitle className="text-xl md:text-2xl font-black text-white">
                GET YOUR <span className="text-red-400">TICKET NUMBER</span>
              </CardTitle>
              <p className="text-zinc-400 mt-2 text-sm">
                Already purchased your certificate? Enter your info and order number to get your Cow Paddy Party ticket!
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="certOrderNum" className="text-zinc-300 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-yellow-400" /> Certificate Order Number <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="certOrderNum"
                    type="text"
                    placeholder="Enter your CertsGalore order/confirmation #"
                    value={certOrderNum}
                    onChange={(e) => setCertOrderNum(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500 h-12"
                  />
                  <p className="text-zinc-500 text-xs">Found on your CertsGalore receipt or confirmation email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-zinc-300 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Smith"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500 h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(256) 426-2226"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    required
                    maxLength={14}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500 h-12"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={purchaseMutation.isPending}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-lg h-14 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {purchaseMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Your Ticket...
                    </>
                  ) : (
                    "GET MY TICKET NUMBER"
                  )}
                </Button>

                {purchaseMutation.isError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 text-sm">
                      {purchaseMutation.error?.message || "Something went wrong. Please try again or contact support@cowpaddyparty.com or 256-426-2226."}
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-zinc-900 border-yellow-500/30 text-white max-w-md">
          <DialogHeader className="text-center">
            <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-black">
              You're <span className="text-yellow-400">In!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-zinc-300 text-center">
              Your Cow Paddy Party ticket has been generated! Check your email for confirmation.
            </p>

            <div className="bg-zinc-800 border-2 border-yellow-500 rounded-xl p-6 text-center">
              <p className="text-zinc-400 text-sm mb-2">YOUR TICKET NUMBER</p>
              <p className="text-3xl font-black text-yellow-400 font-mono tracking-wider">
                {ticketNumber}
              </p>
            </div>

            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300 text-sm text-center">
                Save this number! You'll need it to claim your prize if you win the $5,000 drawing on October 17.
              </p>
            </div>

            <Button
              onClick={copyTicketNumber}
              variant="outline"
              className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Ticket Number
                </>
              )}
            </Button>

            <p className="text-zinc-500 text-xs text-center">
              A confirmation email has been sent to you and Doc Lett.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
