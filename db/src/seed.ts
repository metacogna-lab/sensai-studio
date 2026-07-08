import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { db, pool } from "./db.js";
import { projects } from "./schema/projects.js";
import { eq } from "drizzle-orm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const registryPath = join(__dirname, "../../config/project-registry.md");

interface ProjectEntry {
  project_slug: string;
  project_type: string;
  owner: string;
  status: string;
  allowed_paths?: string[];
  loader_file?: string | null;
  notes?: string;
}

function parseYamlBlock(text: string): ProjectEntry | null {
  const slug = text.match(/project_slug:\s*(\S+)/);
  const type = text.match(/project_type:\s*(\S+)/);
  const owner = text.match(/owner:\s*(\S+)/);
  const status = text.match(/status:\s*(\S+)/);
  const loader = text.match(/loader_file:\s*(\S+)/);
  const inBlock = text.includes("allowed_paths:");
  if (!slug || !type || !owner || !status) return null;

  // Extract allowed_paths from yaml list
  const pathMatches = [...text.matchAll(/-\s+(\S+)/g)].map((m) => m[1]);
  const notesMatch = text.match(/notes:\s*>\s*\n\s+(.+?)(?=\n###|\n---|$)/s);

  return {
    project_slug: slug[1],
    project_type: type[1],
    owner: owner[1],
    status: status[1],
    allowed_paths: inBlock ? pathMatches : undefined,
    loader_file: loader && loader[1] !== "null" ? loader[1] : null,
    notes: notesMatch ? notesMatch[1].replace(/\n\s+/g, " ").trim() : undefined,
  };
}

async function seed() {
  console.log("Reading project registry...");
  const content = readFileSync(registryPath, "utf-8");

  // Split on "### " headings to find project blocks
  const blocks = content.split(/(?=^###\s)/m);

  let seeded = 0;
  for (const block of blocks) {
    const entry = parseYamlBlock(block);
    if (!entry || entry.project_slug === "Registering" || entry.project_slug.includes("<")) continue;

    const existing = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, entry.project_slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(projects)
        .set({
          type: entry.project_type,
          owner: entry.owner,
          status: entry.status,
          allowedPaths: entry.allowed_paths,
          loaderFile: entry.loader_file,
          notes: entry.notes,
          updatedAt: new Date(),
        })
        .where(eq(projects.slug, entry.project_slug));
      console.log(`  Updated: ${entry.project_slug}`);
    } else {
      await db.insert(projects).values({
        slug: entry.project_slug,
        type: entry.project_type,
        owner: entry.owner,
        status: entry.status,
        allowedPaths: entry.allowed_paths,
        loaderFile: entry.loader_file,
        notes: entry.notes,
      });
      console.log(`  Inserted: ${entry.project_slug}`);
    }
    seeded++;
  }

  console.log(`\nSeed complete. ${seeded} projects processed.`);
  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
