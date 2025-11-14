import { NextResponse } from "next/server";
import { StreamDeckConfig } from "@/lib/types";

export async function GET() {
  const exampleConfig: StreamDeckConfig = {
    pages: [
      {
        id: "page-1",
        name: "AI",
        buttons: [],
      },
    ],
  };

  return NextResponse.json(exampleConfig);
}
