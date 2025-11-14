"use client";

import { ButtonConfig } from "@/lib/types";

interface GridButtonProps {
  button: ButtonConfig | null;
  onClick: () => void;
}

export default function GridButton({ button, onClick }: GridButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-24 rounded-lg border-2 transition-all hover:scale-105 ${
        button
          ? "bg-blue-600 border-blue-500 text-white font-semibold"
          : "bg-gray-800 border-gray-700 text-gray-500"
      }`}
    >
      {button ? button.label : "+"}
    </button>
  );
}
