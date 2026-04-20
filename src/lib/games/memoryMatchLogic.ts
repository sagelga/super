export const SYMBOLS = ["✦", "◈", "⬡", "⟐", "◆", "✿", "⊕", "◉"] as const;

export interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createDeck(): Card[] {
  return shuffle(
    [...SYMBOLS, ...SYMBOLS].map((symbol, idx) => ({
      id: idx,
      symbol,
      flipped: false,
      matched: false,
    }))
  );
}

export function calculateMatchedCount(cards: Card[]): number {
  return cards.filter((c) => c.matched).length / 2;
}

export function isGameWon(matchedCount: number): boolean {
  return matchedCount === SYMBOLS.length;
}

export function flipCard(cards: Card[], cardId: number): Card[] {
  return cards.map((c) =>
    c.id === cardId ? { ...c, flipped: true } : c
  );
}

export function matchCards(
  cards: Card[],
  firstId: number,
  secondId: number
): Card[] {
  return cards.map((c) =>
    c.id === firstId || c.id === secondId
      ? { ...c, matched: true }
      : c
  );
}

export function unflipCards(cards: Card[], ids: number[]): Card[] {
  return cards.map((c) =>
    ids.includes(c.id)
      ? { ...c, flipped: false }
      : c
  );
}

export const FLIP_ANIMATION_DURATION = 420;
export const MISMATCH_DELAY = 850;
