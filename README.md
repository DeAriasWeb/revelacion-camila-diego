# Revelación de género · Camila & Diego (proyecto demo)

Invitación digital con sobre animado, pantalla completa, cinco efectos de fotos, apuesta «niño / niña»
guardada en Google Sheets, caja sorpresa y panel privado de invitados (PIN con doble toque).

## Qué cambiar (en este orden)
1. `js/config/event.js`
   - Nombre del evento (`'revelacion-camila-diego'`), nombres, fecha, lugar, textos y colores.
   - Pega en `sheets.url` la MISMA URL `/exec` que ya usas en tus otros eventos.
   - Fotos: cada efecto tiene su propia lista en `sets` (tendedero 6, voltea 6, globos 6, duo 2, cinta 8).
     Reemplaza cada `id` por `src: 'assets/images/tu-foto.jpg'`.
   - Si prefieres «varón / mujer»: cambia `heroBoy`, `heroGirl` y el bloque `guess` (los valores guardados
     seguirán siendo «Niña / Niño»; solo cambia lo que se ve).
2. Google Apps Script (`apps-script/Code.gs`)
   - Pega el Code.gs nuevo, pero CONSERVA tus PIN reales en la lista `PINS` y agrega la línea de este evento.
   - Ejecuta `prepararHoja` una vez y crea una «Nueva versión» de la implementación.
   - El Code.gs nuevo funciona también con tus eventos anteriores (boda, XV).
3. `index.html`, bloque `OG:START`: cambia las tres direcciones `https://TU-DOMINIO.vercel.app` por la real.
4. `assets/images/vista-previa.jpg` (1200 × 630): es la imagen que sale en WhatsApp. Cámbiala por la tuya.
5. Música: reemplaza `assets/audio/musica.mp3`.

## Importante
- NO subas la carpeta `apps-script/` a GitHub (contiene tus PIN). Ya viene en `.gitignore` de este proyecto.
- Al compartir por WhatsApp usa el enlace con barra final: `https://tu-dominio.vercel.app/`

## Los cinco efectos
Tendedero de polaroids · Cartas que voltean · Globos que revientan · Barra mamá/papá · Cinta infinita.
Más: apuesta niño/niña con serpentinas y caja sorpresa final.
