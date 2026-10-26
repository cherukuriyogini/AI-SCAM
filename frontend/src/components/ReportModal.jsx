import React from 'react';
import { 
  ShieldAlert, 
  X, 
  ExternalLink, 
  PhoneCall, 
  AlertOctagon, 
  CheckCircle2, 
  Globe, 
  Clock, 
  Lock
} from 'lucide-react';

export default function ReportModal({ isOpen, onClose, currentResult }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Official Cybercrime Reporting Guide</h3>
              <p className="text-xs text-slate-400">Verified law enforcement portals & emergency financial freeze hotlines</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-300">
          {/* Golden Hour Urgent Warning */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-amber-950/30 border border-rose-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>The "Golden Hour" Protocol (If Money Was Already Sent)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If financial transfer occurred within the last <strong>2 to 4 hours</strong>, reporting immediately gives banks the highest chance of freezing the fraudster's beneficiary account before cash withdrawal.
            </p>
          </div>

          {/* Regional Authorities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>National Cybercrime Hotlines</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* India */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">🇮🇳 India (MHA / I4C)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">Toll-Free 24x7</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-bold">
                  <PhoneCall className="w-4 h-4" />
                  <span>Call: 1930</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  National Cyber Crime Reporting Portal:
                </p>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-medium underline"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* USA */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">🇺🇸 United States (FTC & FBI)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">Federal</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Federal Trade Commission & FBI IC3:
                </p>
                <div className="space-y-1">
                  <a 
                    href="https://reportfraud.ftc.gov" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-medium underline block"
                  >
                    <span>reportfraud.ftc.gov (FTC)</span>
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                  <a 
                    href="https://www.ic3.gov" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-medium underline block"
                  >
                    <span>ic3.gov (FBI Internet Crimes)</span>
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </div>
              </div>

              {/* UK */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">🇬🇧 United Kingdom</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">Action Fraud</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-sm font-bold">
                  <PhoneCall className="w-4 h-4" />
                  <span>Call: 0300 123 2040</span>
                </div>
                <a 
                  href="https://www.actionfraud.police.uk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 font-medium underline"
                >
                  <span>actionfraud.police.uk</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Sanchar Saathi (Telecom Fraud) */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">📱 Chakshu / Telecom Report</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono text-[10px]">DoT</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Report suspected fraud calls, SMS, and WhatsApp numbers to disconnect their SIMs:
                </p>
                <a 
                  href="https://sancharsaathi.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 text-purple-400 hover:text-purple-300 font-medium underline"
                >
                  <span>sancharsaathi.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Immediate 4-Step Checklist */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Mandatory Protective Checklist</span>
            </h4>
            <div className="space-y-2">
              {[
                "Call your bank customer care immediately to block debit cards, netbanking access, and UPI IDs.",
                "Take full screenshots of all chat conversations, payment receipts, phone numbers, and URL links.",
                "Never delete the chat thread with the fraudster; law enforcement requires intact digital metadata for forensic tracking.",
                "File an official complaint on the cybercrime portal using the downloaded ScamInvestigation AI Incident Report as technical evidence."
              ].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">ScamInvestigation AI • Threat Response Unit</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
