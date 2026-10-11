# Real Life MiniMap

Version 3.0.0. Bildschirmfüllende iPhone-Web-App mit echten Straßen, GPS-Spielerpfeil, freier Kartenbewegung und automatischer Kameraverfolgung.

App: https://thesimonmc.github.io/rlminimap/

## Was V3 ändert

Der Spieler ist jetzt ein geografisch verankerter MapLibre-Marker. Er wird bei jeder gültigen GPS-Meldung auf deren Koordinaten gesetzt, unabhängig davon, wo die Kamera steht. Er ist kein festgeklebter Pfeil in der Bildschirmmitte mehr. Außerhalb des sichtbaren Kartenausschnitts liegt entsprechend auch der Spieler außerhalb des Bildes.

Verschieben, Pinch-Zoom und manuelles Drehen lösen die Kameraverfolgung. Der Knopf **Zum Spieler** bindet die Kamera wieder an. Nach zehn Sekunden ohne Eingabe fährt sie automatisch zum Spieler zurück. Neue Eingaben setzen den Timer zurück. Solange ein Finger auf der Karte liegt oder das Einstellungsmenü geöffnet ist, gibt es keine automatische Rückkehr.

Die Rückkehr verwendet eine Kamerafahrt von ungefähr einer bis 2,2 Sekunden. GPS-Meldungen aktualisieren währenddessen weiter den Marker, ohne die Kamerafahrt ständig neu zu starten. Eine erneute Berührung der Karte kann die Rückkehr abbrechen. Die Einstellung des Betriebssystems für reduzierte Bewegung wird berücksichtigt.

Das HUD blendet sich standardmäßig nach zehn Sekunden ohne Eingabe aus. Antippen blendet es wieder ein. Kartenquellen und wichtige GPS-/Verbindungshinweise bleiben sichtbar.

## Themes

Unter **THEMES** stehen vier eigene Karten- und HUD-Stile bereit:

- GTA V: helle Straßen auf Anthrazit, grüne Akzente.
- NFS Heat: dunkle Karte, Cyan-Straßen, Pink-Akzente und kantigere Anzeigen.
- Vice City: helle Pastellkarte, türkises Wasser und rosa Akzente.
- Minimal: helle, reduzierte Karte und monochromes HUD.

Die Spiel-Themes sind inspiriert, keine pixelgenauen 1:1-Repliken und keine Original-Spielgrafiken. Die Karte nutzt jetzt OpenFreeMap-Vektordaten im OpenMapTiles-Schema statt eingefärbter OSM-Rasterbilder. Themenwechsel ändern die tatsächlichen Kartenfarben, nicht nur den Rahmen.

## Weitere Bedienung

- Kompass: zwischen Norden oben und Fahrtrichtung oben wechseln. Der Spielerpfeil behält dabei seine gemeldete Fahrtrichtung.
- 2D/SCHRÄG: senkrechte oder geneigte Kartenansicht.
- Plus/Minus: zoomen.
- GPS/PAUSE: Ortung starten oder anhalten.
- Einstellungen: Straßennamen, GPS-Genauigkeitskreis, automatisches HUD-Ausblenden und optional das Display wach halten. Letzteres hängt von der Browserunterstützung ab.

Ein bereits erlaubter bzw. zuvor aktivierter Standortzugriff wird beim nächsten Öffnen wieder angefordert. Ohne Standortfreigabe erscheint kein vorgetäuschter Spieler. Die anfängliche Übersicht zeigt Wien und ist keine GPS-Position.

## GPS und Grenzen

Der Pfeil zeigt die letzte gemeldete GPS-Position, nicht eine garantiert exakte Position. Der Genauigkeitskreis visualisiert die gemeldete Ungenauigkeit. Bei fehlendem oder veraltetem GPS wird der Marker abgeschwächt und nicht mehr als live bezeichnet. Ein veralteter Fix löst keine automatische Rückkehr aus.

Fahrtrichtung stammt bei Bewegung aus GPS-heading oder aus ausreichend weit auseinanderliegenden Positionen. Beim Stillstand bleibt die letzte bekannte Richtung erhalten; ohne Richtungsmessung zeigt das HUD „Richtung offen“. Fehlende Geschwindigkeitsdaten werden nicht als 0 km/h ausgegeben.

HTTPS ist für GPS erforderlich. Auf iOS ist eine durchgehende Hintergrundortung bzw. Ortung bei gesperrtem Bildschirm mit dieser Web-App nicht zuverlässig. Neue Kartenausschnitte benötigen Internet. Der Service Worker speichert nur die lokale App-Oberfläche, keine Kartenbibliothek und keine Offline-Karten. Es gibt weiterhin keine Routenberechnung oder Turn-by-Turn-Navigation. Nur im Stand bedienen.

## Datenschutz

Die App speichert keinen GPS-Verlauf und sendet keine Positionsdaten an einen eigenen Server. Im Browser werden nur Einstellungen gespeichert. OpenFreeMap erhält die Karten- und Schriftanfragen, der CDN-Anbieter die Bibliotheksanfrage. Diese externen Dienste sehen damit Verbindungsdaten; der Kartenanbieter kann den geladenen Kartenausschnitt erkennen. Es gibt keine Analyse- oder Werbeskripte.

## Installation und Updates

GitHub Pages veröffentlicht den Branch `main`, Ordner `/(root)`. Die HTTPS-Adresse in Safari öffnen und über Teilen zum Home-Bildschirm hinzufügen.

Nach einem Update die App neu laden. Unter THEMES steht unten die Versionsnummer **3.0.0**. Der neue Service Worker verwendet einen neuen Cache, entfernt ältere RL-MiniMap-Caches und lädt die Oberfläche bevorzugt aus dem Netzwerk. Andere Apps auf derselben Domain werden nicht pauschal aus dem Cache gelöscht.

Für Windows genügt zum Bearbeiten ein Texteditor. Lokal kann der Ordner beispielsweise mit `py -m http.server 8000` ausgeliefert und am PC unter `http://localhost:8000` geöffnet werden. Der Zugriff vom iPhone auf eine unverschlüsselte LAN-Adresse reicht für GPS nicht aus.

## Prüfstand

52 lokale Chromium-Prüfungen haben bestanden, darunter geografischer Marker bei freier Kamera, GPS-Updates während einer Rückfahrt, Zurücksetzen des Zehn-Sekunden-Timers, Abbruch durch Berührung, gehaltene Eingabe, offenes Einstellungsmenü, Theme-Wechsel, Nordausrichtung, fehlende Geschwindigkeit, verweigerte Standortfreigabe, veraltete GPS-Daten und vier Bildschirmgrößen. HTML/JavaScript und Service Worker wurden zusätzlich auf JavaScript-Syntax geprüft.

Testgrenze: Diese lokalen UI- und Zustandsprüfungen verwenden simulierte GPS-Meldungen und einen MapLibre-Testersatz. Sie bestätigen nicht den externen Kartenabruf, die echte MapLibre-WebGL-Darstellung oder die Sensoren eines echten iPhones. Diese Integration muss auf dem Gerät geprüft werden.

## Technische Quellen

- MapLibre Marker: https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/
- MapLibre Kamera und flyTo: https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/
- OpenFreeMap: https://openfreemap.org/quick_start/
- OpenMapTiles-Schema: https://openmaptiles.org/docs/schema/
- Geolocation-Spezifikation: https://www.w3.org/TR/geolocation/
