// The One-Line Cat Joke That Lands — entry program.
//
// Writes one short text to /output/entry.txt: a single-line joke about
// cats. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. It is a scene you can see in one read: the laptop goes
// off the desk, the cat takes the warm spot it leaves, and then the look
// — the cat staring at the human like the human is the intruder. The joke
// works because every cat owner has lived it, and the punchline is the
// reversal: the cat isn't the guest in your house, you are the guest in
// hers.
// Revision: an earlier draft had the cat running a background process
// called "waiting for you to open the good tuna" — dropped, because the
// tech metaphor is cute but abstract; the laptop line is a scene you can
// see, and the look is the punchline.
const ENTRY =
  "My cat knocked my laptop off the desk, sat in its warm spot, and looked at me like I was the one who didn't belong here.";

// Competition rules: under 200 characters, counted as Unicode code
// points, and not only white space. Enforce it here so a bad edit fails
// loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 199) {
  throw new Error(`entry must be 1-199 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
