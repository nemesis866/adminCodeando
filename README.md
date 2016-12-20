Web Kit Frontend para angular 1.4.x
===================================

Servidor web optimizado para trabajar con aplicaciones SPA (Single Page Application) de AngularJS.

# Entorno de desarrollo

En este repositorio encontraras un entorno de desarrollo para aplicaciones web creadas con el framework AngularJS, destacamos lo siguiente.-

* Servidor web con live reload.
* Inyector de dependencias con bower.
* Inyector de archivos js y css propios.

Solo te encargaras de crear tu aplicación, nosotros nos encargamos del resto...

## Como empezar

1.- Descarga o clona este repositorio en tu ordenador.

```js
$ git clone https://github.com/nemesis866/web-kit-frontend.git nombre_proyecto
$ cd nombre_proyecto
```

Nota.- Cambia nombre_proyecto por el nombre que le quieras dar al directorio donde se clonara el repositorio.

2.- Instala las dependencias del proyecto con una sola instrucción.-

```js
$ npm install
```

## Encender el servidor

El proyecto cuenta con la opción de encender solo el servidor, simplemente para ver en pantalla nuestra aplicación.-

Para encender el servidor ejecuta el comando.-

```js
$ npm start
```

Ya puedes ingresar a la url http://127.0.0.1:3000 desde tu navegador para ver en funcionamiento la aplicación.

## Modo developer

Este modo es recomendado para el desarrollo de la aplicación, tendrá las siguientes opciones.-

* Al crear archivos js y css se inyectaran automaticamente al archivo index.php.
* Al instalar dependencias con bower se inyectaran automaticamente al archivo index.html.

Nota.- Si elimina archivos js, css o desinstala dependencias con bower, el enlace a estos se eliminara del archivo index.html.

Para activar el modo developer ejecute el siguiente comando.-

```js
$ npm run dev
```

Ya puede acceder al servidor desde.-

http://127.0.0.1:3000