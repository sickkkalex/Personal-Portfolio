const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Floating geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-border/20 rounded-full animate-float-slow opacity-30" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 border border-border/15 rounded-full animate-float-medium opacity-20" />
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-border/10 rounded-full animate-float-fast opacity-25" />

            {/* Moving lines */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border/20 to-transparent animate-line-move" />
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border/10 to-transparent animate-line-move-delayed" />
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-border/15 to-transparent animate-line-move-slow" />

            {/* Subtle glow spots */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-foreground/[0.015] rounded-full blur-3xl animate-pulse-slower" />
        </div>
    );
};

export default AnimatedBackground;