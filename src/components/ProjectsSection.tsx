"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Neural Canvas",
    description:
      "A real-time generative art platform powered by WebGL and machine learning. Creates infinite unique visual experiences.",
    tags: ["WebGL", "TensorFlow.js", "React", "TypeScript"],
    gradient: "from-accent-blue to-accent-purple",
    span: "lg:col-span-2 lg:row-span-2",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Rustly",
    description:
      "A blazing-fast CLI tool for managing dev environments, written in Rust.",
    tags: ["Rust", "CLI", "DevOps"],
    gradient: "from-accent-purple to-highlight",
    span: "lg:col-span-1",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Spatial Notes",
    description:
      "3D note-taking app with spatial memory anchors using AR on the web.",
    tags: ["Three.js", "WebXR", "React"],
    gradient: "from-accent-teal to-accent-blue",
    span: "lg:col-span-1",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Dataflow",
    description:
      "Visual programming environment for data pipelines with drag-and-drop node graph editor.",
    tags: ["React Flow", "GraphQL", "Python"],
    gradient: "from-highlight to-accent-purple",
    span: "lg:col-span-2",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Waveform",
    description:
      "Web audio visualizer with custom DSP filters and real-time FFT rendering.",
    tags: ["Web Audio API", "Canvas", "TypeScript"],
    gradient: "from-accent-blue to-accent-teal",
    span: "lg:col-span-1",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Portfolio v4",
    description: "This very site — built with Next.js, R3F, and a lot of love.",
    tags: ["Next.js", "R3F", "Framer Motion"],
    gradient: "from-accent-purple to-accent-teal",
    span: "lg:col-span-1",
    link: "#",
    github: "#",
    featured: false,
  },
];

const gradientBorderMap: Record<string, string> = {
  "from-accent-blue to-accent-purple":
    "linear-gradient(to right, #3B82F6, #8B5CF6)",
  "from-accent-purple to-highlight":
    "linear-gradient(to right, #8B5CF6, #EC4899)",
  "from-accent-teal to-accent-blue":
    "linear-gradient(to right, #14B8A6, #3B82F6)",
  "from-highlight to-accent-purple":
    "linear-gradient(to right, #EC4899, #8B5CF6)",
  "from-accent-blue to-accent-teal":
    "linear-gradient(to right, #3B82F6, #14B8A6)",
  "from-accent-purple to-accent-teal":
    "linear-gradient(to right, #8B5CF6, #14B8A6)",
};

const gradientDotMap: Record<string, string> = {
  "from-accent-blue to-accent-purple": "from-[#3B82F6] to-[#8B5CF6]",
  "from-accent-purple to-highlight": "from-[#8B5CF6] to-[#EC4899]",
  "from-accent-teal to-accent-blue": "from-[#14B8A6] to-[#3B82F6]",
  "from-highlight to-accent-purple": "from-[#EC4899] to-[#8B5CF6]",
  "from-accent-blue to-accent-teal": "from-[#3B82F6] to-[#14B8A6]",
  "from-accent-purple to-accent-teal": "from-[#8B5CF6] to-[#14B8A6]",
};

export default function ProjectsSection() {
  return (
    <section className="section-padding w-full">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="gradient-text mb-2 font-sans text-4xl font-bold md:text-5xl">
            Projects
          </h2>
          <p className="font-sans text-lg text-port-text/60">
            Things I&apos;ve built
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const borderGradient = gradientBorderMap[project.gradient] ?? "";
  const dotGradient = gradientDotMap[project.gradient] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-lg ${project.span}`}
      style={
        {
          "--border-gradient": borderGradient,
        } as React.CSSProperties
      }
    >
      {/* Gradient top border */}
      <div
        className="absolute inset-x-0 top-0 h-[4px] rounded-t-2xl"
        style={{ background: borderGradient }}
      />

      {/* Hover gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-5"
        style={{ background: borderGradient }}
      />

      {/* Card content */}
      <div
        className={`flex flex-1 flex-col gap-4 p-6 ${project.featured ? "pt-8" : "pt-7"}`}
      >
        {/* Gradient dot badge */}
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full bg-gradient-to-r ${dotGradient}`}
          />
        </div>

        {/* Title */}
        <h3
          className={`font-sans font-bold text-port-text ${project.featured ? "text-2xl" : "text-lg"}`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className={`font-sans text-port-text/70 ${project.featured ? "flex-1 text-base leading-relaxed" : "text-sm leading-relaxed"}`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-accent-teal/30 px-2 py-0.5 font-mono text-xs text-accent-teal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <a
            href={project.link}
            aria-label={`View ${project.title} live`}
            className="text-port-text/50 transition-colors duration-200 hover:text-accent-blue"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.github}
            aria-label={`View ${project.title} on GitHub`}
            className="text-port-text/50 transition-colors duration-200 hover:text-accent-purple"
          >
            <GitFork size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
