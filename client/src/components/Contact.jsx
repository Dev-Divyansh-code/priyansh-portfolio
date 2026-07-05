import { Icon } from '@iconify/react';
import { useState } from 'react';
import { sendContact } from '../api/client';
import { useSectionReveal } from '../hooks/useGsap';
import Section from './Section';

function ContactButton({ href, icon, label }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      data-reveal-item
      className="flex items-center justify-center gap-2 rounded-xl bg-xghostwhite px-4 py-3 text-sm font-semibold text-xstroke transition-all hover:bg-xarrow active:scale-95"
    >
      <Icon icon={icon} className="text-lg" />
      <span>{label}</span>
    </a>
  );
}

export default function Contact({ socials }) {
  const sectionRef = useSectionReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section
      sectionRef={sectionRef}
      id="contact"
      className="border-b-0"
      title={
        <div data-section-header>
          Like the <span className="text-xblue">Vibes</span>?
        </div>
      }
      icon={
        <img
          src="/assets/images/floral-pink-blue.png"
          alt=""
          loading="lazy"
          className="h-full w-full rotate-45 transition-transform hover:scale-120 hover:-rotate-[20deg]"
          draggable={false}
        />
      }
    >
      <div className="flex flex-col gap-4">
        {/* Contact Form */}
        <div data-reveal-item className="rounded-2xl bg-xbg p-5 sm:rounded-cxl sm:p-8">
          <div className="font-title text-base leading-relaxed text-xstroke sm:text-lg">
            Got a <span className="text-xblue">project</span> or <span className="text-xblue">an idea</span> for a{' '}
            <span className="text-xblue">video</span> you'd like to bring to life?
          </div>

          <div className="mt-4 font-title text-xl font-bold uppercase leading-tight text-xblue sm:text-3xl">
            Let's Connect
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
              placeholder="Tell me about your project..."
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-xl bg-xstroke px-6 py-3 text-base font-semibold text-blank transition-colors hover:bg-xblue active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && <p className="text-sm text-green-600">Message saved!</p>}
            {status === 'error' && <p className="text-sm text-xred">Something went wrong.</p>}
          </form>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ContactButton href={socials?.email ? `mailto:${socials.email}` : undefined} icon="mingcute:mail-fill" label="Email" />
          <ContactButton href={socials?.instagram} icon="mdi:instagram" label="Instagram" />
          <ContactButton href={socials?.youtube} icon="mdi:youtube" label="YouTube" />
          <ContactButton href={socials?.linkedin} icon="mdi:linkedin" label="LinkedIn" />
        </div>
      </div>
    </Section>
  );
}