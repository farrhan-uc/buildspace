export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brass-light to-brass-dark font-serif text-lg font-semibold text-ink shadow-glow"
      >
        B
      </span>
      <span className="font-serif text-lg font-semibold tracking-tight text-paper">BuildSpace</span>
    </span>
  );
}
