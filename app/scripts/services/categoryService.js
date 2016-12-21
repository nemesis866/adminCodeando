/************************************************
Servicio para procesar categorias
************************************************/

(function (){
	'use strict';

	function CategoryService (categoryResource, fncService)
	{
		// Callback en caso de error
		function error()
		{
			// Mostramos mensaje de error
			var msg = 'Error al conectar con el servidor intente nuevamente';
			fncService.error(msg);	
		}

		// Guardamos los datos en la base de datos
		this.setCategory = function (model)
		{
			// Callback en caso de exito
			function success ()
			{
				// Limpiamos los campos del formulario
				model.titulo = '';

				// Mostramos mensaje de exito
				var msgSuccess = 'La categoria se creo con exito';
				fncService.success(msgSuccess);
			}

			// Validamos que ningun campo este vacio
			if(model.titulo.length >= 3){
				// Enviamos el recurso
				categoryResource.save({
					titulo: model.titulo,
				}, success, error);
			} else {
				var msgField = 'El nombre debe tener al menos 3 caracteres';
				fncService.error(msgField);
			}
		};

		// Obtenemos las categorias
		this.getCategory = function ()
		{
			// Obtenemos el listado de cursos
			categoryResource.query({})
			.$promise.then(function (data){
				
			});
		};
	}

	angular
		.module('app')
			.service('categoryService', [
				'categoryResource',
				'fncService',
				CategoryService
			]);
})();