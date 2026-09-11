// Globale Tailwind Konfiguration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                dark: '#09090b',          // Zinc 950 - Deep dark background
                surface: '#18181b',       // Zinc 900 - Card backgrounds
                surfaceBorder: '#27272a', // Zinc 800 - Subtle borders
                primary: '#22c55e',       // Soft Jade - Primary positive/rest
                negative: '#eb4639',      // Light Crimson - Primary negative/alert
                highlight: '#f97316',     // Light Vermillion - Work/Highlights
                textMain: '#fafafa',      // Zinc 50 - Titles/Main text
                textMuted: '#a1a1aa',     // Zinc 400 - Subtitles/Muted text
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
};

// Initialisiere Lucide Icons nach dem Laden des DOM
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
