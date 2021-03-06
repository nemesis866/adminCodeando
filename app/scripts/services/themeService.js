/************************************************
Servicio para procesar capitulos
************************************************/

(function (){
	'use strict';

	function ThemeService ($location, $timeout, themeResource, themeChapterResource, themeDataResource, themeExtraResource, storageFactory, fncService)
	{
		var control = 0;

		// Callback en caso de error 
		function error()
		{
			// Actualizamos el control
			control = 0;

			// Mostramos mensaje de error
			var msg = 'Error al conectar con el servidor intente nuevamente';
			fncService.error(msg);	
		}

		// Obtenemos los temas
		this.getTheme = function ()
		{
			// Verificamos si el objeto de los temas esta vacio
			if(fncService.isEmpty(storageFactory.themes)){
				// Obtenemos el listado de los temas
				// solo si el objeto esta vacio
				themeResource.query({})
				.$promise.then(function (data){
					storageFactory.themes = data;
				});
			}
		};

		// Guardamos los datos en la base de datos
		this.setTheme = function (model, idCurso, idCapitulo)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El tema se creo con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Si ya existe el objeto lo actualizamos
				if(fncService.isEmpty(storageFactory.themes)){
					storageFactory.themes.push(data);
				} else {
					storageFactory.themes.push(data);
				}
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(fncService.checkInput(model.titulo, 3, 'titulo')) {
					control = 0;
					return 0;
				}

				// Verificamos si el objeto esta vacio
				var orden = 0;
				if(!fncService.isEmpty(storageFactory.themes)){
					// Obtenemos el orden
					orden = parseInt(storageFactory.themes.length);
				}

				// Primer letra en mayusculas
				model.titulo = fncService.upperCase(model.titulo);

				// Enviamos el recurso
				themeResource.save({
					autor: storageFactory.user.id,
					capitulo: idCapitulo,
					curso: idCurso,
					orden: orden,
					titulo: model.titulo
				}, success, error);

				return 1;
			}
		};

		// Eliminamos el tema
		this.deleteTheme = function (id)
		{
			// Callback en caso de exito
			function success (data)
			{
				var i = 0;

				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El tema se elimino con exito';
				fncService.success(msgSuccess);

				// Quitamos el tema del objeto
				for(i; i < storageFactory.themes.length; i++){
					if(storageFactory.themes[i]._id === data._id){
						break;
					}
				}
				storageFactory.themes.splice(i, 1);
			}

			if(control === 0){
				// Actualizamos el control
				control = 1;

				// Eliminamos el tema
				themeExtraResource.delete({
					id: id,
				}, success, error);
			}

			return 1;	
		};

		// Obtenemos un thema en especifico
		this.getByIdTheme = function (id)
		{
			themeExtraResource.get({
				id: id
			}, function (data)
			{
				storageFactory.themeEdit = data.titulo;
				storageFactory.themeBuild = data;
				// Informacion para editar un tema
				if(document.getElementById('formInfo')){
					// Transformamos a edicion el tema
					data.info = fncService.getCode(data.info);
					data.doc = fncService.getCode(data.doc);

					document.getElementById('formInfo').innerHTML = data.info;
					document.getElementById('formDoc').innerHTML = data.doc;
					document.getElementById('formVid').value = data.video;
					document.getElementById('formGit').value = data.github;
				}
			}, error);
		};

		// Obtenemos los temas de un capitulo
		this.getByIdChapter = function (capitulo, curso)
		{
			// Si esta vacio
			themeChapterResource.query({
				capitulo: capitulo,
				curso: curso
			}, function (data) {
				storageFactory.themes = data;
			}, error);
		};

		// Actualizamos un tema
		this.updateTheme = function (model, id)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El tema se edito con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Actualizamos el objeto de temas
				for(var i = 0; i < storageFactory.themes.length; i++){
					if(storageFactory.themes[i]._id === data._id){
						storageFactory.themes[i].titulo = data.titulo;
					}
				}
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(fncService.checkInput(model.titulo, 3, 'titulo')) {
					control = 0;
					return 0;
				}

				// Obtenemos los datos del tema
				var orden = 0;

				for(var i = 0; i < storageFactory.themes.length; i++){
					if(storageFactory.themes[i]._id === id){
						orden = storageFactory.themes[i].orden;
						break;
					}
				}

				// Primer letra en mayusculas
				model.titulo = fncService.upperCase(model.titulo);

				// Enviamos el recurso
				themeResource.update({
					id: id,
					orden: orden,
					titulo: model.titulo
				}, success, error);

				return 1;
			}
		};

		// Guardamos la información de un tema
		this.setData = function (model, id)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'La información se guardo con exito';
				fncService.success(msgSuccess);

				// Retornamos el codigo obtenido
				data.info = fncService.getCode(data.info);
				data.doc = fncService.getCode(data.doc);

				// Actualizamos el tema
				if(!fncService.isEmpty(storageFactory.themes)){
					for(var i = 0; i < storageFactory.themes.length; i++){
						if(storageFactory.themes[i]._id === data._id){
							// Actualizamos el tema en cuestion
							storageFactory.themes[i] = data;
						}
					}
				}

				// Actualizamos el tema actual
				storageFactory.themeBuild = data;

				// Redireccionamos
				$timeout(function (){
					$location.url('/courses/preview/'+data.id_curso);
				}, 2000);
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;
				var info;
				var doc;

				// Preparamos el codigo de los textarea
				// (evitamos problemas de seguridad en servidores)
				if(fncService.checkSize(model.info, 20, 'información')){
					control = 0;
					return 0;
				} else {
					info = fncService.prepareCode(model.info);
				}
				if(fncService.checkSize(model.doc, 20, 'documentación')){
					control = 0;
					return 0;
				} else {
					doc = fncService.prepareCode(model.doc);
				}
				// Verificamos que la url sea de youtube
				if(!fncService.checkYouTube(model.vid)){
					// Actualizamos control
					control = 0;
					fncService.error('Ingrese una url valida de youtube');
					return 0;
				}

				// Verificamos que la url sea de github
				if(!fncService.isEmpty(model.git)){
					if(!fncService.checkGithub(model.git)){
						// Actualizamos control
						control = 0;
						fncService.error('Ingrese una url valida de github');
						return 0;
					}
				}

				// Enviamos el recurso
				themeDataResource.update({
					id: id,
					info: info,
					doc: doc,
					video: model.vid,
					github: model.git
				}, success, error);

				return 1;
			}
		};
	}

	angular
		.module('app')
			.service('themeService', [
				'$location',
				'$timeout',
				'themeResource',
				'themeChapterResource',
				'themeDataResource',
				'themeExtraResource',
				'storageFactory',
				'fncService',
				ThemeService
			]);
})();