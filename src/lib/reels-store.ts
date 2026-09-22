import path from "path";
import fs from "fs/promises";
import os from "os";

export interface StoredReel {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string | null;
  description?: string;
  likes?: string | null;
  dateAdded: string;
}

const DEFAULT_REELS: StoredReel[] = [
  {
    id: "reel-Dac25Xkyz8j",
    url: "https://www.instagram.com/reel/Dac25Xkyz8j/?igsh=ZXo0ZTM0emMzOG95",
    dateAdded: "September 15, 2026",
  },
  {
    id: "reel-DbijxwOygyC",
    url: "https://www.instagram.com/reel/DbijxwOygyC/?igsh=MWM1Z2dzaDNkem5kYg==",
    dateAdded: "September 15, 2026",
  },
  {
    id: "reel-DbCT_UQJMhu",
    url: "https://www.instagram.com/reel/DbCT_UQJMhu/?igsh=ZnRwcTJmaTN5c3lp",
    dateAdded: "September 15, 2026",
  },
  {
    id: "reel-Dap6kreCFY8",
    url: "https://www.instagram.com/reel/Dap6kreCFY8/?igsh=eXRkMWQxdGp6a3Ri",
    dateAdded: "September 16, 2026",
  },
  {
    id: "reel-DbQp5ywTcvm",
    url: "https://www.instagram.com/reel/DbQp5ywTcvm/?igsh=MXI2c256bGRnY2lreQ==",
    dateAdded: "September 16, 2026",
  },
  {
    id: "reel-DaVa9HfTvRj",
    url: "https://www.instagram.com/reel/DaVa9HfTvRj/?igsh=MXAwbjE3d2RxbWhvMQ==",
    dateAdded: "September 16, 2026",
  },
  {
    id: "reel-DblFc2yP8Fx",
    url: "https://www.instagram.com/reel/DblFc2yP8Fx/?igsh=MXcweDAzMzF4enp5ZQ==",
    dateAdded: "September 17, 2026",
  },
  {
    id: "reel-DYwylHRlP7h",
    url: "https://www.instagram.com/reel/DYwylHRlP7h/?igsh=bnNoNjViZXY1dDE5",
    dateAdded: "September 17, 2026",
  },
  {
    id: "reel-DY8fboigCN1",
    url: "https://www.instagram.com/reel/DY8fboigCN1/?igsh=MXFpcncyNHIzMXVkaQ==",
    dateAdded: "September 17, 2026",
  },
  {
    id: "reel-DczpolWRmZE",
    url: "https://www.instagram.com/reel/DczpolWRmZE/?stkn=MWJ6bGdjdWEweWphYw==",
    dateAdded: "September 21, 2026",
  },
  {
    id: "reel-DdOdpdJxQDE",
    url: "https://www.instagram.com/reel/DdOdpdJxQDE/?stkn=ZnVlZTluenZnOXln",
    dateAdded: "September 21, 2026",
  },
  {
    id: "reel-DcKgv2tzVut",
    url: "https://www.instagram.com/reel/DcKgv2tzVut/?stkn=NnB2cHhva2drdHU1",
    dateAdded: "September 21, 2026",
  },
  {
    id: "reel-Dc05Uaxz7BJ",
    url: "https://www.instagram.com/reel/Dc05Uaxz7BJ/?stkn=c3Rscml3djUxcWEw",
    dateAdded: "September 21, 2026",
  },
];

const IS_PROD = process.env.NODE_ENV === "production";
const WRITE_FILE = IS_PROD
  ? path.join(os.tmpdir(), "click_aarambh_reels.json")
  : path.join(process.cwd(), "src", "data", "reels.json");

const SEED_FILE = path.join(process.cwd(), "src", "data", "reels.json");

/** Read all reels safely */
export async function getAllReels(): Promise<StoredReel[]> {
  // 1. In production, check writable temp store first
  if (IS_PROD) {
    try {
      const raw = await fs.readFile(WRITE_FILE, "utf-8");
      const parsed = JSON.parse(raw) as StoredReel[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // Temp file does not exist yet; fall through
    }
  }

  // 2. Read from committed seed file
  try {
    const raw = await fs.readFile(SEED_FILE, "utf-8");
    const parsed = JSON.parse(raw) as StoredReel[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // Fall back to default seed
  }

  return DEFAULT_REELS;
}

/** Write reels array safely */
async function writeStore(reels: StoredReel[]): Promise<void> {
  const json = JSON.stringify(reels, null, 2);
  try {
    await fs.mkdir(path.dirname(WRITE_FILE), { recursive: true });
  } catch {
    // Directory exists
  }

  if (IS_PROD) {
    await fs.writeFile(WRITE_FILE, json, "utf-8");
  } else {
    const tmp = WRITE_FILE + ".tmp";
    await fs.writeFile(tmp, json, "utf-8");
    await fs.rename(tmp, WRITE_FILE);
  }
}

/** Add a new reel */
export async function addReel(reel: StoredReel): Promise<StoredReel> {
  const current = await getAllReels();
  const updated = [reel, ...current.filter((r) => r.url !== reel.url && r.id !== reel.id)];
  await writeStore(updated);
  return reel;
}

/** Delete a reel by ID */
export async function deleteReel(id: string): Promise<boolean> {
  const current = await getAllReels();
  const next = current.filter((r) => r.id !== id);
  if (next.length === current.length) return false;
  await writeStore(next);
  return true;
}
