import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Copy, 
  Check, 
  Send, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { TiltCard } from '../components/TiltCard';

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'MarketMate Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactEmail = 'bunkardisha@gmail.com';
  const whatsappUser = '_disha24';

  const handleCopy = (text: string, type: 'email' | 'whatsapp') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2000);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // 1. Post to backend endpoint
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 2. Open prefilled mailto as requested
      const subjectEncoded = encodeURIComponent(`[MarketMate] ${formData.subject} - from ${formData.name}`);
      const bodyEncoded = encodeURIComponent(
        `Hi Disha,\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
      );
      const mailtoUrl = `mailto:${contactEmail}?subject=${subjectEncoded}&body=${bodyEncoded}`;
      
      // Trigger mailto link softly
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.target = '_blank';
      mailtoLink.rel = 'noopener noreferrer';
      mailtoLink.click();

      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: 'MarketMate Inquiry', message: '' });
    } catch {
      // Fallback direct mailto trigger even if network had an issue
      window.location.href = `mailto:${contactEmail}?subject=Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FF] pt-28 pb-24">
      <PageMeta 
        title="Contact Us — MarketMate.AI"
        description="Get in touch with the MarketMate.AI team via WhatsApp (_disha24) or direct email (bunkardisha@gmail.com). We respond quickly to brand partnerships and technical inquiries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 text-violet-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-200/60">
            <MessageCircle className="w-3.5 h-3.5 text-violet-600" />
            Direct Communications
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#21113D] tracking-tight">
            Let's Talk Growth & Partnerships
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have a custom brand challenge, feature request, or feedback on MarketMate.AI? Reach out directly via WhatsApp or email.
          </p>
        </div>

        {/* Contact Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* WhatsApp Card */}
          <TiltCard maxTilt={8}>
            <div className="h-full bg-white rounded-3xl p-8 border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-xs">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Quick Chat
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#21113D] mb-1">WhatsApp Direct</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Fastest response for quick marketing inquiries and feature suggestions.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block">WhatsApp Username</span>
                    <span className="text-base font-extrabold text-[#21113D] font-mono tracking-wide">
                      {whatsappUser}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(whatsappUser, 'whatsapp')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                    aria-label="Copy WhatsApp username"
                  >
                    {copiedWhatsApp ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Typical reply: within a few hours
                </span>
                <span className="text-emerald-600 font-medium font-mono">_disha24</span>
              </div>
            </div>
          </TiltCard>

          {/* Email Card */}
          <TiltCard maxTilt={8}>
            <div className="h-full bg-white rounded-3xl p-8 border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shadow-xs">
                    <Mail className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                    Official Inbox
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#21113D] mb-1">Email Correspondence</h3>
                <p className="text-xs text-slate-500 mb-6">
                  For formal briefs, enterprise collaboration, or in-depth advisory questions.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <span className="text-[11px] text-slate-400 font-medium block">Email Address</span>
                    <a 
                      href={`mailto:${contactEmail}`}
                      className="text-sm sm:text-base font-extrabold text-violet-700 hover:text-violet-900 underline decoration-violet-300 underline-offset-4 truncate block transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>

                  <button
                    onClick={() => handleCopy(contactEmail, 'email')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200 hover:border-violet-200 text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-violet-600" />
                        <span className="text-violet-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  Direct to inbox
                </span>
                <a 
                  href={`mailto:${contactEmail}`}
                  className="text-violet-600 hover:text-violet-800 font-semibold flex items-center gap-1"
                >
                  <span>Open Mail App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50/70 rounded-full blur-3xl -z-10" />

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#21113D]">Send an Instant Message</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Submitting opens a prefilled email to <strong className="text-slate-700">{contactEmail}</strong> and securely queues your note.
            </p>
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Message Ready & Dispatched!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your email client has been prepared with your message, and our notification server received your note. We will get back to you promptly!
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Alex Rivera"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. alex@yourbrand.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-white'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Subject or Topic
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="e.g. Custom Campaign Consultation"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Message or Brief <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell us about your brand, what you're building, or questions about MarketMate.AI..."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
                  errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-white'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-[#21113D] hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-violet-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Preparing Dispatch...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message & Open Mail</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
