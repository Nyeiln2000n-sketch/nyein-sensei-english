// Skeleton — shimmer placeholders for list loading states (Lessons, Vocab).
// Pure CSS shimmer (transform-only sweep); no backdrop-filter per
// AUDIO_CONTRACT.md. Myanmar copy is unaffected (aria-hidden decorative).

interface SkeletonListProps {
  rows?: number;
}

export function SkeletonList({ rows = 8 }: SkeletonListProps) {
  return (
    <div className="skeleton-list" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <div className="skeleton-row" key={i}>
          <span className="skeleton skeleton-circle" />
          <span className="skeleton-lines">
            <span
              className="skeleton skeleton-line"
              style={{ width: `${62 + ((i * 13) % 22)}%` }}
            />
            <span className="skeleton skeleton-line short" />
          </span>
        </div>
      ))}
    </div>
  );
}
