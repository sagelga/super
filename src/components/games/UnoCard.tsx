import { UnoCard, CARD_BG, CARD_TEXT, CARD_OVAL } from "@/lib/games/soloUnoLogic";

export function CardFace({
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
