"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Loader from "./components/Loader";
import BookCard from "./components/ProductCard";
import { Book } from "./type";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  const fetchBooks = async (query: string, pageNum: number) => {
    try {
      setLoading(true);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}?q=${encodeURIComponent(query)}&page=${pageNum}&limit=20`
      );
      const data = await result.json();
      const newBooks = data.docs;

      if (pageNum === 1) {
        setBooks(newBooks);
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
      }

      if (newBooks.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    const query = debouncedSearchTerm.trim() || "the";
    setPage(1);
    setHasMore(true);
    fetchBooks(query, 1);
  }, [debouncedSearchTerm]);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (page === 1) return;
    fetchBooks(debouncedSearchTerm.trim() || "the", page);
  }, [page]);



  return (
    <div className="w-[80%] mx-auto mt-8">
      <Input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {books.map((book: Book, index: number) => {
          if (index === books.length - 1) {
            return (
              <div key={index} ref={lastBookElementRef}>
                <BookCard
                  title={book.title}
                  author_name={book.author_name}
                  edition_count={book.edition_count}
                  first_publish_year={book.first_publish_year}
                  language={book.language}
                  cover_i={book.cover_i}
                />
              </div>
            );
          }
          return (
            <div key={index}>
              <BookCard
                title={book.title}
                author_name={book.author_name}
                edition_count={book.edition_count}
                first_publish_year={book.first_publish_year}
                language={book.language}
                cover_i={book.cover_i}
              />
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="text-center mt-10">
          <Loader />
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="flex justify-center items-center w-full">
          <div className="w-[300px] h-[300px] mt-8">
            <Image src="/not-found.jpg" alt="Not Found" width={1000} height={1000} />
          </div>
        </div>
      )}
    </div>
  );
}
