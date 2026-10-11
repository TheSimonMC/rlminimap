# Real Life MiniMap

GTA-inspirierte, bildschirmfüllende iPhone-Web-App mit echten OpenStreetMap-Straßen, GPS-Verfolgung, Spielerpfeil und geschwindigkeitsabhängiger Drehung.

## Veröffentlichung

GitHub Repository > Settings > Pages > Build and deployment > Deploy from a branch > main > /(root) > Save.

Danach: https://thesimonmc.github.io/rlminimap/

In iPhone Safari öffnen, Teilen > Zum Home-Bildschirm hinzufügen. App starten, GPS START drücken und Standort erlauben.

## Hinweise

- Für GPS ist HTTPS notwendig.
- Auf iOS wird die Standortverfolgung im Hintergrund oder bei gesperrtem Bildschirm nicht zuverlässig fortgesetzt.
- Fahrtrichtung wird aus GPS heading oder Positionsänderung ermittelt. Bei niedriger Geschwindigkeit kann sie springen.
- Diese erste Version nutzt OpenStreetMap-Rasterkarten mit dunklem Filter. Für einen echten GTA-Vektor-Stil ist später eine Vektor-Kartenquelle erforderlich.
- OpenStreetMap-Standard-Tiles benötigen Internet und unterliegen einer Nutzungspolitik. Nicht für großen Traffic oder Offline-Downloads geeignet.
- Keine zuverlässige Turn-by-Turn-Navigation. Nicht während des Fahrens bedienen.
