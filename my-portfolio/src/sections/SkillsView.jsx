import { SKILLS } from "../data";
import { getIconPath } from "../utils";

const SkillItem = ({ skill }) => (
  <div className="flex flex-col items-center gap-2 shrink-0">
    <div className="flex items-center justify-center h-7 w-7 md:h-9 md:w-9">
      <img
        src={getIconPath(skill)}
        alt={skill}
        className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
    <span className="text-[9px] md:text-[11px] font-mono uppercase tracking-widest text-neutral-500 whitespace-nowrap">
      {skill}
    </span>
  </div>
);

const MarqueeRow = ({ items, reverse = false }) => {
  const animation = reverse
    ? "animate-loop-scroll-reverse"
    : "animate-loop-scroll";

  return (
    <div className="overflow-hidden select-none h-14 md:h-18">
      <div className={`flex w-max h-full items-center ${animation}`}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-6 md:gap-12 pr-6 md:pr-12 h-full"
            aria-hidden={copy === 1}
          >
            {items.map((skill, i) => (
              <SkillItem key={`${copy}-${i}`} skill={skill} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsView = () => {
  const mid = Math.ceil(SKILLS.length / 2);

  return (
    <div className="overflow-hidden">
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="section-heading mb-2">
          Tech Stack<span className="text-accent-cool">.</span>
        </h2>
        <p className="text-sm text-neutral-500">
          Technologies I use to build software.
        </p>
      </div>

      <div className="relative w-full py-4 group marquee-mask">
        <div className="flex flex-col gap-6 md:gap-8">
          <MarqueeRow items={SKILLS.slice(0, mid)} />
          <MarqueeRow items={SKILLS.slice(mid)} reverse />
        </div>
      </div>
    </div>
  );
};

export default SkillsView;
