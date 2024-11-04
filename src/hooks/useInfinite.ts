import {useCallback, useMemo, useRef} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";

type Options = {
  queryFn: any
}

export function useInfinite<T>(options: Options) {
  const {queryFn} = options;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  } = useInfiniteQuery({
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.currentPage + 1 : null
  })

  const list = useMemo(() => {
    if (!data?.pages) return [];
    return data?.pages?.reduce((result, group) => ([...result, ...group.actions]), [])
  }, [data]) as T;

  const observer = useRef<IntersectionObserver>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  return {list, lastElementRef, isPending, isError}
}