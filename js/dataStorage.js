const TIMER_STORAGE_KEY = 'martialArtsTimers';
const SIGNAL_STORAGE_KEY = 'martialArtsSignals';
const GLOBAL_SIGNALS_KEY = 'martialArtsGlobalSignals';
const VOLUME_BOOST_KEY = 'martialArtsVolumeBoost';

// Globale Signale
const defaultGlobalSignals = {
    intervalStart: 'signal-horn',
    restStart: 'signal-longbeep',
    halfway: 'signal-gong',
    threeSecond: 'signal-beep',
    lastRound: 'signal-applause'
};

// Standard-Signale
const defaultSignals = [
    { id: 'signal-bell', name: 'Bell', filePath: 'assets/sounds/bell.mp3' },
    { id: 'signal-horn', name: 'Horn', filePath: 'assets/sounds/horn.mp3' },
    { id: 'signal-beep', name: 'Beep', filePath: 'assets/sounds/beep.mp3' },
    { id: 'signal-applause', name: 'Applause', filePath: 'assets/sounds/applause.mp3' },
    { id: 'signal-chime', name: 'Chime', filePath: 'assets/sounds/chime.mp3' },
    { id: 'signal-gong', name: 'Gong', filePath: 'assets/sounds/gong.mp3' },
    { id: 'signal-whoosh', name: 'Whoosh', filePath: 'assets/sounds/whoosh.mp3' },
    { id: 'signal-longbeep', name: 'Longbeep', filePath: 'assets/sounds/longbeep.mp3' }
];

// Standard-Timer
const defaultTimers = [
    {
        id: 'timer-example-1',
        name: 'Basic Workout',
        repeat: 2,
        intervals: [
            { id: 'int-1-1', name: 'Warm-up', durationInterval: 30, durationRest: 15 },
            { id: 'int-1-2', name: 'Main Set', durationInterval: 60, durationRest: 30 }
        ]
    },
    {
        id: 'timer-example-2',
        name: 'Quick HIIT',
        repeat: 3,
        intervals: [
            { id: 'int-2-1', name: 'Work', durationInterval: 45, durationRest: 15 }
        ]
    }
];

function generateUniqueId() {
    return 'timer-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function loadTimers() {
    try {
        const storedTimers = localStorage.getItem(TIMER_STORAGE_KEY);
        if (storedTimers) {
            const timers = JSON.parse(storedTimers);
            return timers.map(timer => ({
                ...timer,
                intervals: timer.intervals.map(interval => ({
                    id: interval.id,
                    name: interval.name,
                    durationInterval: interval.durationInterval || 0,
                    durationRest: interval.durationRest || 0
                }))
            }));
        }
    } catch (e) {
        console.error("Fehler beim Laden der Timer aus localStorage:", e);
    }
    saveTimers(defaultTimers);
    return defaultTimers;
}

function saveTimers(timers) {
    try {
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timers));
    } catch (e) {
        console.error("Fehler beim Speichern der Timer in localStorage:", e);
    }
}

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

function saveSignals(signals) {
    try {
        localStorage.setItem(SIGNAL_STORAGE_KEY, JSON.stringify(signals));
    } catch (e) {
        console.error("Fehler beim Speichern der Signale in localStorage:", e);
    }
}

function loadGlobalSignals() {
    try {
        const storedGlobalSignals = localStorage.getItem(GLOBAL_SIGNALS_KEY);
        if (storedGlobalSignals) {
            return JSON.parse(storedGlobalSignals);
        }
    } catch (e) {
        console.error("Fehler beim Laden der globalen Signale:", e);
    }
    saveGlobalSignals(defaultGlobalSignals);
    return defaultGlobalSignals;
}

function saveGlobalSignals(globalSignals) {
    try {
        localStorage.setItem(GLOBAL_SIGNALS_KEY, JSON.stringify(globalSignals));
    } catch (e) {
        console.error("Fehler beim Speichern der globalen Signale:", e);
    }
}

function loadVolumeBoost() {
    try {
        const storedVolumeBoost = localStorage.getItem(VOLUME_BOOST_KEY);
        if (storedVolumeBoost) {
            return parseInt(storedVolumeBoost, 10);
        }
    } catch (e) {
        console.error("Fehler beim Laden des Volume-Boosts:", e);
    }
    const defaultVolumeBoost = 100;
    saveVolumeBoost(defaultVolumeBoost);
    return defaultVolumeBoost;
}

function saveVolumeBoost(volumeBoost) {
    try {
        localStorage.setItem(VOLUME_BOOST_KEY, volumeBoost.toString());
    } catch (e) {
        console.error("Fehler beim Speichern des Volume-Boosts:", e);
    }
}