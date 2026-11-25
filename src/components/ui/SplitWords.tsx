import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

/**
 * Wraps every word of a heading in its own span so the words can rise into place one after another
 * (`.split-word` in globals.css). Elements such as <em> keep their tag; their words are split too.
 * Each word gets `--w`, its index, which the CSS turns into a stagger delay.
 */
export function SplitWords({ children, start = 0 }: { children: ReactNode; start?: number }) {
  let index = start;

  const split = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return (
          String(child)
            // Plain spaces only: a non-breaking space keeps its words together in one span.
            .split(/([ \t\n]+)/)
            .map((part, i) => {
              if (!part) return null;
              if (/^[ \t\n]+$/.test(part)) return part;
              const w = index++;
              return (
                <span key={`${w}-${i}`} className="split-word">
                  <span style={{ '--w': w } as CSSProperties}>{part}</span>
                </span>
              );
            })
        );
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
        return cloneElement(child as ReactElement<{ children?: ReactNode }>, {}, split(child.props.children));
      }
      return child;
    });

  return <>{split(children)}</>;
}
