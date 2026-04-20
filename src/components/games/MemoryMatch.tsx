"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
    type Card,
    createDeck,
    calculateMatchedCount,
    isGameWon,
    flipCard,
    matchCards,
    unflipCards,
    MISMATCH_DELAY,
} from "@/lib/games/memoryMatchLogic";

export default function MemoryMatch() {
    const t = useTranslations("common.games");
    const [cards, setCards] = useState<Card[]>(createDeck);
    const [selected, setSelected] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);
    // Bumped on reset so deal-in animation replays
    const [dealId, setDealId] = useState(0);

    const matchedCount = calculateMatchedCount(cards);
    const won = isGameWon(matchedCount);

    const reset = useCallback(() => {
        setCards(createDeck());
        setSelected([]);
        setMoves(0);
        setLocked(false);
        setDealId((n) => n + 1);
    }, []);

    const handleClick = useCallback(
        (card: Card) => {
            if (locked || card.flipped || card.matched) return;

            const withFlipped = flipCard(cards, card.id);

            if (selected.length === 0) {
                setCards(withFlipped);
                setSelected([card.id]);
            } else {
                const firstId = selected[0];
                const firstCard = cards.find((c) => c.id === firstId)!;
                setMoves((m) => m + 1);
                setSelected([]);

                if (firstCard.symbol === card.symbol) {
                    setCards(matchCards(withFlipped, firstId, card.id));
                } else {
                    setCards(withFlipped);
                    setLocked(true);
                    setTimeout(() => {
                        setCards((prev) =>
                            unflipCards(prev, [firstId, card.id]),
                        );
                        setLocked(false);
                    }, MISMATCH_DELAY);
                }
            }
        },
        [cards, selected, locked],
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
                {cards.map((card, idx) => (
                    <div
                        key={`${dealId}-${card.id}`}
                        className="card-deal-in aspect-square [perspective:800px]"
                        style={
                            {
                                ["--deal-delay" as string]: `${idx * 45}ms`,
                            } as React.CSSProperties
                        }
                    >
                        <button
                            onClick={() => handleClick(card)}
                            className={`relative h-full w-full transition-[transform] duration-[420ms] [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] ${card.flipped || card.matched ? "[transform:rotateY(180deg)]" : ""} `}
                            aria-label={
                                card.flipped || card.matched
                                    ? card.symbol
                                    : "Flip card"
                            }
                        >
                            {/* Back face */}
                            <div className="absolute inset-0 flex items-center justify-center rounded-sm border border-rim bg-surface [backface-visibility:hidden]">
                                <span className="font-serif text-base text-rim select-none">
                                    ◦
                                </span>
                            </div>

                            {/* Front face */}
                            <div
                                className={`absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-sm border transition-colors duration-300 [backface-visibility:hidden] ${card.matched ? "match-pulse border-accent bg-accent/10" : "border-cream/15 bg-surface"} `}
                            >
                                <span
                                    className={`font-serif text-2xl transition-colors duration-300 select-none ${card.matched ? "text-accent" : "text-cream"}`}
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
                        className="hover:text-canvas mt-4 inline-block border border-accent/60 px-5 py-2 font-sans text-xs font-semibold tracking-wide text-accent transition-colors hover:border-accent hover:bg-accent"
                    >
                        {t("play_again")}
                    </button>
                </div>
            )}
        </div>
    );
}
