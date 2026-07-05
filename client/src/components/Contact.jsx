import { Icon } from '@iconify/react';
import { useState } from 'react';
import { sendContact } from '../api/client';
import { useSectionReveal } from '../hooks/useGsap';
import Section from './Section';

const MIN_MESSAGE_LENGTH = 10;

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
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (message.length < MIN_MESSAGE_LENGTH) {
      setStatus('error');
      setErrorMsg(`Message must be at least ${MIN_MESSAGE_LENGTH} characters.`);
      return;
    }

    setStatus('sending');

    try {
      await sendContact({ name, email, message });
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Could not send message. Please try again in a moment.');
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
        <div className="rounded-2xl bg-xbg p-5 sm:rounded-cxl sm:p-8" data-reveal-item>
          <div className="font-title text-base leading-relaxed text-xstroke sm:text-lg">
            Got a <span className="text-xblue">project</span> or <span className="text-xblue">an idea</span> for a{' '}
            <span className="text-xblue">video</span> you'd like to bring to life?
          </div>

          <div className="mt-4 font-title text-xl font-bold uppercase leading-tight text-xblue sm:text-3xl">
            Let's Connect
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 mt-4 space-y-3" noValidate>
            <input
              name="name"
              autoComplete="name"
              className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (status) setStatus('');
              }}
              required
            />
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
              placeholder="Email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (status) setStatus('');
              }}
              required
            />
            <div>
              <textarea
                name="message"
                className="w-full rounded-xl border border-xline bg-xsurface px-4 py-3 text-base text-xstroke outline-none focus:border-xblue"
                placeholder="Tell me about your project..."
                rows={4}
                minLength={MIN_MESSAGE_LENGTH}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (status) setStatus('');
                }}
                required
              />
              <p className="mt-1 text-xs text-xghoststroke">At least {MIN_MESSAGE_LENGTH} characters</p>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-xl bg-xbtn px-6 py-3 text-base font-semibold text-xbtn-text transition-colors hover:bg-xblue hover:text-xaccent-text active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'sent' && (
              <p className="text-sm font-medium text-xblue">Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && <p className="text-sm text-xred">{errorMsg}</p>}
          </form>
        </div>

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