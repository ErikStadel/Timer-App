// js/dataStorage.js

const TIMER_STORAGE_KEY = 'martialArtsTimers';
const SIGNAL_STORAGE_KEY = 'martialArtsSignals';

/**
 * Generiert eine eindeutige ID für Timer oder Intervalle.
 * @returns {string} Eindeutige ID im Format "timestamp-randomString".
 */
function generateUniqueId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// --- Definition der Datenstrukturen und Beispiel-Daten ---

/**
 * @typedef {Object} Interval
 * @property {string} id - Eindeutige ID des Intervalls.
 * @property {string} name - Name des Intervalls (z.B. "Boxing", "Rest").
 * @property {number} duration - Dauer des Intervalls in Sekunden.
 * @property {'interval' | 'rest'} type - Typ des Intervalls ('interval' oder 'rest').
 * @property {string} [signalId] - Optionale ID des zugeordneten Signals.
 */

/**
 * @typedef {Object} Timer
 * @property {string} id - Eindeutige ID des Timers.
 * @property {string} name - Name des Timers.
 * @property {number} repeat - Anzahl der Wiederholungen der Intervalle.
 * @property {Interval[]} intervals - Array von Intervall-Objekten.
 */

/**
 * @typedef {Object} Signal
 * @property {string} id - Eindeutige ID des Signals.
 * @property {string} name - Name des Signals (z.B. "Gong", "Bell").
 * @property {string} filePath - Pfad zur Sounddatei (z.B. "assets/sounds/gong.mp3").
 */

// Beispiel-Standard-Signale (interne Dateien)
const defaultSignals = [
    { id: 'signal-gong', name: 'Gong', filePath: 'assets/sounds/gong.mp3' },
    { id: 'signal-bell', name: 'Bell', filePath: 'assets/sounds/bell.mp3' },
    // Füge hier weitere Standard-Signale hinzu
];

// Beispiel-Standard-Timer
const defaultTimers = [
    {
        id: 'timer-example-1',
        name: 'Basic Workout',
        repeat: 1,
        intervals: [
            { id: 'int-1-1', name: 'Warm-up', duration: 30, type: 'interval', signalId: 'signal-gong' },
            { id: 'int-1-2', name: 'Rest', duration: 15, type: 'rest', signalId: 'signal-bell' },
            { id: 'int-1-3', name: 'Main Set', duration: 60, type: 'interval', signalId: 'signal-gong' },
            { id: 'int-1-4', name: 'Rest', duration: 30, type: 'rest', signalId: 'signal-bell' },
        ]
    },
    {
        id: 'timer-example-2',
        name: 'Quick HIIT',
        repeat: 3,
        intervals: [
            { id: 'int-2-1', name: 'Work', duration: 45, type: 'interval' },
            { id: 'int-2-2', name: 'Rest', duration: 15, type: 'rest' },
        ]
    }
];

/**
 * Konvertiert Sekunden in MM:SS-Format.
 * @param {number} seconds - Dauer in Sekunden.
 * @returns {string} Formatierte Zeit im MM:SS-Format.
 */
function secondsToTimeString(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

/**
 * Konvertiert MM:SS-Format in Sekunden.
 * @param {string} timeString - Zeit im Format MM:SS.
 * @returns {number} Dauer in Sekunden.
 */
function timeStringToSeconds(timeString) {
    if (!timeString || !timeString.includes(':')) return 0;
    const [minutes, seconds] = timeString.split(':').map(Number);
    return (minutes * 60) + seconds;
}

/**
 * Validiert ein Timer-Objekt.
 * @param {Timer} timer - Zu validierender Timer.
 * @returns {boolean} True, wenn der Timer gültig ist.
 */
function isValidTimer(timer) {
    return (
        timer &&
        typeof timer.name === 'string' &&
        timer.name.trim() !== '' &&
        Number.isInteger(timer.repeat) &&
        timer.repeat >= 1 &&
        Array.isArray(timer.intervals) &&
        timer.intervals.length > 0 &&
        timer.intervals.every(interval =>
            interval &&
            typeof interval.name === 'string' &&
            interval.name.trim() !== '' &&
            typeof interval.duration === 'number' &&
            interval.duration >= 0 &&
            ['interval', 'rest'].includes(interval.type)
        )
    );
}

// --- Lokale Speicher-Funktionen ---

/**
 * Lädt alle Timer aus dem localStorage oder initialisiert sie mit Standarddaten.
 * @returns {Timer[]} Ein Array von Timer-Objekten.
 */
function loadTimers() {
    try {
        const storedTimers = localStorage.getItem(TIMER_STORAGE_KEY);
        if (storedTimers) {
            return JSON.parse(storedTimers);
        }
    } catch (e) {
        console.error("Fehler beim Laden der Timer aus localStorage:", e);
    }
    // Wenn keine Timer vorhanden oder Fehler, Standard-Timer speichern und zurückgeben
    saveTimers(defaultTimers);
    return defaultTimers;
}

/**
 * Speichert ein Array von Timer-Objekten im localStorage.
 * @param {Timer[]} timers - Das Array von Timer-Objekten, das gespeichert werden soll.
 */
function saveTimers(timers) {
    try {
        const validTimers = timers.filter(isValidTimer);
        localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(validTimers));
    } catch (e) {
        console.error("Fehler beim Speichern der Timer in localStorage:", e);
    }
}

/**
 * Lädt alle Signale aus dem localStorage oder initialisiert sie mit Standarddaten.
 * @returns {Signal[]} Ein Array von Signal-Objekten.
 */
function loadSignals() {
    try {
        const storedSignals = localStorage.getItem(SIGNAL_STORAGE_KEY);
        if (storedSignals) {
            return JSON.parse(storedSignals);
        }
    } catch (e) {
        console.error("Fehler beim Laden der Signale aus localStorage:", e);
    }
    // Wenn keine Signale vorhanden oder Fehler, Standard-Signale speichern und zurückgeben
    saveSignals(defaultSignals);
    return defaultSignals;
}

/**
 * Speichert ein Array von Signal-Objekten im localStorage.
 * @param {Signal[]} signals - Das Array von Signal-Objekten, das gespeichert werden soll.
 */
function saveSignals(signals) {
    try {
        localStorage.setItem(SIGNAL_STORAGE_KEY, JSON.stringify(signals));
    } catch (e) {
        console.error("Fehler beim Speichern der Signale in localStorage:", e);
    }
}

// Optional: Exportiere die Funktionen, falls du ein Modulsystem verwenden möchtest
// export { loadTimers, saveTimers, loadSignals, saveSignals };
// Für einfache HTML-Dateien mit <script>-Tags reicht es, wenn die Funktionen global verfügbar sind.
