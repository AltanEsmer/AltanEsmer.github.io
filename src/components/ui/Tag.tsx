type TagProps = {
  children: React.ReactNode;
};

/** Quiet pill used for tech tags on cards and case studies. */
export default function Tag({ children }: TagProps) {
  return <span className="tag">{children}</span>;
}
