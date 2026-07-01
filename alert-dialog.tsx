import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";
import { Lock, CheckCircle, XCircle, Clock, Eye, Shield, Ticket, Users, AlertCircle } from "lucide-react";

type TicketRecord = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  certificateOrderNumber: string;
  ticketNumber: string;
  verified: string;
  createdAt: Date | null;
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [error, setError] = useState("");

  const { data: tickets, isLoading, refetch } = trpc.ticket.list.useQuery(
    { password },
    { enabled: loggedIn }
  );

  const statsQuery = trpc.ticket.stats.useQuery();

  const updateStatus = trpc.ticket.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwInput.trim()) return;
    setPassword(pwInput);
    setLoggedIn(true);
    setError("");
  };

  const handleStatusChange = (ticketId: number, status: "pending" | "confirmed" | "rejected") => {
    updateStatus.mutate({ password, ticketId, status });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-2xl font-black text-white">ADMIN LOGIN</h1>
            <p className="text-zinc-400 text-sm mt-1">Cow Paddy Party Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500 h-12"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold h-12"
            >
              <Lock className="w-4 h-4 mr-2" /> LOGIN
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!tickets) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-zinc-400 mb-4">Invalid password. Please try again.</p>
          <Button onClick={() => { setLoggedIn(false); setPassword(""); setPwInput(""); }} variant="outline">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  const stats = statsQuery.data;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-red-800 border-b border-red-700 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-yellow-400" />
            <h1 className="text-xl font-black">COW PADDY PARTY <span className="text-yellow-400">ADMIN</span></h1>
          </div>
          <Button
            onClick={() => { setLoggedIn(false); setPassword(""); setPwInput(""); }}
            variant="outline"
            size="sm"
            className="border-red-600 text-red-200 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <Ticket className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-white">{stats?.totalSold || 0}</p>
            <p className="text-zinc-400 text-xs">Total Tickets</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-yellow-400">{stats?.pending || 0}</p>
            <p className="text-zinc-400 text-xs">Pending Verification</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-green-400">{stats?.confirmed || 0}</p>
            <p className="text-zinc-400 text-xs">Confirmed</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center">
            <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-black text-red-400">{stats?.rejected || 0}</p>
            <p className="text-zinc-400 text-xs">Rejected</p>
          </div>
        </div>

        {/* Verification Instructions */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
            <Eye className="w-5 h-5" /> How to Verify
          </h3>
          <p className="text-zinc-300 text-sm">
            Cross-reference each <strong>Certificate Order #</strong> below with your CertsGalore.com dashboard records. 
            Click <span className="text-green-400 font-bold">Confirm</span> if the order is valid, or <span className="text-red-400 font-bold">Reject</span> if it's not found.
          </p>
        </div>

        {/* Tickets Table */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <h2 className="font-bold text-white">All Registrations</h2>
            <span className="text-zinc-400 text-sm">({tickets.length})</span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800 text-zinc-400 text-left">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium text-yellow-400">Cert Order #</th>
                  <th className="px-4 py-3 font-medium text-green-400">Ticket #</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket: TicketRecord) => (
                  <tr key={ticket.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                    <td className="px-4 py-3 text-white font-medium">{ticket.fullName}</td>
                    <td className="px-4 py-3 text-zinc-300">{ticket.email}</td>
                    <td className="px-4 py-3 text-zinc-300">{ticket.phone}</td>
                    <td className="px-4 py-3 text-yellow-400 font-mono">{ticket.certificateOrderNumber}</td>
                    <td className="px-4 py-3 text-green-400 font-mono font-bold">{ticket.ticketNumber}</td>
                    <td className="px-4 py-3">
                      {ticket.verified === "confirmed" && (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                          <CheckCircle className="w-3 h-3" /> CONFIRMED
                        </span>
                      )}
                      {ticket.verified === "pending" && (
                        <span className="inline-flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                      {ticket.verified === "rejected" && (
                        <span className="inline-flex items-center gap-1 text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">
                          <XCircle className="w-3 h-3" /> REJECTED
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleStatusChange(ticket.id, "confirmed")}
                          disabled={ticket.verified === "confirmed" || updateStatus.isPending}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs px-2"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Confirm
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(ticket.id, "rejected")}
                          disabled={ticket.verified === "rejected" || updateStatus.isPending}
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white h-7 text-xs px-2"
                        >
                          <XCircle className="w-3 h-3 mr-1" /> Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {tickets.map((ticket: TicketRecord) => (
              <div key={ticket.id} className="border-t border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">{ticket.fullName}</span>
                  {ticket.verified === "confirmed" && (
                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">CONFIRMED</span>
                  )}
                  {ticket.verified === "pending" && (
                    <span className="text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded">PENDING</span>
                  )}
                  {ticket.verified === "rejected" && (
                    <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">REJECTED</span>
                  )}
                </div>
                <p className="text-zinc-400 text-xs mb-1">{ticket.email} | {ticket.phone}</p>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase">Cert Order #</p>
                    <p className="text-yellow-400 font-mono text-sm">{ticket.certificateOrderNumber}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase">Ticket #</p>
                    <p className="text-green-400 font-mono text-sm font-bold">{ticket.ticketNumber}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStatusChange(ticket.id, "confirmed")}
                    disabled={ticket.verified === "confirmed"}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white h-7 text-xs flex-1"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" /> Confirm
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(ticket.id, "rejected")}
                    disabled={ticket.verified === "rejected"}
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white h-7 text-xs flex-1"
                  >
                    <XCircle className="w-3 h-3 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {tickets.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500">No tickets registered yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
