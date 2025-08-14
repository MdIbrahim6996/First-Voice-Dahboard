const Card = ({
    title = "Galaxy",
    subtitle = "PREMIUM",
    number = "1234 67899 87610",
    name = "Sarah Williams",
    validThru = "06/30",
    gradient = "from-gray-900 via-slate-900 to-zinc-900",
    accent = "#a78bfa",
}) => {
    return (
        <div
            className={[
                "relative w-[360px] h-[220px] rounded-3xl p-6 text-white shadow-2xl",
                "overflow-hidden select-none",
                `bg-gradient-to-br ${gradient}`,
            ].join(" ")}
        >
            {/* Corner logo */}
            <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-xl bg-gradient-to-br from-orange-300 via-orange-500 to-red-600 shadow-inner" />
                </div>
            </div>

            {/* Top row */}
            <div className="flex items-center gap-3">
                {/* CHIP */}
                <div
                    className="h-7 w-9 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400
                    to-amber-600 border border-yellow-300/50 shadow-inner"
                />

                <div className="text-xs/4 uppercase tracking-wider opacity-80">
                    {title}
                </div>
                <div className="text-xs/4 uppercase tracking-wider font-semibold opacity-90">
                    {subtitle}
                </div>
            </div>

            {/* Branding */}
            <div className="mt-3">
                <div
                    className="text-[28px] font-semibold tracking-tight"
                    style={{ color: accent }}
                >
                    {title}
                </div>
                <div className="text-sm uppercase tracking-widest opacity-90 -mt-1">
                    {subtitle}
                </div>
            </div>

            {/* Number */}
            <div className="mt-6 font-mono text-[22px] tracking-[0.3em]">
                {number}
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-end justify-between">
                <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70">
                        Card Holder Name
                    </div>
                    <div className="text-sm font-medium tracking-wide">
                        {name}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest opacity-70">
                        Valid Thru
                    </div>
                    <div className="text-sm font-medium tracking-wide">
                        {validThru}
                    </div>
                </div>
                {/* CONTACTLESS */}
                <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 opacity-90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 12c0-1.6 1-3 2.4-3.6M6 12c0 1.6 1 3 2.4 3.6M10 9.5c1.4.7 2.3 2 2.3 3.5s-.9 2.8-2.3 3.5M13.7 8.2c2 1 3.3 3 3.3 5.3s-1.3 4.3-3.3 5.3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* shine + vignette */}
            {/* GLOSSS */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                    background:
                        "radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,0))",
                    maskImage:
                        "linear-gradient(180deg, rgba(0,0,0,.95) 70%, rgba(0,0,0,0) 98%)",
                }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/5 shadow-[inset_0_0_40px_rgba(0,0,0,.45)]" />
        </div>
    );
};
export default Card;
