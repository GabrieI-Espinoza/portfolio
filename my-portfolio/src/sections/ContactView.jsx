import { CONTACT } from "../data";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.332 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const ResumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const ContactLink = ({ icon, label, sub, href, external }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className="group flex items-center gap-4 py-3 hover:opacity-80 transition-opacity"
  >
    <div className="text-neutral-400 group-hover:text-neutral-600 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-neutral-900">{label}</h3>
      {sub && <p className="text-xs text-neutral-500">{sub}</p>}
    </div>
  </a>
);

const ContactView = () => (
  <div>
    <h2 className="section-heading mb-3">
      Get in Touch<span className="text-accent-warm">.</span>
    </h2>
    <p className="text-sm text-neutral-500 mb-8">
      Currently open to new opportunities. Feel free to reach out.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 max-w-2xl">
      <ContactLink
        icon={<MailIcon />}
        label="Email"
        sub={CONTACT.links.email}
        href={`mailto:${CONTACT.links.email}`}
      />
      <ContactLink
        icon={<ResumeIcon />}
        label="Resume"
        sub="View / Download"
        href="/resume.pdf"
        external
      />
      <ContactLink
        icon={
          <img
            src="/icons/github.svg"
            alt="GitHub"
            className="w-5 h-5 opacity-80"
          />
        }
        label="GitHub"
        href={CONTACT.links.github}
        external
      />
      <ContactLink
        icon={
          <img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            className="w-5 h-5 opacity-80"
          />
        }
        label="LinkedIn"
        href={CONTACT.links.linkedin}
        external
      />
    </div>

    <p className="mt-8 text-xs text-neutral-500">Based in Fairfax, VA</p>
  </div>
);

export default ContactView;
