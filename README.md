# PRUEBA42

Proyecto hecho para la prueba de Malaga y Barcelona.

## Uso en (MacOX):

### Pre-requisitos 📋
Tienes que tener una API creada en la intranet.
IMPORTANTE: La REDIRECT URL tendrá que ser del formato -> http://[IP]:3000/index
- Necesitas tener docker instalado en el equipo (probado con versión 1.28.5 de docker-compose 1.28.5.

### Instalación 🔧
1. En la intranet asegurarnos que la REDIRECT_URL es del formato -> http://[IP]:3000/index

2. Rellenar el .env.SAMPLE con tu IP, CLIENT ID y SECRET. Luego modificarle el nombre a .env.

3. Editar [API_42]/public/js/index.js y poner tu IP en la primera linea.

4. Realizar make en la raíz del repositorio

5. Solo queda entrar en [IP]:3000 con tu navegador (testado en brave, chrome y safari de momento).

### Tienes las siguientes funciones en el Makefile:
- make (build) -> Crea la imagen y corre el servidor dejandolo foreground. (Tiene versión background con make build_back)
- make init -> No actualiza la imagen si hemos cambiado algo en el Dockerfile e inicia el server foreground. (Tiene versión background con make init_back)
- make stop -> Para parar el docker-compose activo
