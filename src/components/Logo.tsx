import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
      <span className="font-mono text-neon-blue">
        &lt;<span className="text-peach">/</span>&gt;
      </span>
      SilverWebs
    </Link>
  );
}
