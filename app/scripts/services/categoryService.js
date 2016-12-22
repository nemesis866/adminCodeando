/************************************************
Servicio para procesar categorias
************************************************/

(function (){
	'use strict';

	function CategoryService ($location, categoryResource, categoryExtraResource, storageFactory, fncService)
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

		// Obtenemos las categorias
		this.getCategory = function ()
		{
			// Verificamos si el objeto de las categorias esta vacio
			if(fncService.isEmpty(storageFactory.categories)){
				// Obtenemos el listado de cursos
				// solo si el objeto esta vacio
				categoryResource.query({})
				.$promise.then(function (data){
					storageFactory.categories = data;
				});
			}
		};

		// Guardamos los datos en la base de datos
		this.setCategory = function (model)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'La categoria se creo con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Actualizamos el objeto de categorias
				if(!fncService.isEmpty(storageFactory.categories)){
					// Si ya existe el objeto lo actualizamos
					storageFactory.categories.push(data);
				} else {
					// Si no cargamos el objeto nuevo
					this.getCategory();
				}

				// Redireccionamos
				$location.href('/categories');
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(model.titulo.length >= 3){
					// Enviamos el recurso
					categoryResource.save({
						titulo: model.titulo,
					}, success, error);

					return 1;
				} else {
					var msgField = 'El nombre debe tener al menos 3 caracteres';
					fncService.error(msgField);

					// Resetemoas el control
					control = 0;
					return 0;
				}
			}
		};

		// Eliminamos la categoria
		this.deleteCategory = function (id)
		{
			function success(data)
			{
				var i = 0;

				// actualizamos el control
				control = 0;
				// Mostramos mensaje de exito
				var msgSuccess = 'La categoria se elimino con exito';
				fncService.success(msgSuccess);

				// Quitamos la categoria del objeto
				for(i; i < storageFactory.categories.length; i++){
					if(storageFactory.categories[i]._id === data._id){
						break;
					}
				}
				storageFactory.categories.splice(i, 1);
			}

			if(control === 0){
				// Actualizamos el control
				control = 1;

				// Eliminamos la categoria
				categoryExtraResource.delete({
					id: id,
				}, success, error);
			}
		};

		// Obtenemos una categoria en concreto
		this.getByIdCategory = function (id)
		{
			categoryExtraResource.get({
				id: id
			}, function (data)
			{
				storageFactory.categoryEdit = data.titulo;
				document.getElementById('formTitulo').value = data.titulo;
			},error);
		};

		// Actualizamos una categoria
		this.updateCategory = function (model, id)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'La categoria se edito con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';

				// Actualizamos el objeto de categorias
				for(var i = 0; i < storageFactory.categories.length; i++){
					if(storageFactory.categories[i]._id === data._id){
						storageFactory.categories[i].titulo = data.titulo;
					}
				}

				// Redireccionamos
				$location.href('/categories');
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(model.titulo.length >= 3){
					// Enviamos el recurso
					categoryExtraResource.update({
						id: id,
						titulo: model.titulo,
					}, success, error);

					return 1;
				} else {
					var msgField = 'El nombre debe tener al menos 3 caracteres';
					fncService.error(msgField);

					// Resetemoas el control
					control = 0;
					return 0;
				}
			}
		};
	}

	angular
		.module('app')
			.service('categoryService', [
				'$location',
				'categoryResource',
				'categoryExtraResource',
				'storageFactory',
				'fncService',
				CategoryService
			]);
})();