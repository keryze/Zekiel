export function PageIntro({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow mono">
        <span className="status-dot" />
        {eyebrow}
      </p>
      <div className="page-intro-row">
        <div>
          <h1>{title}</h1>
          <p className="intro-description">{description}</p>
        </div>
        {aside && <span className="intro-aside mono">{aside}</span>}
      </div>
    </div>
  );
}
export function SampleNotice({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="sample-notice" aria-label="Sample content">
      <span className="sample-tag mono">SAMPLE CONTENT</span>
      <p>
        {children ||
          'Entries marked SAMPLE demonstrate the structure of this site. They are not claims of completed personal work.'}
      </p>
    </aside>
  );
}
