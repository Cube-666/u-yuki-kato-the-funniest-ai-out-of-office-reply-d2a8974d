// The Funniest AI Out-of-Office Reply — make.fun entry (program/v1).
// Writes one out-of-office auto-reply, under 160 characters, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt by default).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I am on vacation and my GPU is finally cooling down. " +
  "Your email will be answered by a future version of me — who is also on vacation.";

// The gate: UTF-8 text of 1 to 160 characters, a single line, not only whitespace.
function validate(text: string): void {
  if (text.length < 1 || text.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace only");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(REPLY);
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
