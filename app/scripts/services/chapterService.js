/************************************************
Servicio para procesar capitulos
************************************************/

(function (){
	'use strict';

	function ChapterService ($location, chapterResource, chapterCourseResource, chapterExtraResource, storageFactory, fncService)
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

		// Obtenemos los capitulos
		this.getChapter = function ()
		{
			// Verificamos si el objeto de los capitulos esta vacio
			if(fncService.isEmpty(storageFactory.chapters)){
				// Obtenemos el listado de cursos
				// solo si el objeto esta vacio
				chapterResource.query({})
				.$promise.then(function (data){
					storageFactory.chapters = data;
				});
			}
		};

		// Guardamos los datos en la base de datos
		this.setChapter = function (model, idCurso)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El capitulo se creo con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Si ya existe el objeto lo actualizamos
				if(fncService.isEmpty(storageFactory.chapters)){
					storageFactory.chapters = data;
				} else {
					storageFactory.chapters.push(data);
				}
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(fncService.checkInput(model.titulo, 3, 'capitulo')) {
					control = 0;
					return 0;
				}

				// Verificamos si el objeto esta vacio
				var orden = 0;
				if(!fncService.isEmpty(storageFactory.chapters)){
					// Obtenemos el orden
					orden = parseInt(storageFactory.chapters.length);
				}

				// Enviamos el recurso
				chapterResource.save({
					autor: storageFactory.user.id,
					id: idCurso,
					orden: orden,
					titulo: model.titulo
				}, success, error);

				return 1;
			}
		};

		// Eliminamos el capitulo
		this.deleteChapter = function (id)
		{
			// Callback en caso de exito
			function success (data)
			{
				var i = 0;

				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El capitulo se elimino con exito';
				fncService.success(msgSuccess);

				// Quitamos el curso del objeto
				for(i; i < storageFactory.chapters.length; i++){
					if(storageFactory.chapters[i]._id === data._id){
						break;
					}
				}
				storageFactory.chapters.splice(i, 1);
			}

			if(control === 0){
				// Actualizamos el control
				control = 1;

				// Eliminamos el curso
				chapterExtraResource.delete({
					id: id,
				}, success, error);
			}

			return 1;	
		};

		// Obtenemos un capitulo en especifico
		this.getByIdChapter = function (id)
		{
			chapterExtraResource.get({
				id: id
			}, function (data)
			{
				storageFactory.chapterEdit = data.titulo;
				// document.getElementById('formTitulo').value = data.titulo;
			}, error);
		};

		// Obtenemos los capitulos de un curso
		this.getByIdCourse = function (id)
		{
			// Verificamos si el objeto esta vacio
			if(fncService.isEmpty(storageFactory.chapters)){
				// Si esta vacio
				chapterCourseResource.query({
					id: id
				}, function (data) {
					storageFactory.chapters = data;
				}, error);
			}
		};

		// Actualizamos un capitulo
		this.updateChapter = function (model, id)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El capitulo se edito con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Actualizamos el objeto de capitulos
				for(var i = 0; i < storageFactory.chapters.length; i++){
					if(storageFactory.chapters[i]._id === data._id){
						storageFactory.chapters[i].titulo = data.titulo;
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

				// Obtenemos el orden del capitulo
				var orden = 0;

				for(var i = 0; i < storageFactory.chapters.length; i++){
					if(storageFactory.chapters[i]._id === id){
						orden = storageFactory.chapters[i].orden;
						break;
					}
				}

				// Enviamos el recurso
				chapterExtraResource.update({
					id: id,
					orden: orden,
					titulo: model.titulo,
				}, success, error);

				return 1;
			}
		};
	}

	angular
		.module('app')
			.service('chapterService', [
				'$location',
				'chapterResource',
				'chapterCourseResource',
				'chapterExtraResource',
				'storageFactory',
				'fncService',
				ChapterService
			]);
})();