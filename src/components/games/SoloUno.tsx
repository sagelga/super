"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
    GameState,
    UnoCard,
    initGame,
    applyPlay,
    canPlay,
} from "@/lib/games/soloUnoLogic";
import { CardFace } from "./UnoCard";

export default function SoloUno() {
    const t = useTranslations("common.games");
    const [game, setGame] = useState<GameState>(initGame);
    // Bumped on reset so the hand's deal-in animation replays for a fresh game
    const [dealId, setDealId] = useState(0);

    const topCard = game.discard[game.discard.length - 1];

    const playableIds = useMemo(
        () =>
            new Set(
                game.hand.filter((c) => canPlay(c, topCard)).map((c) => c.id),
            ),
        [game.hand, topCard],
    );

    const playCard = useCallback(
        (card: UnoCard) => {
            if (game.status !== "playing" || !playableIds.has(card.id)) return;
            const hand = game.hand.filter((c) => c.id !== card.id);
            setGame(applyPlay(card, hand, game.deck, game.discard));
        },
        [game, playableIds],
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

    const reset = useCallback(() => {
        setGame(initGame());
        setDealId((n) => n + 1);
    }, []);

    const isUno = game.hand.length === 1 && game.status === "playing";

    return (
        <div className="max-w-lg">
            {/* Top area: discard + deck + message */}
            <div className="mb-6 flex items-end gap-5">
                {/* Discard pile */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-[10px] tracking-widest text-muted/50 uppercase">
                        Discard
                    </span>
                    {/* key forces remount → zoom-in plays on each play */}
                    <div
                        key={`discard-${topCard.id}`}
                        className="lightbox-zoom"
                        style={{ animationDuration: "0.32s" }}
                    >
                        <CardFace card={topCard} large />
                    </div>
                </div>

                {/* Draw pile */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="font-sans text-[10px] tracking-widest text-muted/50 uppercase">
                        Deck ({game.deck.length})
                    </span>
                    <button
                        onClick={draw}
                        disabled={game.status !== "playing"}
                        className="flex h-[8.5rem] w-[6rem] items-center justify-center rounded-xl border border-dashed border-rim bg-surface font-sans text-xs font-semibold tracking-widest text-muted/50 uppercase transition-colors hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
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
            <p className="mb-3 font-sans text-[10px] tracking-widest text-muted/50 uppercase">
                Your hand ({game.hand.length})
            </p>

            {/* Hand — overlapping fan */}
            <div className="flex -space-x-3 overflow-x-auto pb-3">
                {game.hand.map((card, idx) => {
                    const playable =
                        playableIds.has(card.id) && game.status === "playing";
                    return (
                        <button
                            key={`${dealId}-${card.id}`}
                            onClick={() => playCard(card)}
                            disabled={!playable}
                            style={
                                {
                                    zIndex: idx,
                                    ["--deal-delay" as string]: `${idx * 55}ms`,
                                } as React.CSSProperties
                            }
                            className={`hand-deal-in shrink-0 transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                                playable
                                    ? "cursor-pointer rounded-xl ring-2 ring-accent ring-offset-2 ring-offset-[#1A1814] hover:z-50 hover:-translate-y-3 hover:rotate-[-2deg]"
                                    : "cursor-default opacity-55"
                            } `}
                        >
                            <CardFace card={card} />
                        </button>
                    );
                })}

                {game.hand.length === 0 && game.status === "playing" && (
                    <span className="font-sans text-sm text-muted/50 italic">
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
                            <p className="text-cream font-serif text-lg">
                                {t("no_moves")}
                            </p>
                            <p className="mt-0.5 font-sans text-xs text-muted">
                                {game.hand.length} cards left in hand
                            </p>
                        </>
                    )}
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
