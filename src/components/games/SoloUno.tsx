"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";

type UnoColor = "red" | "yellow" | "green" | "blue";

interface UnoCard {
    id: number;
    color: UnoColor;
    value: string;
}

interface GameState {
    deck: UnoCard[];
    hand: UnoCard[];
    discard: UnoCard[];
    status: "playing" | "won" | "lost";
    message: string;
}

const CARD_BG: Record<UnoColor, string> = {
    red: "bg-red-700",
    yellow: "bg-yellow-400",
    green: "bg-emerald-700",
    blue: "bg-blue-700",
};

const CARD_TEXT: Record<UnoColor, string> = {
    red: "text-white",
    yellow: "text-yellow-950",
    green: "text-white",
    blue: "text-white",
};

const CARD_OVAL: Record<UnoColor, string> = {
    red: "bg-white/20",
    yellow: "bg-black/10",
    green: "bg-white/20",
    blue: "bg-white/20",
};

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildDeck(): UnoCard[] {
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

function initGame(): GameState {
    let deck = buildDeck();
    const hand = deck.slice(0, 7);
    deck = deck.slice(7);

    const di = deck.findIndex((c) => !ACTION_VALUES.has(c.value));
    const first = deck[di];
    deck = [...deck.slice(0, di), ...deck.slice(di + 1)];

    return { deck, hand, discard: [first], status: "playing", message: "" };
}

function canPlay(card: UnoCard, top: UnoCard): boolean {
    return card.color === top.color || card.value === top.value;
}

function applyPlay(
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

// ── Card component ──────────────────────────────────────────────────────────

function CardFace({
    card,
    large = false,
}: {
    card: UnoCard;
    large?: boolean;
}) {
    const bg = CARD_BG[card.color];
    const text = CARD_TEXT[card.color];
    const oval = CARD_OVAL[card.color];

    return (
        <div
            className={`
                relative overflow-hidden rounded-xl border border-white/25
                ${bg} ${text} select-none
                ${large ? "h-[8.5rem] w-[6rem]" : "h-[6rem] w-[4.25rem]"}
            `}
        >
            {/* Top-left corner value */}
            <span
                className={`absolute top-2 left-2 font-bold leading-none ${large ? "text-sm" : "text-[10px]"}`}
            >
                {card.value}
            </span>

            {/* Center oval */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className={`flex items-center justify-center rounded-full ${oval} ${large ? "h-[5.5rem] w-[3.5rem]" : "h-[4rem] w-[2.5rem]"}`}
                    style={{ transform: "rotate(-25deg)" }}
                >
                    <span
                        className={`font-bold leading-none ${large ? "text-3xl" : "text-xl"}`}
                        style={{ transform: "rotate(25deg)" }}
                    >
                        {card.value}
                    </span>
                </div>
            </div>

            {/* Bottom-right corner value (180°) */}
            <span
                className={`absolute right-2 bottom-2 font-bold leading-none ${large ? "text-sm" : "text-[10px]"}`}
                style={{ transform: "rotate(180deg)" }}
            >
                {card.value}
            </span>
        </div>
    );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function SoloUno() {
    const t = useTranslations("common.games");
    const [game, setGame] = useState<GameState>(initGame);

    const topCard = game.discard[game.discard.length - 1];

    const playableIds = useMemo(
        () =>
            new Set(
                game.hand
                    .filter((c) => canPlay(c, topCard))
                    .map((c) => c.id)
            ),
        [game.hand, topCard]
    );

    const playCard = useCallback(
        (card: UnoCard) => {
            if (game.status !== "playing" || !playableIds.has(card.id)) return;
            const hand = game.hand.filter((c) => c.id !== card.id);
            setGame(applyPlay(card, hand, game.deck, game.discard));
        },
        [game, playableIds]
    );

    const draw = useCallback(() => {
        if (game.status !== "playing") return;
        if (game.deck.length === 0) {
            setGame((g) => ({ ...g, status: "lost", message: t("no_moves") }));
            return;
        }
        const [drawn, ...rest] = game.deck;
        if (canPlay(drawn, topCard)) {
            setGame(applyPlay(drawn, game.hand, rest, game.discard));
        } else {
            const hand = [...game.hand, drawn];
            const status =
                rest.length === 0 && hand.length > 0 ? "lost" : "playing";
            setGame({
                ...game,
                deck: rest,
                hand,
                status,
                message:
                    status === "lost"
                        ? t("no_moves")
                        : `Drew ${drawn.color} ${drawn.value}`,
            });
        }
    }, [game, topCard, t]);

    const reset = useCallback(() => setGame(initGame()), []);

    const isUno =
        game.hand.length === 1 && game.status === "playing";

    return (
        <div className="max-w-lg">
            {/* Top area: discard + deck + message */}
            <div className="mb-6 flex items-end gap-5">
                {/* Discard pile */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-muted/50">
                        Discard
                    </span>
                    <CardFace card={topCard} large />
                </div>

                {/* Draw pile */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-muted/50">
                        Deck ({game.deck.length})
                    </span>
                    <button
                        onClick={draw}
                        disabled={game.status !== "playing"}
                        className="flex h-[8.5rem] w-[6rem] items-center justify-center rounded-xl border border-dashed border-rim bg-surface font-sans text-xs font-semibold uppercase tracking-widest text-muted/50 transition-colors hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {t("draw")}
                    </button>
                </div>

                {/* Status / UNO */}
                {(game.message || isUno) && (
                    <div className="mb-3 flex-1">
                        {isUno ? (
                            <p className="font-serif text-2xl text-accent">
                                {t("uno")}
                            </p>
                        ) : (
                            <p className="font-sans text-xs leading-relaxed text-muted">
                                {game.message}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Hand label */}
            <p className="mb-3 font-sans text-[10px] uppercase tracking-widest text-muted/50">
                Your hand ({game.hand.length})
            </p>

            {/* Hand — overlapping fan */}
            <div className="flex overflow-x-auto pb-3 -space-x-3">
                {game.hand.map((card, idx) => {
                    const playable =
                        playableIds.has(card.id) && game.status === "playing";
                    return (
                        <button
                            key={card.id}
                            onClick={() => playCard(card)}
                            disabled={!playable}
                            style={{ zIndex: idx }}
                            className={`
                                shrink-0 transition-all duration-200
                                ${
                                    playable
                                        ? "cursor-pointer hover:z-50 hover:-translate-y-3 ring-2 ring-accent ring-offset-2 ring-offset-[#1A1814] rounded-xl"
                                        : "cursor-default opacity-55"
                                }
                            `}
                        >
                            <CardFace card={card} />
                        </button>
                    );
                })}

                {game.hand.length === 0 && game.status === "playing" && (
                    <span className="font-sans text-sm italic text-muted/50">
                        Empty
                    </span>
                )}
            </div>

            {/* Game over */}
            {game.status !== "playing" && (
                <div className="mt-8 border-t border-rim pt-6">
                    {game.status === "won" ? (
                        <>
                            <p className="font-serif text-lg text-accent">
                                {t("you_won")}
                            </p>
                            <p className="mt-0.5 font-sans text-xs text-muted">
                                {game.discard.length - 1} cards played
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="font-serif text-lg text-cream">
                                {t("no_moves")}
                            </p>
                            <p className="mt-0.5 font-sans text-xs text-muted">
                                {game.hand.length} cards left in hand
                            </p>
                        </>
                    )}
                    <button
                        onClick={reset}
                        className="mt-4 inline-block border border-accent/60 px-5 py-2 font-sans text-xs font-semibold tracking-wide text-accent transition-colors hover:border-accent hover:bg-accent hover:text-canvas"
                    >
                        {t("play_again")}
                    </button>
                </div>
            )}
        </div>
    );
}
