const TIMER_STORAGE_KEY = 'martialArtsTimers';
const SIGNAL_STORAGE_KEY = 'martialArtsSignals';

// Beispiel-Standard-Signale
const defaultSignals = [
    { id: 'signal-gong', name: 'Gong', filePath: 'assets/sounds/gong.mp3' },
    { id: 'signal-bell', name: 'Bell', filePath: 'assets/sounds/bell.mp3' }
];

// Beispiel-Standard-Timer
const defaultTimers = [
    {
        id: 'timer-example-1',
        name: 'Basic Workout',
        repeat: 1,
        intervals: [
            { id: 'int-1-1', name: 'Warm-up', durationInterval: 30, durationRest: 15, signalId: 'signal-gong' },
            { id: 'int-1-2', name: 'Main Set', durationInterval: 60, durationRest: 30, signalId: 'signal-bell' }
        ]
    },
    {
        id: 'timer-example-2',
        name: 'Quick HIIT',
        repeat: 3,
        intervals: [
            { id: 'int-2-1', name: 'Work', durationInterval: 45, durationRest: 15, signalId: 'signal-gong' }
        ]
    }
];

// Generiert eine eindeutige ID für Timer oder Intervalle
function generateUniqueId() {
    return 'timer-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Lädt alle Timer aus dem localStorage oder initialisiert sie mit Standarddaten
function loadTimers() {
    try {
        const storedTimers = localStorage.getItem(TIMER_STORAGE_KEY);
        if (storedTimers) {
            const timers = JSON.parse(storedTimers);
            // Migration für alte Timer
            return timers.map(timer => ({
                ...timer,
                intervals: timer.intervals.map(interval => {
                    if (interval.duration && interval.type) {
                        return {
                            id: interval.id,
                            name: interval.name,
                            durationInterval: interval.type === 'interval' ? interval.duration : 0,
                            durationRest: interval.type === 'rest' ? interval.duration : 0,
                            signalId: interval.signalId || 'signal-gong'
                        };
                    }
                    return interval;
                })
            }));
        }
    } catch (e) {
        console.error("Fehler beim Laden der Timer aus localStorage:", e);
    }
    saveTimers(defaultTimers);
    return defaultTimers;
}

// Speichert ein Array von Timer-Objekten im localStorage
function saveTimers(timers) {
    try {
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timers));
    } catch (e) {
        console.error("Fehler beim Speichern der Timer in localStorage:", e);
    }
}

// Lädt alle Signale aus dem localStorage oder initialisiert sie mit Standarddaten
function loadSignals() {
    try {
        const storedSignals = localStorage.getItem(SIGNAL_STORAGE_KEY);
        if (storedSignals) {
            return JSON.parse(storedSignals);
        }
    } catch (e) {
        console.error("Fehler beim Laden der Signale aus localStorage:", e);
    }
    saveSignals(defaultSignals);
    return defaultSignals;
}

// Speichert ein Array von Signal-Objekten im localStorage
function saveSignals(signals) {
    try {
        localStorage.setItem(SIGNAL_STORAGE_KEY, JSON.stringify(signals));
    } catch (e) {
        console.error("Fehler beim Speichern der Signale in localStorage:", e);
    }
}