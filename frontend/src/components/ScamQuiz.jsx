import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  Award,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "The Urgency Power Threat",
    message: "“Dear consumer, your electricity power supply will be disconnected tonight at 9:30 PM from the electricity office because previous month bill was not updated. Please immediately call our electricity officer at 98765-XXXXX.”",
    isScam: true,
    category: "Utility Disconnection Extortion",
    explanation: "Scam! Power utility companies never threaten immediate night-time disconnection via random mobile numbers or demand instant phone-call payments. Real disconnections require formal postal written notices and a 15-day grace period."
  },
  {
    id: 2,
    title: "The Part-Time Telegram Task",
    message: "“Hello! We are recruiting remote media assistants. Simply like 3 YouTube videos and subscribe to channels to earn ₹150 per task. Payout is instantly credited. To unlock premium level-2 tasks with ₹5,000 daily earnings, pay a refundable security deposit of ₹999.”",
    isScam: true,
    category: "Fake Task / Prepaid Review Scam",
    explanation: "Scam! The classic 'pig-butchering' task scam lures victims with tiny ₹100 payouts for basic clicks, then traps them into depositing large amounts into fake prepaid wallets that can never be withdrawn."
  },
  {
    id: 3,
    title: "Official Bank Transaction Alert",
    message: "“Dear SBI Customer, INR 1,500.00 debited from A/C XX4921 on 26-Oct-2026 at 11:05 AM by ATM WDL. Avail Bal: INR 24,190.20. If not done by you, SMS BLOCK to 567676 or call 1800-11-2211.”",
    isScam: false,
    category: "Legitimate Bank Alert",
    explanation: "Legitimate! This is a standard non-coercive bank transaction notification. It displays partial masked account numbers (XX4921), contains no external suspicious links, and points to verified shortcodes and toll-free numbers."
  },
  {
    id: 4,
    title: "Digital Arrest & Customs Contraband",
    message: "“This is Senior Officer Deshmukh from Cyber Crime Branch. A parcel shipped via FedEx to Taiwan in your name contains 5 fake passports and 140g MDMA. You are placed under digital arrest. Join this Skype video call immediately and do not tell your family or an arrest warrant will be executed.”",
    isScam: true,
    category: "Digital Arrest Impersonation",
    explanation: "Scam! Law enforcement agencies and courts NEVER conduct 'digital arrests' over Skype or WhatsApp video calls. Genuine police investigations involve physical summons, not secret video interrogations or money transfers."
  },
  {
    id: 5,
    title: "Reverse UPI QR Code",
    message: "“I want to buy the sofa you listed on OLX. I am an army officer posted in Pune. I have sent you this QR code on WhatsApp. Please scan this QR code and enter your 4-digit UPI PIN to receive the ₹8,000 advance payment into your bank account.”",
    isScam: true,
    category: "Reverse UPI Payment Scam",
    explanation: "Scam! You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money. Your UPI PIN is only used for authorizing outgoing payments from your account."
  }
];

export default function ScamQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // true = Scam, false = Legitimate
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleAnswer = (choice) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    if (choice === currentQ.isScam) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Training</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Scam Radar Challenge</h2>
        <p className="text-sm text-slate-400">
          Can you spot the difference between real communications and psychological fraud?
        </p>
      </div>

      {isCompleted ? (
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Challenge Completed!</h3>
            <p className="text-base text-slate-300">
              You scored <span className="font-bold text-blue-400 font-mono text-xl">{score} / {QUIZ_QUESTIONS.length}</span>
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {score === 5 
                ? "🌟 Outstanding! You possess elite scam detection instincts and can readily spot social engineering tactics."
                : score >= 3
                ? "👍 Good awareness! You recognize the primary traps, but stay vigilant against subtle urgency and authority impersonations."
                : "⚠️ Danger zone! Make sure to always run suspicious messages through the ScamInvestigation AI analyzer before clicking or transferring money."}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Challenge</span>
          </button>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Scenario {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="font-mono text-blue-400 font-semibold">Current Score: {score}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Scenario Message Box */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-tight">{currentQ.title}</h3>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-amber-200/90 leading-relaxed shadow-inner">
              {currentQ.message}
            </div>
          </div>

          {/* Decision Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 border ${
                selectedAnswer === null
                  ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30 hover:scale-[1.02]'
                  : currentQ.isScam
                  ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/30'
                  : selectedAnswer === true
                  ? 'bg-slate-800 text-slate-400 border-slate-700 opacity-50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 opacity-50'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>It's a Scam!</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 border ${
                selectedAnswer === null
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:scale-[1.02]'
                  : !currentQ.isScam
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/30'
                  : selectedAnswer === false
                  ? 'bg-slate-800 text-slate-400 border-slate-700 opacity-50'
                  : 'bg-slate-800 text-slate-400 border-slate-700 opacity-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>It's Legitimate</span>
            </button>
          </div>

          {/* Explanation Reveal */}
          {selectedAnswer !== null && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2">
                {selectedAnswer === currentQ.isScam ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-400">Correct Assessment!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="text-sm font-bold text-rose-400">Incorrect!</span>
                  </>
                )}
                <span className="text-xs text-slate-500 font-mono">({currentQ.category})</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              <button
                onClick={handleNext}
                className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
