import React, { useState } from 'react';
import { X, QrCode, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRScannerModalProps {
  eventName: string;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ eventName, onClose }) => {
  const [scanResult, setScanResult] = useState<{
    status: 'scanning' | 'success' | 'invalid';
    ticketId?: string;
    attendeeName?: string;
    tier?: string;
  }>({ status: 'scanning' });

  const handleSimulateScan = (isValid: boolean) => {
    if (isValid) {
      setScanResult({
        status: 'success',
        ticketId: 'SM-' + Math.floor(100000 + Math.random() * 900000),
        attendeeName: 'Dine L\'Emblematique',
        tier: 'Pass VIP & Backstage',
      });
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    } else {
      setScanResult({
        status: 'invalid',
        ticketId: 'SM-ERR-091',
        attendeeName: 'Inconnu',
      });
    }
  };

  const resetScan = () => {
    setScanResult({ status: 'scanning' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-[#111a28] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#162234] border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode size={20} className="text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Scanner de Billets</h3>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{eventName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-300">
            <X size={18} />
          </button>
        </div>

        {/* Scanner Viewport */}
        <div className="p-6 flex flex-col items-center justify-center bg-[#090e17]">
          {scanResult.status === 'scanning' ? (
            <div className="relative w-64 h-64 bg-slate-900 rounded-2xl border-2 border-dashed border-cyan-400/60 flex items-center justify-center overflow-hidden shadow-inner">
              {/* Scan laser line animation */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00d2ff] animate-pulse" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }} />
              
              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />

              <div className="flex flex-col items-center gap-2 text-slate-400 text-center px-4">
                <QrCode size={48} className="text-cyan-400/70 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">Placez le QR Code dans le cadre</span>
                <span className="text-[10px] text-slate-500">Caméra prête pour validation rapide</span>
              </div>
            </div>
          ) : scanResult.status === 'success' ? (
            <div className="w-64 py-6 px-4 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl flex flex-col items-center text-center">
              <CheckCircle2 size={48} className="text-emerald-400 mb-2" />
              <h4 className="font-bold text-white text-base">Billet Valide !</h4>
              <p className="text-xs text-emerald-300 font-medium mt-1">{scanResult.attendeeName}</p>
              <span className="inline-block mt-2 text-[11px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                {scanResult.tier}
              </span>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">{scanResult.ticketId}</p>
            </div>
          ) : (
            <div className="w-64 py-6 px-4 bg-rose-950/40 border border-rose-500/40 rounded-2xl flex flex-col items-center text-center">
              <AlertTriangle size={48} className="text-rose-400 mb-2" />
              <h4 className="font-bold text-white text-base">Billet Invalide / Déjà Utilisé</h4>
              <p className="text-xs text-rose-300 mt-1">Ce QR code n'est pas associé à cet événement.</p>
            </div>
          )}

          {/* Quick Simulation controls */}
          <div className="w-full mt-5 flex flex-col gap-2">
            {scanResult.status === 'scanning' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleSimulateScan(true)}
                  className="flex-1 py-2.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <QrCode size={14} /> Simuler Scan Valide
                </button>
                <button
                  onClick={() => handleSimulateScan(false)}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition"
                >
                  Invalide
                </button>
              </div>
            ) : (
              <button
                onClick={resetScan}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              >
                <RefreshCw size={14} /> Scanner un autre billet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
