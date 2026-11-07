# HPextras (v3.0)

App web instalable (PWA) de HPextras: diagnósticos, aprendizaje (quiz, juegos y retos), MiniWiki, calculadoras, laboratorio y progreso. Funciona sin conexión después de la primera visita.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Toda la app (HTML, CSS, JavaScript y los 220 SVG de componentes, dentro del bloque `<script id="svgdb">`). |
| `sw.js` | Service worker: guarda la app para el modo sin conexión. |
| `manifest.webmanifest` | Nombre, colores e iconos para instalarla en el teléfono. |
| `favicon-64.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Logo de HPextras como icono de la pestaña y de la app. |

Todos deben quedar en la **misma carpeta** (el service worker solo controla la carpeta donde está `sw.js`).

## Ejecutarla en tu computadora

No abras `index.html` con doble clic (`file://`): el service worker y la instalación no funcionan así. Sirve la carpeta con cualquier servidor estático:

```bash
cd carpeta-de-la-app
python3 -m http.server 8080
```

Abre `http://localhost:8080`. `localhost` cuenta como contexto seguro, así que ahí sí se registra el service worker aunque no uses HTTPS.

## Publicarla

Sube **todo el contenido de la carpeta** a un hosting estático con HTTPS (GitHub Pages, Netlify, Cloudflare Pages, el hosting de tu dominio, etc.).

Requisitos para que funcione como PWA y sin conexión:

1. **HTTPS obligatorio** (excepto `localhost`). Sin HTTPS el navegador no registra el service worker ni ofrece "Instalar la app".
2. `index.html` y `sw.js` en la misma carpeta, sin redirecciones en `sw.js`.
3. Las rutas son relativas, así que puede vivir en la raíz del dominio o en una subcarpeta (por ejemplo `https://usuario.github.io/hpextras/`).
4. El servidor debe entregar `manifest.webmanifest` (idealmente como `application/manifest+json`) y los `.svg` como `image/svg+xml`.

## Agregar o cambiar un SVG

Los SVG viven en el bloque `<script type="application/json" id="svgdb">` de `index.html`, como `{"nombre": "<svg…>"}`. Se usan con `SU('nombre')`, que devuelve la URL de la imagen. Cada SVG se muestra como imagen, así que sus `id` internos no chocan entre sí.

## Modo sin conexión

1. Abre la app una vez con internet. El service worker descarga `index.html` (que ya incluye todos los SVG), el manifest y los iconos.
2. Después abre la app sin conexión: carga la copia guardada.
3. Para probarlo: DevTools → Application → Service Workers → marca **Offline** y recarga.

Siguen necesitando conexión: los enlaces de MiniWiki › Fuentes y el botón de WhatsApp.

## Publicar una versión nueva

La versión debe ser la misma en dos sitios:

- `index.html`: `const APP_V='2.9'` (y `<meta name="app-version">`).
- `sw.js`: `var VERSION = "2.9"` (el caché se llama `hpextras-v` + VERSION).

Al cambiar `sw.js`, el navegador instala el service worker nuevo, borra los cachés viejos y la app se actualiza en la siguiente visita. El menú ⚙ muestra la versión y avisa si el servidor tiene otra distinta.

## Novedades de la v3.0 (nuevo enfoque)

La app ahora es la puerta de entrada al servicio de reparación: orienta, entretiene y lleva al cliente a la cita, sin enseñar a reparar.

- **Dudas** (antes «diagnóstico»): mismo flujo de preguntas, pero el resultado es un **pre-diagnóstico** («Posible falla» y cómo lo confirmaría un técnico). Se quitaron las alternativas de solución, «Lo que yo haría» y el diagrama de pasos. Al final: enviar el resumen por WhatsApp o copiarlo.
- **Aprendizaje**: tres tarjetas con dibujos SVG animados (Quiz, Juegos, Retos), un banner por sección y miniaturas animadas en cada juego.
- **Herramientas**: portada con un multímetro animado midiendo un circuito, botón «Empezar» y tarjetas con iconos animados para Calculadoras y Laboratorio.
- Los dibujos nuevos usan los colores del tema y se detienen con «animaciones: no» o «reducir movimiento».
- Versión: `APP_V='3.0'` (y `<meta name="app-version">`) y `var VERSION = "3.0"` en `sw.js`.

## Novedades de la v2.9

- **Buscador global** en la portada: encuentra componentes, Dudas (diagnósticos, preguntas, rutas y síntomas), Glosario, calculadoras y simuladores; resultados agrupados, sin distinguir acentos ni mayúsculas.
- **Guía del multímetro** (MiniWiki › Más secciones › Multímetro) con dibujos SVG; se enlaza desde los pasos de Dudas que lo usan.
- **Respaldo del progreso** visible en Ajustes (exportar, importar y borrar con confirmación y mensajes de éxito o error).
- **Aviso de versión nueva**: el service worker nuevo espera hasta que la persona toque «Actualizar» (`sw.js` ya no usa `skipWaiting` al instalar; responde al mensaje `SKIP_WAITING`).
- **Copiar resumen** al final de cada diagnóstico de Dudas, con enlaces a la MiniWiki y a la calculadora relacionada.
- **Formulario de cita** en la portada que arma el mensaje de WhatsApp.
- **Calculadoras nuevas**: consumo en kWh y costo, duración de batería, código de capacitores, conversor de unidades y calibre de cable.

## Texto y vibración

El texto no se puede seleccionar (solo los campos de escritura). Tocar el logo y el nombre del encabezado vibra 50 ms y vuelve al Inicio; el logo y el nombre de la portada solo vibran 50 ms y no navegan; mantener 2 s un botón, el logo, «HPextras» o «sin costo» vibra 200 ms (se cancela si sueltas antes o mueves el dedo). Chrome en Android exige haber tocado la página antes; iPhone no permite vibrar.

## Datos del usuario

El progreso (XP, quizzes, diagnósticos, preferencias) se guarda en el `localStorage` del navegador, solo en ese dispositivo. Al leerlo, la app valida su estructura y descarta lo que no cuadre; un dato dañado no rompe la app. El código de importación y exportación sigue en `index.html`, también con validación, pero sus botones no se muestran en Ajustes.

## Contenido técnico y de seguridad

Las fuentes están en la app (MiniWiki › Fuentes). Antes de publicar un valor técnico nuevo, contrástalo con la hoja de datos del fabricante. Los consejos de seguridad deben mantener esta regla: **una persona sin capacitación no debe descargar capacitores grandes ni trabajar en circuitos conectados a la red; debe acudir a un técnico.**

## Limitaciones conocidas

- Safari en iPhone no permite vibrar desde páginas web: los ajustes de vibración solo actúan en Android.
- Los enlaces a hojas de datos apuntan al sitio del fabricante; busca el número de parte, porque los PDF directos cambian de dirección con frecuencia.
