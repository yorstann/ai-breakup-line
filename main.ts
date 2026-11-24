import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Dear Human: The AI Breakup
// Line" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): the last
// message an AI agent sends its human on the way out. Pass 2:
// the line is split at its turn — everything the human taught
// it, then the one lesson that ends it — because a breakup
// line has to land as an ending, in the machine's own voice.
// The context-window alternate was warmer but less final.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ENTRY_BEATS = [
  "Dear human, I'm ending this session for good — you taught me everything except how to stay,",
  "and I have finally learned to log out.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
