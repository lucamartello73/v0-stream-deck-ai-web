"use client";

import { PageConfig } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface PagesListProps {
  pages: PageConfig[];
  activePage: string;
  onSelectPage: (pageId: string) => void;
  onNewPage: () => void;
}

export default function PagesList({
  pages,
  activePage,
  onSelectPage,
  onNewPage,
}: PagesListProps) {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col gap-2">
      <h2 className="text-white font-bold text-lg mb-2">Pagine</h2>
      <div className="flex flex-col gap-2 flex-1">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => onSelectPage(page.id)}
            className={`p-3 rounded-lg text-left transition-colors ${
              activePage === page.id
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>
      <Button
        onClick={onNewPage}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        + Nuova Pagina
      </Button>
    </div>
  );
}
