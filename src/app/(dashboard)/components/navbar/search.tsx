"use client";

import { Button } from "@/components/ui/button";
import Thumbnail from "@/components/ui/thumbnail";
import { getFiles } from "@/lib/actions/files.actions";
import {
  cn,
  convertFileSize,
  formatDateTime,
  getFileExtension,
  getFileType,
} from "@/lib/utils";
import { Loader2, SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState, useRef } from "react";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const path = usePathname();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const delayDebounceFn = setTimeout(async () => {
      if (!query.trim()) {
        if (isMounted) {
          setResults([]);
        }
        return;
      }

      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }
        const files = await getFiles({ searchText: query.trim(), limit: 5 });
        if (isMounted) {
          setResults(files.documents);
        }
      } catch (err) {
        if (isMounted) {
          setError("Ошибка при загрузке файлов");
          console.error("Search error:", err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounceFn);
    };
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
      setResults([]);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("query", query.trim());
    router.push(`${path}?${params.toString()}`);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.push(`${path}?${params.toString()}`);
  };

  const handleClickItem = (file: Models.Document) => {
    setResults([]);
    router.push(`/dashboard/${getFileType(file.name)}`);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-80 flex gap-1 items-center border border-border hover:border-primary rounded-2xl pr-1 pl-4 h-10 transition-colors"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поищите..."
          className="!bg-transparent active:bg-transparent outline-none flex-1"
          aria-label="Поиск файлов"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            className="size-8"
            onClick={handleClear}
            aria-label="Очистить поиск"
          >
            <X size={16} />
          </Button>
        )}
        <Button
          type="submit"
          className="size-8 rose-shadow"
          aria-label="Выполнить поиск"
          onClick={handleSubmit}
        >
          <SearchIcon size={16} />
        </Button>
      </form>

      {query.trim() && (
        <ul className="w-80 absolute bg-card rounded-sm p-4 border border-border mt-1 shadow-lg z-50">
          {error ? (
            <li className="p-2 text-destructive">{error}</li>
          ) : isLoading ? (
            <div className="flex justify-center h-10">
              <Loader2 className="animate-spin self-center" />
            </div>
          ) : results.length > 0 ? (
            results.map((file) => (
              <li
                key={file.$id}
                onClick={() => isLoading || handleClickItem(file)}
                className={cn(
                  "flex gap-1 items-center p-2 rounded-sm transition-colors select-none",
                  isLoading
                    ? "cursor-not-allowed"
                    : "cursor-pointer active:bg-secondary/50 hover:bg-secondary"
                )}
              >
                <Thumbnail
                  type={getFileType(file.name)}
                  extension={getFileExtension(file.name)}
                  url={file.url}
                  size={100}
                  className="size-8"
                  iconClassName={cn(isLoading && "text-muted-foreground")}
                  imageClassName={cn("rounded-sm")}
                />
                <div
                  className={cn(
                    "flex flex-col w-52",
                    isLoading && "text-muted-foreground"
                  )}
                >
                  <p className="truncate">{file.name}</p>
                  <div
                    className={cn(
                      "flex gap-2 text-muted-foreground text-xs",
                      isLoading && "text-muted-foreground/50"
                    )}
                  >
                    <p>{convertFileSize(file.size)}</p>
                    <p>{formatDateTime(file.$updatedAt)}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-2 text-muted-foreground text-center h-10">Ничего не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
