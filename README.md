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
- Pregunta: ¿Cuál es la diferencia entre el puerto del contenedor y el puerto publicado en el host?
  
  El puerto del contenedor es el puerto interno donde la aplicación escucha dentro del entorno aislado del contenedor, mientras que el puerto publicado en el host es el puerto de la máquina anfitriona que Docker hace accesible desde el exterior y redirige hacia el puerto interno del contenedor.

## Pregunta 7
ports publica un puerto del contenedor hacia la máquina host, permitiendo que el servicio sea accedido desde fuera de Docker. Por ejemplo, "8080:8080" permite acceder a Nginx mediante localhost:8080.

expose indica el puerto interno utilizado por un servicio para comunicación dentro de la red Docker, pero no publica ese puerto hacia el host. En este proyecto, la API utiliza expose en el puerto 3000 porque debe ser accesible por Nginx, pero no directamente por el usuario
 ## Pregunta 8
 <img width="921" height="143" alt="image" src="https://github.com/user-attachments/assets/e07f29c3-307e-4a2b-8c4e-344efcde5151" />
 <img width="921" height="48" alt="image" src="https://github.com/user-attachments/assets/db56b2ce-9441-473e-9f54-f17713a6cc3c" />
 <img width="921" height="64" alt="image" src="https://github.com/user-attachments/assets/60126b16-72d9-4b5c-ab29-082fc8269668" />
 <img width="921" height="333" alt="image" src="https://github.com/user-attachments/assets/83d4ae59-2fc6-4fb1-9362-e17cc9e4bf6f" />
 <img width="921" height="134" alt="image" src="https://github.com/user-attachments/assets/20175964-5670-4cf0-85b5-07e0305c6ab5" />

 ## Pregunta 9
 8. Se obtiene un error HTTP 502 Bad Gateway. Nginx recibe correctamente la solicitud del cliente, pero no puede conectarse al backend configurado como upstream.
 9. Ocurre porque Nginx intenta conectarse a localhost:3000. Dentro del contenedor Nginx, localhost representa al propio contenedor Nginx y no al contenedor de la API. Como la API no se está ejecutando dentro del contenedor Nginx, la conexión es rechazada.
 10. Cada contenedor Docker posee su propio entorno de red aislado. Por lo tanto, localhost o 127.0.0.1 representa al mismo contenedor desde el cual se realiza la conexión. Para comunicarse con otro contenedor es necesario utilizar su nombre dentro de la red Docker
 11. Se debe configurar Nginx para utilizar http://api:3000 como upstream. Docker Compose proporciona resolución DNS interna, por lo que el nombre api permite localizar automáticamente al contenedor correspondiente dentro de la red compartida.
 12. docker network ls





