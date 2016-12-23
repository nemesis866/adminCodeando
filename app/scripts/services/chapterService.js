/************************************************
Servicio para procesar capitulos
************************************************/

(function (){
	'use strict';

	function ChapterService ($location, chapterResource, chapterExtraResource, storageFactory, fncService)
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
		this.setChapter = function ()
		{

		};

		// Eliminamos el capitulo
		this.deleteChapter = function ()
		{
			
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
			},error);
		};

		// Actualizamos un capitulo
		this.updateChapter = function ()
		{
	
		};
	}

	angular
		.module('app')
			.service('chapterService', [
				'$location',
				'chapterResource',
				'chapterExtraResource',
				'storageFactory',
				'fncService',
				ChapterService
			]);
})();