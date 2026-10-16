import Image from "next/image";
import { Code2, ExternalLink, Rocket } from "lucide-react";
import { projects, upcomingProjects, type Project } from "@/data/portfolio";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ProjectCard({ project, upcoming = false }: { project: Project; upcoming?: boolean }) {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-border bg-surface transition hover:border-neon-blue">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-midnight via-royal/60 to-surface">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Captura del sitio ${project.name}`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : upcoming ? (
          <Rocket className="size-10 text-mauve transition group-hover:scale-110" />
        ) : (
          <Code2 className="size-10 text-neon-blue transition group-hover:scale-110" />
        )}
        {upcoming && (
          <span className="absolute right-3 top-3 rounded-full bg-mauve px-2.5 py-1 text-xs font-semibold text-white">
            En desarrollo
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-white">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-slate-400">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-royal px-2 py-1 text-xs text-slate-200">
              {tag}
            </li>
          ))}
        </ul>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-peach transition hover:text-peach/75"
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

export function Portfolio() {
  return (
    <section id="portafolio" className="bg-gradient-to-b from-obsidian to-midnight/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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

        <div className="mt-16">
          <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
            Próximos Lanzamientos
            <span className="rounded-full bg-mauve/20 px-3 py-1 text-xs font-semibold text-mauve ring-1 ring-mauve">
              En Desarrollo
            </span>
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {upcomingProjects.map((project) => (
              <ProjectCard key={project.name} project={project} upcoming />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
