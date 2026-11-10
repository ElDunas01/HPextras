# HPextras (v4.2)

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

## Novedades de la v4.0
- Juegos: el símbolo se dibuja con trazo fino, patas y etiquetas (A/K, +/−, B/C/E) y, tras responder, explica para qué sirve.
- Retos: 14 retos nuevos (ahora 21) con diagrama.
- Quiz y Juegos: botón para volver al inicio y aviso de que se perderá el progreso al salir de una ronda, cambiar de pestaña de Aprender o ir a otra sección.
- El avance de la portada solo cuenta Aprender: quizzes y retos vistos.
- Garantía: hay que guardar los dos papeles que se entregan (servicios, «Antes de venir» y preguntas frecuentes).
- Versión: `APP_V='4.0'` y `var VERSION = "4.0"`.

## Novedades de la v3.9
- «Quién soy»: el texto queda solo con «Soy estudiante del TecNM. Reparo electrodomésticos y dispositivos electrónicos.».
- Versión: `APP_V='3.9'` y `var VERSION = "3.9"`.

## Novedades de la v3.8
- Portada para quien llega sin saber nada: «Así funciona» en 4 pasos con los síntomas rápidos, «Antes de venir» (anticipo, plazo, garantía, sin local, sin productos Apple) con preguntas frecuentes, y «Quién soy» con «Qué reparo» que abre Dudas.
- Pestañas con nombres más claros: Componentes, ¿Qué falla?, Aprender y Calculadoras.
- Formulario de cita: marca y modelo, día u horario que te acomoda y casilla de estudiante del TecNM; todo se añade al mensaje de WhatsApp.
- Versión: `APP_V='3.8'` y `var VERSION = "3.8"`.

## Novedades de la v3.7
- Dudas: al final del resultado hay un espacio opcional («¿Algo más de tu equipo?») para escribir marca, modelo, desde cuándo falla u otros detalles, con atajos como «Se mojó» o «Huele a quemado». El texto (hasta 300 caracteres) se añade al mensaje de WhatsApp y a «Copiar resumen» al momento. Se borra al empezar de nuevo.
- Versión: `APP_V='3.7'` y `var VERSION = "3.7"`.

## Novedades de la v3.6
- Guía del Multímetro ampliada: continuidad paso a paso, voltaje de una pila, resistor en ohmios, errores comunes y símbolos, con dibujos animados.
- MiniWiki más llamativa: banner animado en cada sección, íconos de categoría animados, niveles con color y detalle de componente con brillo y movimiento suave.
- Las animaciones se apagan con «animaciones: no» o «reducir movimiento». Versión: `APP_V='3.6'` y `var VERSION = "3.6"`.

## Novedades de la v3.5
- MiniWiki más simple: al entrar muestra categorías y «Para empezar» en vez de los 52 componentes completos.
- Tarjetas compactas (dibujo, nombre, nivel y una línea); al tocar una se abre el detalle con secciones plegables.
- Menú de secciones en una sola fila con íconos.
- Versión: `APP_V='3.5'` y `var VERSION = "3.5"`.

## Novedades de la v3.4

- **Teléfonos** reemplaza a «Cargador, batería o power bank» en «¿Cuál es tu equipo?», con icono animado y su propia ruta de Dudas (no enciende, no carga, pantalla, líquido). La ruta del cargador sigue disponible desde «No carga». Nota: el servicio no repara iPhone y la pregunta lo avisa.
- **Herramientas**: el selector tiene textos cortos y más espacio, y los filtros llevan un título («¿Qué quieres calcular?»).
- Versión: `APP_V='3.4'` y `var VERSION = "3.4"`.

## Novedades de la v3.3

- **Portada**: promesa clara arriba, botón principal «Diagnosticar mi equipo» con WhatsApp, 4 puntos de confianza (garantía, plazo, avances, gratis para TecNM) y «¿Cuál es tu equipo?» con iconos que inician el diagnóstico. Lo de aprender quedó en una sección plegable y «Tu avance» aparece cuando ya tienes XP.
- **Pruebas reales**: en `index.html` llena `HPPRUEBAS=[{n:'Nombre o carrera',t:'Comentario',img:'foto.jpg'}]` y aparece «Lo que dicen de HPextras». Con la lista vacía no se muestra nada. Las fotos deben estar en la misma carpeta y agregarse a `ARCHIVOS` en `sw.js` para verse sin conexión.
- **Ajustes renovados**: panel con color de tema en cuadros, tamaño de texto en tres botones, interruptores para animaciones y vibración, acciones con iconos y tarjeta de nivel.
- Arreglo: la pantalla inicial ahora se pinta al final, así que al recargar en Herramientas ya salen todas las calculadoras.
- Versión: `APP_V='3.3'` y `var VERSION = "3.3"`.

## Novedades de la v3.2

- **Calculadoras con dibujos animados que reaccionan a tus datos**: Ohm (el triángulo ilumina lo que falta y la corriente fluye más o menos rápido), divisor (medidor de Vout), LED (medidor de mA), código de colores (bandas explicadas), serie/paralelo, RC (curva de carga), 555 y PWM (onda con cursor), kWh (medidor que gira), batería, capacitores, unidades (escalera de prefijos) y calibre de cable.
- **Menú del Quiz** con ruta «Elige, responde y gana XP», niveles con barras e historial, modos con iconos animados y temas con iconos que se dibujan.
- Se detienen con «animaciones: no» o «reducir movimiento». Versión: `APP_V='3.2'` y `var VERSION = "3.2"`.

## Novedades de la v3.1

- **Dudas con dibujos animados**: portada con un esquema de 3 pasos; cada equipo y síntoma tiene su icono animado (licuadora que gira, bocina con ondas, foco que parpadea…); cada pregunta muestra su icono según el tema y una barra de progreso con trazo animado; los Sí/No dibujan su palomita o tache; el resultado agrega «Lo que me contaste» con las respuestas ilustradas.
- **Inicio compacto**: bajo la portada hay un gancho de 3 pasos con el botón «Empezar ahora». Los 6 servicios pasaron de una lista larga a tarjetas con icono animado; al tocar una se muestra su texto (más corto que antes). Las tarjetas de sección usan iconos animados y descripciones breves.
- **Botones con vibración**: todos los botones, tarjetas y resúmenes vibran al tocarlos (22 ms; 26 ms en la barra de secciones) y se encogen un poco al presionarlos, aunque el teléfono no vibre. Se respeta el ajuste de vibración.
- Versión: `APP_V='3.1'` (y `<meta name="app-version">`) y `var VERSION = "3.1"` en `sw.js`.

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

El texto no se puede seleccionar (solo los campos de escritura). Tocar el logo y el nombre del encabezado vibra 50 ms y vuelve al Inicio; el logo y el nombre de la portada solo vibran 50 ms y no navegan; mantener 2 s un botón, el logo, «HPextras» o «sin costo» vibra 200 ms (se cancela si sueltas antes o mueves el dedo). Chrome en Android exige haber tocado la página antes. Safari en iPhone no tiene vibración web; la app prueba un truco con un interruptor oculto (iOS 17.4 o superior) que puede o no funcionar según la versión.

## Datos del usuario

El progreso (XP, quizzes, diagnósticos, preferencias) se guarda en el `localStorage` del navegador, solo en ese dispositivo. Al leerlo, la app valida su estructura y descarta lo que no cuadre; un dato dañado no rompe la app. El código de importación y exportación sigue en `index.html`, también con validación, pero sus botones no se muestran en Ajustes.

## Contenido técnico y de seguridad

Las fuentes están en la app (MiniWiki › Fuentes). Antes de publicar un valor técnico nuevo, contrástalo con la hoja de datos del fabricante. Los consejos de seguridad deben mantener esta regla: **una persona sin capacitación no debe descargar capacitores grandes ni trabajar en circuitos conectados a la red; debe acudir a un técnico.**

## Limitaciones conocidas

- Safari en iPhone no permite vibrar desde páginas web: los ajustes de vibración solo actúan en Android.
- Los enlaces a hojas de datos apuntan al sitio del fabricante; busca el número de parte, porque los PDF directos cambian de dirección con frecuencia.
