"use client";

import { useState } from "react";
import { StreamDeckConfig, ButtonConfig, PageConfig } from "@/lib/types";
import GridButton from "@/components/GridButton";
import PagesList from "@/components/PagesList";
import ButtonEditor from "@/components/ButtonEditor";

export default function Home() {
  const [config, setConfig] = useState<StreamDeckConfig>({
    pages: [
      {
        id: "page-1",
        name: "AI",
        buttons: [],
      },
    ],
  });

  const [activePage, setActivePage] = useState("page-1");
  const [selectedButton, setSelectedButton] = useState<ButtonConfig | null>(null);

  const currentPage = config.pages.find((p) => p.id === activePage);

  const getButton = (row: number, col: number): ButtonConfig | null => {
    return currentPage?.buttons.find((b) => b.row === row && b.col === col) || null;
  };

  const handleCellClick = (row: number, col: number) => {
    const button = getButton(row, col);
    
    if (button) {
      setSelectedButton(button);
    } else {
      const label = prompt("Nome del tasto:");
      if (label) {
        const newButton: ButtonConfig = {
          id: `btn-${Date.now()}`,
          row,
          col,
          label,
          actionType: "open_url",
          url: "",
        };
        
        setConfig((prev) => ({
          ...prev,
          pages: prev.pages.map((page) =>
            page.id === activePage
              ? { ...page, buttons: [...page.buttons, newButton] }
              : page
          ),
        }));
      }
    }
  };

  const handleSaveButton = (updatedButton: ButtonConfig) => {
    setConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === activePage
          ? {
              ...page,
              buttons: page.buttons.map((btn) =>
                btn.id === updatedButton.id ? updatedButton : btn
              ),
            }
          : page
      ),
    }));
    setSelectedButton(null);
  };

  const handleDeleteButton = () => {
    if (selectedButton) {
      setConfig((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id === activePage
            ? {
                ...page,
                buttons: page.buttons.filter((btn) => btn.id !== selectedButton.id),
              }
            : page
        ),
      }));
      setSelectedButton(null);
    }
  };

  const handleNewPage = () => {
    const name = prompt("Nome della nuova pagina:");
    if (name) {
      const newPage: PageConfig = {
        id: `page-${Date.now()}`,
        name,
        buttons: [],
      };
      setConfig((prev) => ({
        ...prev,
        pages: [...prev.pages, newPage],
      }));
      setActivePage(newPage.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <PagesList
        pages={config.pages}
        activePage={activePage}
        onSelectPage={setActivePage}
        onNewPage={handleNewPage}
      />

      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="grid grid-cols-5 gap-4 max-w-4xl">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <GridButton
                key={`${row}-${col}`}
                button={getButton(row, col)}
                onClick={() => handleCellClick(row, col)}
              />
            ))
          )}
        </div>
      </div>

      <ButtonEditor
        button={selectedButton}
        onSave={handleSaveButton}
        onDelete={handleDeleteButton}
        onClose={() => setSelectedButton(null)}
      />
    </div>
  );
}
