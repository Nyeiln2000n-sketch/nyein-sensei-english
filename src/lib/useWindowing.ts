import { useCallback, useEffect, useRef, useState } from "react";

export interface WindowingResult<T> {
  /** Items currently rendered — grow this via loadMore(). */
  visible: T[];
  /** True when more items remain to be loaded. */
  hasMore: boolean;
  /** Append the next page to `visible`. */
  loadMore: () => void;
  /** Attach to an empty <div> at the end of the list for infinite scroll. */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

const DEFAULT_PAGE_SIZE = 60;

/**
 * Dependency-free list windowing for long lists (e.g. the ~600-word library).
 *
 * Renders only the first `pageSize` items, then grows by one page at a time —
 * either manually via `loadMore()` or automatically when `sentinelRef`
 * (an empty div at the list end) scrolls into view via IntersectionObserver.
 *
 * The rendered set resets to the first page whenever the `items` array
 * identity changes (new search, new filter, new data load).
 *
 * Required by AUDIO_CONTRACT.md for any list with more than 50 items —
 * rendering hundreds of rows at once (especially with backdrop-filter cards)
 * gets the WebContent process killed on iOS.
 */
export function useWindowing<T>(
  items: T[],
  pageSize: number = DEFAULT_PAGE_SIZE,
): WindowingResult<T> {
  const [page, setPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset to the first page whenever the items array identity changes.
  useEffect(() => {
    setPage(1);
  }, [items]);

  const loadMore = useCallback(() => {
    setPage((p) => (p * pageSize < items.length ? p + 1 : p));
  }, [items.length, pageSize]);

  // Infinite scroll: load the next page when the sentinel enters the viewport.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore, items]);

  const end = page * pageSize;
  return {
    visible: items.slice(0, end),
    hasMore: end < items.length,
    loadMore,
    sentinelRef,
  };
}
