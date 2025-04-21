import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Book } from "../type";
import { toast } from "sonner";

export default function BookCard({
  title,
  author_name = [],
  first_publish_year,
  edition_count,
  language = [],
  cover_i,
}: Book) {
  const [open, setOpen] = useState(false);

  const imageUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "";

  return (
    <Card className="group h-full shadow-md hover:shadow-lg transition-shadow p-4 rounded-2xl flex flex-col justify-between">
      <div className="space-y-4">
        {/* Book Cover */}
        <div className="relative w-full h-60 bg-muted rounded-lg overflow-hidden">
          {cover_i && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Book Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>

          {author_name.length > 0 && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {author_name.join(", ")}
            </p>
          )}

          {first_publish_year && (
            <p className="text-sm text-muted-foreground">
              First published: {first_publish_year}
            </p>
          )}

          {edition_count && (
            <p className="text-sm text-muted-foreground">
              Edition: {edition_count}
            </p>
          )}

          {language.length > 0 && (
            <div className="flex flex-wrap gap-1 text-sm">
              <strong>Languages:</strong>
              {language.map((lang, index) => (
                <span key={index} className="text-muted-foreground">
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* More Details */}
      <div className="pt-4">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() =>
            toast("Details is not mandatory", {
              description: "This feature will come later",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
