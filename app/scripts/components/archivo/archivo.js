/*************************************
Webcomponent para los archivos
*************************************/

(function (){
	'use strict';

	// Controlador
	function Archivo ($scope, $routeParams, $timeout,storageFactory, fileService, fncService)
	{
		var vm = this;
		var control = 0;

		// Cargamos archivos en caso de existir
		storageFactory.files = {}; // Limpiamos el buffer
		fileService.getFile($routeParams.tema);

		// Propiedades en escucha
		vm.watch = function ()
		{
			vm.files = storageFactory.files;
			vm.temp = storageFactory.filesView;
		};

		// Al arrastrar los documentos
		document.getElementById('file_edit').ondragover = function (e)
		{
			// Permitimos copiar
			e.dataTransfer.dropEffect = 'move';
			this.style.border = '1px dashed #000';

			// Permitimos soltar
			return false;
		};

		// Al finalizar soltar y arrastrar
		document.getElementById('file_edit').ondragleave = function (e)
		{
			this.style.border = '1px solid #Ff8124';
			this.style.borderBottom = '3px solid #cc7013';
		};

		// Evitamos que se recargue al soltar el archivo en otra area
		document.getElementById('form_theme').ondragover = function (e){
			return false;
		};
		document.getElementById('form_theme').ondrop = function (e){
			// Evitamos la propagacion
			e.preventDefault();
			e.stopPropagation();	
		};

		// Al soltar los documentos
		document.getElementById('file_edit').ondrop = function (e)
		{
			// Evitamos la propagacion
			e.preventDefault();
			e.stopPropagation();

			// Obtenemos el total de archivos transferidos
			var count = e.dataTransfer.files.length;

			for(var i = 0; i < count; i++){
				var name = e.dataTransfer.files[i].name; // Nombre del archivo
				var size = e.dataTransfer.files[i].size / 1000; // Tamaño del archivo

				// Si el archivo es mayor a 5 kb no lo guardamos
				if(size <= 10){
					// Obtenemos la extension del archivo
					var data = name.split('.');
					var index = data.length - 1;
					var ext = data[index];

					// Mostramos imagen de cargando
					document.getElementById('file_cargando').innerHTML = '<img src="/img/cargando.gif">';

					// Verificamos que sea una extension valida
					if(ext === 'html' || ext === 'js' || ext === 'css' || ext === 'php' || ext === 'json' || ext === 'c' || ext === 'cpp' || ext === 'h' || ext === 'hpp'){
						// Obtenemos el contenido del archivo
						var archivo = e.dataTransfer.files[i];
						var lector = new FileReader();
						var encoding = 'UTF-8';

						// Si es un archivo .c o .cpp cambiamos el encoding
						if(ext === 'c' || ext === 'cpp' || ext === 'h' || ext === 'hpp'){
							encoding = 'ISO-8859-1';
						}

						// Lo cargamos en formato texto y con su codificacion
						lector.readAsText(archivo, encoding);

						// Mostramos el progreso del archivo
						lector.addEventListener('progress', function (e){
							if (e.lengthComputable) {
							    // e.loaded y e.total son propiedades del evento progress
							    //document.getElementById('content_dis_cargando').innerHTML = e.total+'% <img src="/img/cargando1.gif">';
							  }
						}, false);

						// Cargamos el archivo
						lector.addEventListener('load', function (e){
		                    var cadena = e.target.result;

		                    // Remplazamos los caracteres
			                cadena = fncService.setFileCode(cadena);

							// Guardamos en la base de datos temporal el archivo
			                var model = {
								ext: ext,
			                	name: name,
			                	size: size,
			                	contenido: cadena,
			                	control: control
			                };
			                fileService.setFile(model);
							
		                }, false);

						// Si muestra un error el archivo lo mostramos en pantalla
						lector.addEventListener('error', function (e){
							if(e.target.error.name === 'NotReadableError') {
								var msg = 'Error al subir el archivo intente nuevamente';
								fncService.error(msg);
	  						}

	  						// Quitamos la imagen cargando
							document.getElementById('file_cargando').innerHTML = '';  						
						}, false);
					} else {
						// En caso de tener una extension no valida
						fncService.error('Extensión no valida');

						// Quitamos la imagen cargando
						document.getElementById('content_dis_cargando').innerHTML = '';
					}
				} else {
					// Si el archivo es mayor mostramos mensaje de error
					fncService.error('Archivo mayor a 10 Kb');
				}
			}

			this.style.border = '1px solid #009957';

			return false;
		};

		// Eliminamos un archivo
		vm.fileDelete = function (id)
		{
			fileService.deleteFile(id);
			vm.back();
		};

		// Mostramos un archivo
		vm.fileView = function (id)
		{
			// Obtenemos el archivo
			for(var i = 0; i < storageFactory.files.length; i++){
				if(storageFactory.files[i]._id === id){
					storageFactory.filesView = {
						ext: storageFactory.files[i].ext,
						name: storageFactory.files[i].name,
						contenido: fncService.getFileCode(storageFactory.files[i].contenido)
					};
				}
			}

			// Mostramos la ventana
			document.getElementById('file').style.transform = 'translateX(0)';
			document.getElementById('file').style.webkitTransform = 'translateX(0)';

			$timeout(function (){
				vm.resaltador();
			}, 100);
		};

		// Ocultamos un archivo
		vm.back = function ()
		{
			document.getElementById('file').style.transform = 'translateX(-100%)';
			document.getElementById('file').style.webkitTransform = 'translateX(-100%)';

			// Reiniciamos
			storageFactory.fileView = {};
		};

		// Resaltador de sintaxis
		vm.resaltador = function ()
		{
			// ########### ZONA EDITABLE ########################################################################################
		    var lenguajeEspecifico = ''; //Dejarlo así para que funcione por defecto con la mayoría de lenguajes más usados 
		    var skin = 'desert'; //Selección de skin o tema. Ver lista posible más abajo. Por defecto se usa el skin 'default'
		    // ########### FIN ZONA EDITABLE ########################################################################################

		    fncService.getScript('/externo/resaltador.js?skin=' + (skin ? skin : 'default') + (lenguajeEspecifico ? '?lang=' + lenguajeEspecifico : ''));
		    var code = document.querySelectorAll('.code');
		    for(var i = 0; i < code.length; i++){
		    	// Obtenemos el html de code en cuestion
		    	var contenido = code[i].innerHTML;
		    	var pre = '<pre class="prettyprint' + (lenguajeEspecifico ? ' lang-' + lenguajeEspecifico : '') + '" >';

		    	// Agregamos el contenido
		    	code[i].innerHTML = pre + contenido + '</pre>';
		    }

		    // Modificamos todas las etiquetas .tag y .str
		    $timeout(function (){
			    var tag = document.querySelectorAll('.tag');
			    var contenido = '';

			    for(var i = 0; i < tag.length; i++){
			    	contenido = tag[i].innerHTML;
			    	// reemplazamos los simbolos < y >
		    		contenido = contenido.replace(/&lt;\//g,'<span style="color:#fff;font-weight:normal;">&lt;/</span>');
					contenido = contenido.replace(/&lt;/g,'<span style="color:#fff;font-weight:normal;">&lt;</span>');
					contenido = contenido.replace(/&gt;/g,'<span style="color:#fff;font-weight:normal;">&gt;</span>');

			    	tag[i].innerHTML = contenido;
			    }

			    var str = document.querySelectorAll('.str');
			    for(var j = 0; j < str.length; j++){
			    	contenido = str[j].innerHTML;
			    	// reemplazamos los simbolos \n
			    	contenido = contenido.replace(/\n/g,'\\n');

			    	str[j].innerHTML = contenido;
			    }

			    var com = document.querySelectorAll('.com');
			    for(var k = 0; k < com.length; k++){
			    	contenido = com[k].innerHTML;
			    	// reemplazamos los simbolos \n
			    	//contenido = contenido.replace(/\n/g,'\\n');

			    	com[k].innerHTML = contenido;
			    }
			}, 1000);
		};

		// Ponemos en escucha
		$scope.$watch(vm.watch);
	} // Cierra la funcion controlador

	// Configuracion del web component
	var archivo = {
		templateUrl: './scripts/components/archivo/archivo.html',
		controller: [
			'$scope',
			'$routeParams',
			'$timeout',
			'storageFactory',
			'fileService',
			'fncService',
			Archivo
		],
		controllerAs: 'vm'
	};

	angular
		.module('app')
			.component('archivo', archivo); // El nombre debe estar con camel case
})();