"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

const SYMBOLS = ["✦", "◈", "⬡", "⟐", "◆", "✿", "⊕", "◉"] as const;

interface Card {
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

function createDeck(): Card[] {
    return shuffle(
        [...SYMBOLS, ...SYMBOLS].map((symbol, idx) => ({
            id: idx,
            symbol,
            flipped: false,
            matched: false,
        }))
    );
}

export default function MemoryMatch() {
    const t = useTranslations("common.games");
    const [cards, setCards] = useState<Card[]>(createDeck);
    const [selected, setSelected] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);

    const matchedCount = cards.filter((c) => c.matched).length / 2;
    const won = matchedCount === SYMBOLS.length;

    const reset = useCallback(() => {
        setCards(createDeck());
        setSelected([]);
        setMoves(0);
        setLocked(false);
    }, []);

    const handleClick = useCallback(
        (card: Card) => {
            if (locked || card.flipped || card.matched) return;

            const withFlipped = cards.map((c) =>
                c.id === card.id ? { ...c, flipped: true } : c
            );

            if (selected.length === 0) {
                setCards(withFlipped);
                setSelected([card.id]);
            } else {
                const firstId = selected[0];
                const firstCard = cards.find((c) => c.id === firstId)!;
                setMoves((m) => m + 1);
                setSelected([]);

                if (firstCard.symbol === card.symbol) {
                    setCards(
                        withFlipped.map((c) =>
                            c.id === firstId || c.id === card.id
                                ? { ...c, matched: true }
                                : c
                        )
                    );
                } else {
                    setCards(withFlipped);
                    setLocked(true);
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c) =>
                                c.id === firstId || c.id === card.id
                                    ? { ...c, flipped: false }
                                    : c
                            )
                        );
                        setLocked(false);
                    }, 850);
                }
            }
        },
        [cards, selected, locked]
    );

    return (
        <div className="max-w-xs">
            {/* Header row */}
            <div className="mb-5 flex items-center justify-between">
                <span className="font-sans text-xs text-muted">
                    {t("moves", { count: moves })}
                </span>
                <button
                    onClick={reset}
                    className="font-sans text-xs tracking-wide text-muted/60 transition-colors hover:text-accent"
                >
                    {t("play_again")}
                </button>
            </div>

            {/* 4×4 grid with 3D flip */}
            <div className="grid grid-cols-4 gap-2">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="aspect-square [perspective:800px]"
                    >
                        <button
                            onClick={() => handleClick(card)}
                            className={`
                                relative h-full w-full
                                [transform-style:preserve-3d]
                                transition-[transform] duration-[420ms]
                                [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]
                                ${card.flipped || card.matched ? "[transform:rotateY(180deg)]" : ""}
                            `}
                            aria-label={
                                card.flipped || card.matched
                                    ? card.symbol
                                    : "Flip card"
                            }
                        >
                            {/* Back face */}
                            <div className="absolute inset-0 [backface-visibility:hidden] flex items-center justify-center rounded-sm border border-rim bg-surface">
                                <span className="select-none font-serif text-base text-rim">
                                    ◦
                                </span>
                            </div>

                            {/* Front face */}
                            <div
                                className={`
                                    absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]
                                    flex items-center justify-center rounded-sm border
                                    ${card.matched ? "border-accent bg-accent/10" : "border-cream/15 bg-surface"}
                                `}
                            >
                                <span
                                    className={`select-none font-serif text-2xl ${card.matched ? "text-accent" : "text-cream"}`}
                                >
                                    {card.symbol}
                                </span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            {/* Win state */}
            {won && (
                <div className="mt-8 border-t border-rim pt-6">
                    <p className="font-serif text-lg text-accent">
                        {t("you_won")}
                    </p>
                    <p className="mt-0.5 font-sans text-xs text-muted">
                        {t("moves", { count: moves })}
                    </p>
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
