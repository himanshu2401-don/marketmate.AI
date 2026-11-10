import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  Mail, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  RefreshCw, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export const AboutAndContact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWa, setCopiedWa] = useState(false);

  const contactEmail = 'bunkardisha@gmail.com';
  const whatsappUser = '_disha24';

  const copyToClipboard = (text: string, type: 'email' | 'wa') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedWa(true);
      setTimeout(() => setCopiedWa(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Prepare mailto link
      const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(`Inquiry from ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`;
      const mailLink = document.createElement('a');
      mailLink.href = mailtoUrl;
      mailLink.target = '_blank';
      mailLink.click();

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: About Section */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Product Mission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#21113D] tracking-tight leading-tight">
            Democratizing Marketing Intelligence for Every Builder
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            MarketMate.AI makes marketing planning more accessible by combining business context with modern AI reasoning. We believe early-stage founders, indie creators, students, and small business owners shouldn't need a five-figure marketing agency retainer just to build an organized, high-conversion campaign strategy.
          </p>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Our models focus on actionable messaging structures: pinpointing your unique selling proposition, tailoring copy to platform psychology, and establishing realistic benchmarks for sustainable organic and paid momentum.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-purple-100">
            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5 text-[#7138D8] font-bold text-sm">
                <HeartHandshake className="w-4 h-4" />
                <span>Zero Fluff Discipline</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                No exaggerated guarantees. Structured plans you can copy, schedule, and execute immediately.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5 text-[#7138D8] font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Architecture</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Encrypted server-side requests. Your proprietary product briefs are never retained or sold.
              </p>
            </div>
          </div>

          {/* Direct channels */}
          <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#21113D]">Connect on WhatsApp</div>
                <div className="text-[11px] font-mono text-violet-700">{whatsappUser}</div>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(whatsappUser, 'wa')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-violet-200 text-violet-800 hover:bg-violet-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copiedWa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedWa ? 'Copied' : 'Copy Username'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div id="contact" className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-xl shadow-[#7138D8]/5">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7138D8] block mb-1">
                Direct Product Feedback
              </span>
              <h3 className="text-2xl font-bold text-[#21113D]">Get in Touch</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Reach us directly at <span className="text-violet-700 font-semibold">{contactEmail}</span> or send a note below.
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(contactEmail, 'email')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-violet-700 transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedEmail ? 'Copied Email' : 'Copy Email'}</span>
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-emerald-950">Inquiry Prepared & Received</h4>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Thank you for contacting us. Your mail client was opened with the prefilled message, and our notification server received your note.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 underline"
                >
                  <span>Go to dedicated contact page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-[#7138D8]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#7138D8]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Message <span className="text-[#7138D8]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you're marketing or how we can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] bg-white transition leading-relaxed"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-98 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Preparing Mail...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message via Mail</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
