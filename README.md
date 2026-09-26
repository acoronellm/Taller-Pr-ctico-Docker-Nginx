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
