type KickerProps = {
  children: React.ReactNode;
};

/** Small uppercase amber section label. */
export default function Kicker({ children }: KickerProps) {
  return <div className="kicker">{children}</div>;
}
