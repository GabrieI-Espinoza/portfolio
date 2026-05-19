import { PROJECTS } from "../data";
import { getIconPath } from "../utils";

const ProjectCard = ({ project }) => {
  const Wrapper = project.github ? "a" : "div";
  const linkProps = project.github
    ? { href: project.github, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group block p-5 rounded-lg border border-border hover:border-neutral-300 bg-surface transition-all duration-200"
    >
      {/* Title + GitHub icon */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-neutral-900">
          {project.title}
        </h3>
        {project.github && (
          <img
            src="/icons/github.svg"
            alt="GitHub"
            className="w-4 h-4 opacity-40 group-hover:opacity-80 transition-opacity shrink-0 mt-0.5"
          />
        )}
      </div>

      {/* Optional note (private repo disclaimer) */}
      {project.note && (
        <p className="text-[11px] text-neutral-400 italic mb-3">
          {project.note}
        </p>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {project.techStack.map((tech) => (
          <div key={tech} className="flex items-center gap-1">
            <img
              src={getIconPath(tech)}
              alt={tech}
              className="w-3 h-3 object-contain opacity-70"
            />
            <span className="text-[11px] text-neutral-500">{tech}</span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const ProjectsView = () => (
  <div>
    <h2 className="section-heading mb-6 md:mb-8">
      Projects<span className="text-accent-warm">.</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

export default ProjectsView;
