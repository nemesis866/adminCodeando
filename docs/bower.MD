Documentacion para bower
========================

Bower es un gestor de depencias el cual nos failita el trabajar con librerias para nuestro front end.

# Instalacion de bower

Para instalarlo ejecutamos el siguiente comando.-

```js
sudo npm install -g bower
```

Podemos instalar dependencias con el siguiente comando

```js
bower install --save nombre_dependencia
```

Nota.- el flag --save nos sirve para guardar la dependencia en el archivo bower.json (hay que tenerlo creado para que funcione).

Si trabajamos en linux podriamos tener un error similar a este.-

```js
/usr/local/lib/node_modules/bower/lib/node_modules/configstore/index.js:54
				throw err;
				^

Error: EACCES: permission denied, open '/home/paulo/.config/configstore/bower-github.json'
You don't have access to this file.

    at Error (native)
    at Object.fs.openSync (fs.js:549:18)
    at Object.fs.readFileSync (fs.js:397:15)
    at Object.create.all.get (/usr/local/lib/node_modules/bower/lib/node_modules/configstore/index.js:35:26)
    at Object.Configstore (/usr/local/lib/node_modules/bower/lib/node_modules/configstore/index.js:28:44)
    at readCachedConfig (/usr/local/lib/node_modules/bower/lib/config.js:19:23)
    at defaultConfig (/usr/local/lib/node_modules/bower/lib/config.js:11:12)
    at Object.<anonymous> (/usr/local/lib/node_modules/bower/lib/index.js:16:32)
    at Module._compile (module.js:410:26)
    at Object.Module._extensions..js (module.js:417:10)
```

Si este es el caso lo podemos solucionar de dos formas.-

1.- Agregamos el flag --allow-root al comando.-

```js
bower install --save --allow-root nombre_dependencia
```

2.- En caso de no funcionar el paso 1, debemos dar permisos a bower con los siguientes comandos.-

```js
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

Despues de esto ya podremos ejecutar los comandos de instalacion de dependencias sin problema alguno.