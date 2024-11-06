import {useCallback, useMemo, useRef} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";

type Options = {
  queryKey: string[];
  queryFn: any;
}

export function useInfinite<T>(options: Options) {
  const {queryFn, queryKey} = options;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.hasMore ? lastPage.currentPage + 1 : null
  })

  const list = useMemo(() => {
    if (!data?.pages) return [];
    return data?.pages?.reduce((result, group) => ([...result, ...group.items]), [])
  }, [data]) as T;

  const observer = useRef<IntersectionObserver | null>(null);
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