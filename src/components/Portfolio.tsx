import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { projects, upcomingProjects, type Project } from "@/data/portfolio";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { LightStreaks } from "@/components/ui/LightStreaks";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tagClass = "rounded-md bg-glow/10 px-2 py-0.5 text-[0.7rem] sm:px-2.5 sm:py-1 sm:text-xs text-slate-200 ring-1 ring-glow/30";

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
      {tags.map((tag) => (
        <li key={tag} className={tagClass}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-card group flex w-full flex-col overflow-hidden rounded-2xl">
      <div className="relative flex h-36 items-center sm:h-44 lg:h-48 justify-center overflow-hidden border-b border-slate-border/50 bg-gradient-to-br from-midnight via-royal/60 to-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Captura del sitio ${project.name}`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Code2 className="size-10 text-glow transition group-hover:scale-110" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
        <h3 className="text-base font-bold text-white sm:text-lg">{project.name}</h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">{project.description}</p>
        <TagList tags={project.tags} />
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-peach sm:mt-6 sm:text-sm transition hover:text-peach/75"
          >
            Visitar sitio
            <ExternalLink className="size-4" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        )}
      </div>
    </article>
  );
}

function UpcomingCard({ project }: { project: Project }) {
  return (
    <article className="glass-card group flex flex-col overflow-hidden rounded-2xl sm:flex-row sm:items-center">
      {project.illustration && (
        <div className="relative h-32 shrink-0 sm:h-40 sm:w-48 lg:w-56">
          <Image
            src={project.illustration}
            alt=""
            fill
            sizes="(min-width: 1024px) 14rem, (min-width: 640px) 12rem, 100vw"
            className="fade-edges object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 p-4 pt-0 sm:py-6 sm:pl-2 sm:pr-6">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-bold text-white sm:text-lg">{project.name}</h4>
          <span className="shrink-0 rounded-full bg-mauve/20 px-2.5 py-1 text-xs font-semibold text-[#d9a9c0] ring-1 ring-mauve">
            En desarrollo
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-2 sm:text-sm">{project.description}</p>
        <TagList tags={project.tags} />
      </div>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="portafolio" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <LightStreaks position="bottom-right" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portafolio"
          title="Casos de éxito"
          description="Proyectos reales construidos a la medida, desde e-commerce hasta plataformas en tiempo real."
        />
        <PortfolioCarousel>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </PortfolioCarousel>

        <div className="mt-16 lg:mt-24">
          <h3 className="mb-6 flex flex-wrap items-center gap-3 text-xl font-bold text-white sm:mb-8 sm:text-2xl">
            Próximos Lanzamientos
            <span className="rounded-full bg-mauve/20 px-3 py-1 text-xs font-semibold text-[#d9a9c0] ring-1 ring-mauve">
              En Desarrollo
            </span>
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {upcomingProjects.map((project) => (
              <UpcomingCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
