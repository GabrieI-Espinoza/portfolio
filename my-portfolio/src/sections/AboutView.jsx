import { ABOUT, EDUCATION } from "../data";

const AboutView = () => (
  <div>
    <h2 className="section-heading mb-6 md:mb-8">
      About Me<span className="text-accent-cool">.</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      {/* Bio */}
      <div>
        <p className="text-base text-neutral-600 leading-relaxed mb-3">
          {ABOUT.bio}
        </p>
        <p className="text-sm text-neutral-500">
          Current focus —{" "}
          <span className="text-neutral-700">
            Full-Stack Development, AI/ML, and Cloud Technologies
          </span>
        </p>
      </div>

      {/* Education timeline */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-4">
          Education
        </h3>

        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className={`py-3 ${i < EDUCATION.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-sm font-medium text-neutral-900">
                {edu.school}
              </h4>
              <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                {edu.period}
              </span>
            </div>
            <p className="text-sm text-neutral-600 mt-0.5">{edu.degree}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutView;
