import { redirect } from "next/navigation";
import { SEARCH_INDEX } from "../utils/searchIndex";


export default function SearchPage({ searchParams }) {
  const qRaw = (searchParams?.q || "").toString().trim();
  const q = qRaw.toLowerCase();
  
  // if no query, keep your existing minimal UI
  if (!q) {
    return (
      <main className="min-h-screen bg-[#121212] text-white pt-28 px-6">
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="mt-2 text-gray-400">No search query entered.</p>
      </main>
    );
  }

  // score matches quickly against your index
  const scored = [];
  for (let i = 0; i < SEARCH_INDEX.length; i++) {
    const e = SEARCH_INDEX[i];
    const aliases = (e.aliases || []).map(a => a.toLowerCase());
    let s = 0;

    for (const a of aliases) {
      if (a === q) s = Math.max(s, 100);
      else if (a.startsWith(q)) s = Math.max(s, 80);
      else if (a.includes(q)) s = Math.max(s, 60);
    }

    const token = e.path.split("/").filter(Boolean).pop()?.toLowerCase();
    if (token) {
      if (token === q) s = Math.max(s, 95);
      else if (token.startsWith(q)) s = Math.max(s, 75);
      else if (token.includes(q)) s = Math.max(s, 55);
    }

    if (s > 0) scored.push({ score: s, idx: i });
  }

  if (scored.length) {
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const eh = SEARCH_INDEX[a.idx].hash ? 1 : 0;
      const bh = SEARCH_INDEX[b.idx].hash ? 1 : 0;
      if (bh !== eh) return bh - eh;
      const al = (SEARCH_INDEX[a.idx].aliases?.[0] || "").length;
      const bl = (SEARCH_INDEX[b.idx].aliases?.[0] || "").length;
      return bl - al;
    });

    const best = SEARCH_INDEX[scored[0].idx];
    const target = `${best.path}${best.hash || ""}`;
    redirect(target); // instant navigation
  }

  // fallback if nothing matched
  return (
    <main className="min-h-screen bg-[#121212] text-white pt-28 px-6">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="mt-2 text-gray-300">
        You searched for: <span className="font-mono text-white">{qRaw}</span>
      </p>
      <p className="mt-4 text-gray-400">No matching page or section found.</p>
    </main>
  );
}
