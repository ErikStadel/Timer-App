Timer-App
Eine Progressive Web App (PWA) für flexible Workout-Timer mit anpassbaren Intervallen, Signalen und Lautstärke. Ideal für HIIT, Kampfsport oder andere zeitgesteuerte Trainings.
Live unter: https://erikstadel.github.io/Timer-App/home-screen/index.html
Features

Anpassbare Timer: Erstelle Timer mit Intervallen (Arbeit/Pause), Wiederholungen und Namen.
Audio-Signale: Wähle Signale für Intervallstart, Pause, Halbzeit und letzte 5 Sekunden (z. B. Gong, Beep).
Lautstärke-Boost: Skaliere die Lautstärke von 50% bis 300% (Gain 0.5–3.0).
Responsive Design: Mobile-first UI mit Tailwind CSS, optimiert für iPhone/Android.
PWA: Vollbildmodus, Home Screen-Icon, Splash-Screen (z. B. iPhone 13: 2532x1170px).
Offline-Speicherung: Timer und Einstellungen werden in localStorage gespeichert.
Intuitive Navigation: Einfaches Hinzufügen, Bearbeiten und Löschen von Timern/Signalen.

Installation

Repository klonen:git clone https://github.com/erikstadel/Timer-App.git
cd Timer-App


Dateien bereitstellen:
Stelle sicher, dass alle Dateien in der Struktur bleiben:
home-screen/index.html, timer-screen.html
options/options-screen.html, signals-screen.html, signal-select.html
options/Sound/sound-settings.html
js/dataStorage.js
assets/sounds/*.mp3
assets/splash/lauch-2532x1170.png
manifest.json


Lade auf einen Webserver (z. B. GitHub Pages).


GitHub Pages (optional):
Pushe das Repo zu GitHub.
Aktiviere GitHub Pages in den Einstellungen (Branch: main, Pfad: /).
Zugriff: https://<username>.github.io/Timer-App/home-screen/index.html.



Nutzung

App starten:
Öffne https://erikstadel.github.io/Timer-App/home-screen/index.html in Safari/Chrome.
iPhone: Füge zum Home Screen hinzu (Share → Zum Home Screen hinzufügen) für Vollbildmodus.


Timer erstellen:
Gehe zu „Add Timer“ (timer-editor.html).
Gib Name, Wiederholungen und Intervalle (Arbeit/Pause) ein.
Speichere und starte den Timer (timer-review.html → timer-screen.html).


Signale anpassen:
Navigiere zu „Options“ → „Signals“ (signals-screen.html).
Wähle Signale (z. B. Bell, Chime) in signal-select.html.


Lautstärke einstellen:
Gehe zu „Options“ → „Sound“ (sound-settings.html).
Stelle 50–300% ein (300% = sehr laut).


Timer starten:
Klicke den „START“-Kreis in timer-screen.html.
Pausiere durch erneutes Klicken, beende via „End“.



Technologien

Frontend: HTML5, Tailwind CSS, JavaScript (ES6).
Font: Karla (Google Fonts).
Audio: Web Audio API mit AudioContext und MediaElementSource.
Speicherung: localStorage für Timer, Signale, Lautstärke.
PWA: manifest.json, Apple Meta-Tags, Splash-Screen.
Hosting: GitHub Pages.


Debugging

404-Fehler: Prüfe Pfade in manifest.json (start_url, icons) und HTML (href).
Kein Splash-Screen: Stelle sicher, dass <meta name="apple-mobile-web-app-capable" content="yes"> und display: standalone gesetzt sind. Prüfe PNG-Datei (lauch-2532x1170.png).
Audio-Probleme: Safari-Kons Console (iPhone mit Mac verbinden, Entwickler-Tools).
Cache: Lösche Safari-Cache (Einstellungen → Safari → Alle Webseiten-Daten).

Kontakt

Autor: Erik Stadel
GitHub: erikstadel
Issues: Melde Bugs oder Feature-Wünsche im Issue Tracker.


Hinweis: Entwickelt mit Unterstützung von Grok 3 (xAI), Mai 2025.
