/************************************************
Servicio para procesar archivos
************************************************/

(function (){
	'use strict';

	function FileService (fileResource, fileExtraResource, fileTemaResource, storageFactory, fncService)
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

		// Obtenemos los archivos
		this.getFile = function (id)
		{
			// Verificamos si el objeto de los archivos esta vacio
			if(fncService.isEmpty(storageFactory.files)){
				// Obtenemos el listado de los archivos del tema
				// solo si el objeto esta vacio
				fileTemaResource.query({
					id:id
				})
				.$promise.then(function (data){
					storageFactory.files = data;
				});
			}
		};

		// Guardamos los datos en la base de datos
		this.setFile = function (model)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El archivo se subio con exito';
				fncService.success(msgSuccess);

				// Si ya existe el objeto lo actualizamos
				if(fncService.isEmpty(storageFactory.files)){
					storageFactory.files.push(data);
				} else {
					storageFactory.files.push(data);
				}

				document.getElementById('file_cargando').innerHTML = '';
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				fileResource.save({
					ext: model.ext,
                	name: model.name,
                	size: model.size,
                	contenido: model.contenido,
                	control: model.control,
                	id: storageFactory.themeBuild._id // ID del tema
				}, success, function (){
					fncService.error('Tamaño o extensión invalida, intente de nuevo');
                });

				return 1;
			}
		};

		// Eliminamos el capitulo
		this.deleteFile = function (id)
		{
			// Callback en caso de exito
			function success (data)
			{
				var i = 0;

				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El archivo se elimino con exito';
				fncService.success(msgSuccess);

				// Quitamos el archivo del objeto
				for(i; i < storageFactory.files.length; i++){
					if(storageFactory.files[i]._id === data._id){
						break;
					}
				}
				storageFactory.files.splice(i, 1);
			}

			if(control === 0){
				// Actualizamos el control
				control = 1;

				// Eliminamos el curso
				fileExtraResource.delete({
					id: id
				}, success, error);
			}

			return 1;	
		};

		// Obtenemos un capitulo en especifico
		this.getByIdFile = function (id)
		{
			fileExtraResource.get({
				id: id
			}, function (data)
			{
				storageFactory.fileEdit = data;
				// document.getElementById('formTitulo').value = data.titulo;
			}, error);
		};
	}

	angular
		.module('app')
			.service('fileService', [
				'fileResource',
				'fileExtraResource',
				'fileTemaResource',
				'storageFactory',
				'fncService',
				FileService
			]);
})();