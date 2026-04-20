export type UnoColor = "red" | "yellow" | "green" | "blue";

export interface UnoCard {
    id: number;
    color: UnoColor;
    value: string;
}

export interface GameState {
    deck: UnoCard[];
    hand: UnoCard[];
    discard: UnoCard[];
    status: "playing" | "won" | "lost";
    message: string;
}

export const CARD_BG: Record<UnoColor, string> = {
    red: "bg-red-700",
    yellow: "bg-yellow-400",
    green: "bg-emerald-700",
    blue: "bg-blue-700",
};

export const CARD_TEXT: Record<UnoColor, string> = {
    red: "text-white",
    yellow: "text-yellow-950",
    green: "text-white",
    blue: "text-white",
};

export const CARD_OVAL: Record<UnoColor, string> = {
    red: "bg-white/20",
    yellow: "bg-black/10",
    green: "bg-white/20",
    blue: "bg-white/20",
};

export function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function buildDeck(): UnoCard[] {
    const colors: UnoColor[] = ["red", "yellow", "green", "blue"];
    const cards: Omit<UnoCard, "id">[] = [];
    for (const color of colors) {
        cards.push({ color, value: "0" });
        for (let v = 1; v <= 9; v++) {
            cards.push({ color, value: String(v) });
            cards.push({ color, value: String(v) });
        }
        for (const s of ["S", "R", "+2"]) {
            cards.push({ color, value: s });
            cards.push({ color, value: s });
        }
    }
    return shuffle(cards.map((c, i) => ({ ...c, id: i })));
}

const ACTION_VALUES = new Set(["S", "R", "+2"]);

export function initGame(): GameState {
    let deck = buildDeck();
    const hand = deck.slice(0, 7);
    deck = deck.slice(7);

    const di = deck.findIndex((c) => !ACTION_VALUES.has(c.value));
    const first = deck[di];
    deck = [...deck.slice(0, di), ...deck.slice(di + 1)];

    return { deck, hand, discard: [first], status: "playing", message: "" };
}

export function canPlay(card: UnoCard, top: UnoCard): boolean {
    return card.color === top.color || card.value === top.value;
}

export function applyPlay(
    card: UnoCard,
    hand: UnoCard[],
    deck: UnoCard[],
    discard: UnoCard[]
): GameState {
    const newDiscard = [...discard, card];
    let d = deck;
    let h = hand;
    let msg = "";

    if (card.value === "+2") {
        h = [...h, ...d.slice(0, 2)];
        d = d.slice(2);
        msg = "Drew 2 (+2 penalty)";
    } else if (card.value === "S" || card.value === "R") {
        if (d.length > 0) {
            h = [...h, d[0]];
            d = d.slice(1);
            msg = `Drew 1 (${card.value === "S" ? "Skip" : "Reverse"} penalty)`;
        }
    }

    const status = h.length === 0 ? "won" : "playing";
    if (h.length === 1 && status === "playing") msg = "UNO!";

    return { deck: d, hand: h, discard: newDiscard, status, message: msg };
}
