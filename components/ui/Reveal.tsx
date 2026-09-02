"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-triggered fade-and-rise.
 *
 * Wraps its children in an element carrying `data-reveal`. app/globals.css
 * hides that element and transitions it back in once `data-visible="true"`
 * appears, which this component sets the first time the element crosses into
 * the viewport.
 *
 * Three things are deliberate:
 *
 *  - The hidden start state is CSS-scoped to `[data-js]` on <html>, set by an
 *    inline script in the layout. With scripting off, nothing is ever hidden.
 *  - Each observer disconnects after the first intersection. Nothing animates
 *    out again on scroll-up, and no observer stays live for the session.
 *  - `prefers-reduced-motion` is handled entirely in CSS, so this component
 *    behaves identically either way and there is no media query in JS to
 *    fall out of sync.
 *
 * `delay` staggers siblings. Keep it under ~200ms total across a group: past
 * that the last card is still arriving after the eye has moved on.
 */
type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds, applied as a CSS transition-delay. */
  delay?: number;
  /** Element to render. Use "li" inside lists so the markup stays valid. */
  as?: Extract<ElementType, "div" | "li" | "section" | "article" | "header">;
  className?: string;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Older browsers without IntersectionObserver get the content immediately
       rather than a permanently invisible page. */
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      /* Fires once ~12% of the element is on screen, with the viewport's
         bottom edge pulled up 8% so things don't animate while still
         effectively off-screen on tall monitors. */
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- polymorphic ref
      ref={ref as any}
      data-reveal=""
      data-visible={visible ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
