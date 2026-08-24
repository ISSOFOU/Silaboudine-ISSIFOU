import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Clock, CheckCircle2, AlertCircle, ChevronDown, Smartphone, Building2 } from 'lucide-react';
import { WithdrawalRecord } from '../types';
import confetti from 'canvas-confetti';

interface PayoutsViewProps {
  withdrawals: WithdrawalRecord[];
  onBack: () => void;
  onAddWithdrawal: (record: WithdrawalRecord) => void;
}

export const PayoutsView: React.FC<PayoutsViewProps> = ({
  withdrawals,
  onBack,
  onAddWithdrawal,
}) => {
  const [method, setMethod] = useState<'MTN Mobile Money' | 'Moov Money' | 'Wave' | 'Bank Transfer'>('MTN Mobile Money');
  const [amount, setAmount] = useState('100000');
  const [accountDetails, setAccountDetails] = useState('+229 96 12 34 56');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const availableBalance = 850000;
  const pendingBalance = 50000;
  const totalBalance = availableBalance + pendingBalance;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseInt(amount, 10);
    if (!withdrawAmount || withdrawAmount <= 0) return;

    const newRecord: WithdrawalRecord = {
      id: 'w-' + Date.now(),
      amount: withdrawAmount,
      method,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'pending',
      accountDetails,
    };

    onAddWithdrawal(newRecord);
    setIsSuccessMessage(true);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch {}

    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b121e] text-white pb-8">
      
      {/* Top Header matching Image 10 */}
      <div className="px-4 py-3 bg-[#0f1726] border-b border-slate-800/80 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={onBack}
          className="p-1 rounded-full text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="font-extrabold text-sm text-cyan-400 font-display">SocialMeet</h1>

        <div className="w-6" />
      </div>

      <div className="px-4 py-4 space-y-5">
        
        {/* Total Balance Card matching Image 10 */}
        <div className="bg-[#112338] border border-cyan-500/40 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-300 text-xs font-medium">Total Balance</p>
              <h2 className="text-2xl font-black text-white mt-0.5 font-display tracking-tight">
                {totalBalance.toLocaleString()} <span className="text-sm font-bold text-slate-300">FCFA</span>
              </h2>
              <div className="text-[11px] text-slate-300 mt-2 space-y-0.5">
                <p>Available for Withdrawal: <strong className="text-white">{availableBalance.toLocaleString()} FCFA</strong></p>
                <p className="text-slate-400">Pending Balance: {pendingBalance.toLocaleString()} FCFA</p>
              </div>
            </div>

            {/* Sparkline Graph matching Image 10 */}
            <div className="w-24 h-14">
              <svg viewBox="0 0 100 40" className="w-full h-full text-cyan-400">
                <path
                  d="M0,32 Q30,30 50,22 T80,14 T100,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="5" r="4" fill="#00d2ff" />
              </svg>
            </div>
          </div>
        </div>

        {/* Section: Request Withdrawal matching Image 10 */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white">Request Withdrawal</h3>

          <form onSubmit={handleWithdraw} className="bg-[#141e2e] border border-slate-700/60 rounded-2xl p-4 space-y-3 shadow-md">
            
            {/* Withdrawal Method */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Withdrawal Method
              </label>

              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white appearance-none focus:outline-none focus:border-cyan-400 cursor-pointer pr-9"
                >
                  <option value="MTN Mobile Money">🟡 MTN Mobile Money</option>
                  <option value="Moov Money">🔵 Moov Money</option>
                  <option value="Wave">🌊 Wave</option>
                  <option value="Bank Transfer">🏦 Bank Transfer</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Amount to Withdraw */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Amount to Withdraw
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100,000"
                  required
                  className="w-full bg-[#182333] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 pr-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">
                  FCFA
                </span>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Account Details
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder="+229 96 12 34 56 ou IBAN"
                required
                className="w-full bg-[#182333] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {isSuccessMessage && (
              <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} /> Demande de virement envoyée avec succès !
              </div>
            )}

            {/* Withdraw Button matching Image 10 */}
            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer mt-2"
            >
              Withdraw
            </button>
          </form>
        </div>

        {/* Section: Withdrawal History matching Image 10 */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-white">Withdrawal History</h3>

          <div className="space-y-2">
            {withdrawals.map((rec) => {
              const isPending = rec.status === 'pending';
              return (
                <div
                  key={rec.id}
                  className="p-3 bg-[#141e2e] border border-slate-700/60 rounded-2xl flex items-start gap-3 shadow-sm"
                >
                  <div className="mt-0.5">
                    {isPending ? (
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Clock size={13} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 size={14} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-white">
                      {isPending ? 'Pending' : 'Completed'} - {rec.amount.toLocaleString()} FCFA - {rec.method}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{rec.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
