import MotionSection from '@/components/MotionSection';

export const metadata = {
  title: 'About — Altan Esmer',
  description: 'A little about who I am and what I work on.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
    <MotionSection>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        About
      </h1>
      <div className="prose-mdx">
        <p>
          I am a software engineer with a focus on frontend architecture and web
          performance. Most of my work lives at the intersection of product and
          platform — I care about the experience end users have just as much as
          the developer experience of the teams building it.
        </p>
        <p>
          I have spent time working on real-time systems, design systems, and
          static site infrastructure. I enjoy the kind of problem that requires
          you to understand both the constraints of the browser and the
          constraints of the server — and to make thoughtful tradeoffs between
          them. When something is slow, I want to know exactly why, and I tend
          to reach for profiling tools and architectural changes before adding
          more infrastructure.
        </p>
        <p>
          Outside of engineering work, I read widely — mostly history,
          philosophy of mind, and the occasional novel. I believe the best
          technical decisions are made by people who can think clearly beyond
          the technical domain, and I try to cultivate that in myself. If any
          of my writing resonates with you, feel free to reach out.
        </p>
      </div>
    </MotionSection>
    </div>
  );
}
