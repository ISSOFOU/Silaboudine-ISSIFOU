import React from 'react';
import { X, MapPin, Navigation, Compass } from 'lucide-react';

interface MapModalProps {
  locationName: string;
  neighborhood: string;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ locationName, neighborhood, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-[#111a28] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-[#162234] border-b border-slate-700/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm truncate max-w-[200px]">{locationName}</h3>
              <p className="text-[11px] text-cyan-400">{neighborhood}, Bénin</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-300">
            <X size={18} />
          </button>
        </div>

        {/* Interactive Map Visual Mockup styled for Benin / Cotonou */}
        <div className="relative h-64 w-full bg-[#0e1726] overflow-hidden border-b border-slate-800">
          
          {/* Stylized Map Grid & Roads */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Lagoon / Atlantic Ocean water feature */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-cyan-950/50 border-t border-cyan-500/30 flex items-center justify-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-500/60">Océan Atlantique • Golfe de Guinée</span>
          </div>

          {/* Roads lines */}
          <div className="absolute top-10 -left-10 w-96 h-1.5 bg-slate-700/60 rotate-12" />
          <div className="absolute top-28 -left-10 w-96 h-2 bg-amber-500/30 -rotate-6" />
          <div className="absolute top-40 -left-10 w-96 h-1 bg-slate-700/60 rotate-25" />

          {/* Neighborhood Labels */}
          <div className="absolute top-6 left-6 text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
            Haie Vive
          </div>
          <div className="absolute top-16 right-8 text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
            Ganhi
          </div>
          <div className="absolute top-32 left-10 text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800">
            Fidjrossè Plage
          </div>

          {/* Target Location Pin with Pulsing Radar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-cyan-500/30 animate-ping absolute -inset-0" />
              <div className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_#00d2ff] relative z-10">
                <MapPin size={22} className="stroke-[2.5]" />
              </div>
            </div>
            <div className="mt-2 bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-cyan-500/40 text-center whitespace-nowrap">
              {locationName}
            </div>
          </div>

          <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 text-cyan-400 border border-slate-800">
            <Compass size={18} className="animate-spin" style={{ animationDuration: '15s' }} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="p-4 bg-[#111a28] flex flex-col gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName + ' ' + neighborhood + ' Cotonou Benin')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <Navigation size={15} /> Itinéraire Google Maps
          </a>
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
