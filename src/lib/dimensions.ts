/* ===========================================================================
 * Dimensions intrinseques d'une image, lues au build
 * ---------------------------------------------------------------------------
 * Un <img> sans width/height reserve zero pixel tant qu'il n'est pas charge :
 * la page se reflow a chaque arrivee d'image, ce que Core Web Vitals mesure
 * comme du CLS. Les rapports d'aspect declares suffisent au navigateur pour
 * reserver la place, meme si l'affichage final est fluide.
 *
 * Lecture directe de l'en-tete JPEG (marqueur SOFn) : pas de dependance, pas
 * de decodage, quelques octets lus par fichier et un cache par module. Le
 * build ne lit donc chaque photo qu'une fois, quel que soit le nombre de pages
 * qui l'affichent.
 * ========================================================================= */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CACHE = new Map<string, { width: number; height: number } | null>();

/** Marqueurs SOF qui portent la taille. SOF4/8/12 n'existent pas, DHT/DAC non plus. */
const SOF = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
  0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function lire(fichier: string): { width: number; height: number } | null {
  const buf = readFileSync(fichier);
  if (buf.readUInt16BE(0) !== 0xffd8) return null; // pas un JPEG
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marqueur = buf[i + 1];
    if (SOF.has(marqueur)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marqueur === 0xd8 || marqueur === 0xd9 || (marqueur >= 0xd0 && marqueur <= 0xd7)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/**
 * `src` est un chemin public commencant par « / ». Renvoie null si le fichier
 * est absent ou illisible : l'appelant retombe alors sur son ratio CSS.
 */
export function dimensions(src: string): { width: number; height: number } | null {
  if (CACHE.has(src)) return CACHE.get(src)!;
  const chemin = join(process.cwd(), 'public', src.replace(/^\//, ''));
  let res: { width: number; height: number } | null = null;
  try {
    if (existsSync(chemin)) res = lire(chemin);
  } catch {
    res = null;
  }
  CACHE.set(src, res);
  return res;
}
