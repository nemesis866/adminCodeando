Documentacion para bootstrap
============================

Es un framework creado por el equipo de desarrollo de twitter con el proposito de crear webs con responsive design (web adaptables), utiliza CSS combinadas con javascript para lograr este objetivo y ademas cabe mencionar que es open source.

# Conceptos basicos

## Instalacion

Puedes incluir el CDN de bootstrap directamente a tu web, o si lo prefieres puedes instalar esta dependencia con ayuda de bower, asi que si no tienes instalado bower, hazlo con el siguiente comando.-

```js
sudo npm install -g bower
```

despues instala bootstrap.-

```js
bower install bootstrap
```

Tendras acceso a la libreria desde.-

```js
/bower_components/bootstrap/dist/js/bootstrap.min.js

/bower_components/bootstrap/dist/css/bootstrap.min.css
```

Nota.- Al instalar bootstrap mediante bower, asegurate de estar en el directorio principal de tu proyecto.

IMPORTANTE!!, para que funcione bootstrap es necesario tener instalado jquery.

## sistema de rejillas (12 columnas)

Tambien conocido como grids, este sistema es el que nos permite adaptar la pantalla a cualquier tipo de dispositivo (diferentes resoluciones), por ejemplo, en un ordenador podriamos visualizar la web con las 12 columnas mientras que una tableta podriamos utilizar solo 4 y un dispositivo movil solo 2 o incluso 1.

# Configuracion de filas y columnas

Para crear un buen diseño en bootstrap hay que maquetarlo y esto se logra mediante el trabajo de filas y columnas, entonces toda fila y/o columna debe de ir dentro de un contentenor (puede tener ancho fijo o variable).-

```html
<!-- contenedor fijo //-->
<div calss="container"></div>

<!-- contenedor variable //-->
<div calss="container-fluid"></div>
```

Nota.- Un contenedor fijo se basa en los pixeles (px) como unidad de medida, en cambio un contenedor variable o fluido se basa en porcentaje (%).

Cada fila en bootstrap ocupa 12 columnas por defecto, y para fila hay que agregar un contenedor con la clase row (dentro del cotenedor principal).-

```html
<div class="row"></div>
```

Nota.- Cada fila tienen un paddin de 15px del lado izquierdo y derecho y un margen de 15px.

Para utilizar columnas hay que declararlos con ayuda de un div y acontinuacion muestro las clases a utilizar.-

* col-xl-x (El contenedor maximo es automatico - ideal para moviles).
* col-sm-x (El contenedor maximo es de 750px - ideal para tabletas).
* col-md-x (El contenedor maximo es de 970px - ideal para escritorio).
* col-lg-x (El contenedor maximo es de 1170px - ideal para escritorio).

Nota.- la x al final de la clase se sustituye por el numero de columnas que utilizara ese div, recuerda que el maximo de columnas a utilizar es 12, ejemplo.-

```html
<!-- contenedor variable //-->
<div calss="container-fluid">
	<div class="row">
		<div class="col-md-4">
			<p>Anidado de 4 columnas</p>
		</div>
		<div class="col-md-8">
			<p>Anidado de 8 columnas</p>
		</div>
	</div>
</div>
```

# Tipografia

Bootstrao define la tipografia para distintos tipos de texto

## Headers

* h1 (Semibold 36px).
* h2 (Semibold 30px).
* h3 (Semibold 24px).
* h4 (Semibold 18px).
* h5 (Semibold 14px).
* h6 (Semibold 12px).

Nota.- al utilizar la etiqueta small dentro de lgun header se puede añadir texto mas pequeño (texto secundario).

# Body y P

Tienen un tamaño de letra de 14px por defecto y un line-height de 1.428, caracteristicas.-

* P tiene un margen inferior a 10px.
* para resaltar un texto se utiliza la clase lead
* Alineacion del texto (clases).-
	* text-left.
	* text-center.
	* text-right.
* Otras etiquetas.-
	* address - Para direcciones.
	* blockout - Para citar texto.
	* abbr (con atributo title) - Para abreviaturas.
	* Listas.-
		* ul - Desordenadas.
		* ol - Ordenadas.
		* dl - Descripciones.
	* Codigo.-
		* code - En linea.
		* pre - En bloque.

# Imagenes

Se pueden crear imagenes redimensionables siguiendo la siguiente configuracion.-

```css
// Codigo css
img
{
	max-width: 100%;
	height: auto;
}
```

```html
<!-- Codigo en el html //-->
<img src="..." class="img-rounded">
<img src="..." class="img-circle">
<img src="..." class="img-thumbnail">
```

# Ocultar elementos

Con bootstrap podemos ocultar elementos segun el dispositivo donde se muestra la web con las siguientes clases.-

* visible-xs (visible solo en phones).
* visible-sm (visible solo en tablets).
* visible-md (visible solo en medium device).
* visible-lg (visible solo en large device).
* hidden-xs (Oculto solo en phones).
* hidden-sm (Oculto solo en tablets).
* hidden-md (Oculto solo en medium device).
* hidden-lg (Oculto solo en large device).

Nota.- la resoluciones son las siguientes.-
	* phones < 768px.
	* tablets >= 768px.
	* medium device >= 992px.
	* large device >= 1200px. 

# Impresion

Podemos ocultar y/o mostrar elementos al momento de imprimir la pagina.-

* visible-print (Sera visible solo para imprimir, pero oculto en la web).
* hidden-print (Sera visible en la web, pero oculto para imprimir).

# Componentes

## Formularios

### Input

### Textarea

### Select

# Ventanas modales

Crear una ventana modal (popup) con bootstrap es muy sencillo, el html es el siguiente.-

```html
<button type="button" class="btn btn-default btn-xs" aria-haspopup="true" aria-expanded="false" data-toggle="modal" data-target="#bs-mensaje-modal-lg" data-id="{{ course._id }}">
	<span class="glyphicon glyphicon-envelope"></span> Mensajes
</button>

<div class="modal fade" id="bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
	<div class="modal-dialog modal-lg" role="document">
    	<div class="modal-content">
    		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        		<h4 class="modal-title" id="myModalLabel">Publicar su curso</h4>
      		</div>
    		<div class="modal-body">
    		</div>
    		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    		</div>
    	</div>
	</div>
</div>
```

Detalles a tomar en cuenta, en el boton que manda a llamar al popup hay que agregarle los siguientes atributos.-

* data-toggle="modal".- Le indicamos que al presionar el boton se mostrara una ventana modal.
* data-target="#bs-mensaje-modal-lg".- le indicamos el identificador o la clase de nuestra ventana modal.
* data-id="info".- En caso de querer pasar informacion a nuestra ventana modal.

En la estructura de la ventana se divide en tres partes.-

* modal-header.- Es la cabecera de nuestra ventana modal, aqui colocamos el titulo de la ventana y un boton para cerrar.
* modal-body.- En esta parte colocamos el contenido de nuestra ventana modal.
* modal-footer.- Pie de la ventana modal, aqui tenemos un boton para cerrar la ventana modal.

El codigo javascript en las ventanas modales lo utilizamos para procesar informacion que queremos mostrar en esta.-

```js
$('#bs-publicar-modal-lg').on('show.bs.modal', function (event) {
	// Obtenemos el elemento presionado (boton)
	var button = $(event.relatedTarget);
	// Obtenemos el data-id del boton
	var id = button.data('id') // Extract info from data-* attributes

	// Obtenemos el elemento de la ventana modal
	var modal = $(this);
	// Accion que realizamos para la ventana modal
	modal.find('.modal-title').text('New message to '+id);
});
```