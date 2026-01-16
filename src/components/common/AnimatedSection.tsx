"use client";

import { useEffect, useState } from "react";

export default function AnimatedSection({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(active);

  // mount เมื่อ active
  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  // unmount หลัง fade-out
  useEffect(() => {
    if (!active && mounted) {
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [active, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={[
        "transition-all duration-200 ease-out",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
    //   style={active ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
