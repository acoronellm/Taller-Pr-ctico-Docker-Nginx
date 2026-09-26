# Descripción de la solución

Este proyecto implementa una API REST desarrollada con Node.js, Express y TypeScript, ejecutada dentro de contenedores Docker. La aplicación utiliza Docker Compose para administrar los servicios y Nginx como reverse proxy.

El usuario accede únicamente a Nginx mediante el puerto 8080. Nginx recibe las solicitudes y las redirige al servicio API a través de la red interna de Docker utilizando el nombre del servicio `api`.

# Arquitectura implementada

La arquitectura está compuesta por dos servicios principales:

- api: servicio backend desarrollado con Node.js y Express que escucha internamente en el puerto 3000.
- nginx: servidor Nginx que funciona como reverse proxy y publica el puerto 8080 hacia el host.

Ambos servicios se encuentran conectados mediante una red Docker llamada `taller-network`.

# Instrucciones de ejecución

1. Clonar el repositorio.

2. Entrar en la carpeta del proyecto.

3. Construir e iniciar los contenedores:

docker compose up -d --build

4. Verificar el estado de los servicios:

docker compose ps

5. Probar la aplicación:

curl http://localhost:8080/

curl http://localhost:8080/health

curl http://localhost:8080/api/products

# Comandos Docker utilizados

docker build -t backend-api .

docker run -d --name backend-api -p 3000:3000 -e PORT=3000 backend-api

docker ps

docker logs backend-api

docker inspect backend-api

docker compose up -d --build

docker compose ps

docker compose logs nginx

docker compose logs api

docker compose down

docker network ls

docker network inspect <taller-network>

# Explicación de ports vs expose

La explicación se encuentra en el punto 10 de la [Parte 9](#Parte-9-—-Diagnóstico-de-errores)


#  Explicación de localhost vs nombre del servicio Docker.

La explicación se encuentra en la [Parte 7](#Parte-7---Eliminar-el-acceso-directo-al-Backend)

# Parte 3 - Analizar el contenedor

- ID del contenedor: 87f38665271d50fd29628a4cb16e506e446929c1d17564a8c32b1698421c0f6c
- Imagen utilizada: backend-api
- Puerto publicado: el contenedor expone el puerto 3000/tcp y este está publicado en el host también en el puerto 3000. El mapeo es 3000:3000.
- Variables de entorno:
  PORT=3000
  PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  NODE_VERSION=20.20.2
  YARN_VERSION=1.22.22
  Red: bridge
  Dirección IP interna del contenedor: 172.17.0.2
  Gateway de la red: 172.17.0.1
  Estado del contenedor: running
  El contenedor se encuentra actualmente en ejecución. La propiedad Running aparece como true y el código de salida es 0.
## Pregunta: ¿Cuál es la diferencia entre el puerto del contenedor y el puerto publicado en el host?
  
  El puerto del contenedor es el puerto interno donde la aplicación escucha dentro del entorno aislado del contenedor, mientras que el puerto publicado en el host es el puerto de la máquina anfitriona que Docker hace accesible desde el exterior y redirige hacia el puerto interno del contenedor.

# Parte 7 - Eliminar el acceso directo al Backend

## Pregunta:  explique la diferencia entre ports y expose en Docker Compose
ports publica un puerto del contenedor hacia la máquina host, permitiendo que el servicio sea accedido desde fuera de Docker. Por ejemplo, "8080:8080" permite acceder a Nginx mediante localhost:8080.

expose indica el puerto interno utilizado por un servicio para comunicación dentro de la red Docker, pero no publica ese puerto hacia el host. En este proyecto, la API utiliza expose en el puerto 3000 porque debe ser accesible por Nginx, pero no directamente por el usuario


## Parte 8 - Pruebas
<img width="921" height="143" alt="image" src="https://github.com/user-attachments/assets/e07f29c3-307e-4a2b-8c4e-344efcde5151" />
<img width="921" height="48" alt="image" src="https://github.com/user-attachments/assets/db56b2ce-9441-473e-9f54-f17713a6cc3c" />
<img width="921" height="64" alt="image" src="https://github.com/user-attachments/assets/60126b16-72d9-4b5c-ab29-082fc8269668" />
<img width="921" height="333" alt="image" src="https://github.com/user-attachments/assets/83d4ae59-2fc6-4fb1-9362-e17cc9e4bf6f" />
<img width="921" height="134" alt="image" src="https://github.com/user-attachments/assets/20175964-5670-4cf0-85b5-07e0305c6ab5" />

## Parte 9 — Diagnóstico de errores
 8. Se obtiene un error HTTP 502 Bad Gateway. Nginx recibe correctamente la solicitud del cliente, pero no puede conectarse al backend configurado como upstream.
 9. Ocurre porque Nginx intenta conectarse a localhost:3000. Dentro del contenedor Nginx, localhost representa al propio contenedor Nginx y no al contenedor de la API. Como la API no se está ejecutando dentro del contenedor Nginx, la conexión es rechazada.
 10. Cada contenedor Docker posee su propio entorno de red aislado. Por lo tanto, localhost o 127.0.0.1 representa al mismo contenedor desde el cual se realiza la conexión. Para comunicarse con otro contenedor es necesario utilizar su nombre dentro de la red Docker
 11. Se debe configurar Nginx para utilizar http://api:3000 como upstream. Docker Compose proporciona resolución DNS interna, por lo que el nombre api permite localizar automáticamente al contenedor correspondiente dentro de la red compartida.
 12. docker network ls





