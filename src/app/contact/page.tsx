import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Altan Esmer',
  description:
    'Tell me about your project or role. I read every message and reply within 24 hours.',
};

export default function ContactPage() {
  return <ContactForm />;
}
