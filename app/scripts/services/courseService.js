/************************************************
Servicio para procesar cursos
************************************************/

(function (){
	'use strict';

	function CourseService ($location, courseResource, courseExtraResource, storageFactory, fncService)
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

		// Obtenemos los cursos
		this.getCourse = function ()
		{
			// Verificamos si el objeto de los cursos esta vacio
			if(fncService.isEmpty(storageFactory.courses)){
				// Obtenemos el listado de cursos
				// solo si el objeto esta vacio
				courseResource.query({})
				.$promise.then(function (data){
					storageFactory.courses = data;
				});
			}
		};

		// Guardamos los datos en la base de datos
		this.setCourse = function (model)
		{
			// Callback en caso de exito
			function success (data)
			{
				// Actualizamos el control
				control = 0;

				// Mostramos mensaje de exito
				var msgSuccess = 'El curso se creo con exito';
				fncService.success(msgSuccess);

				// Limpiamos los campos del formulario
				model.titulo = '';
				model.subTitulo = '';
				model.categoria = '';
				model.descripcion = '';
				model.requisitos = '';

				// Actualizamos el objeto de los cursos
				if(!fncService.isEmpty(storageFactory.courses)){
					// Si ya existe el objeto lo actualizamos
					storageFactory.courses.push(data);
				} else {
					// Si no cargamos el objeto nuevo
					this.getCourse();
				}

				// Redireccionamos
				$location.href('/courses');
			}

			// verificamos que el control este disponible
			if(control === 0){
				// actualizamos el control
				control = 1;

				// Validamos que ningun campo este vacio
				if(fncService.checkInput(model.titulo, 10, 'titulo')) {
					// actualizamos el control
					control = 0;
					return 0;
				}
				if(fncService.checkInput(model.subTitulo, 10, 'subtitulo')) {
					// actualizamos el control
					control = 0;
					return 0;
				}
				if(fncService.checkInput(model.categoria, 3, 'categoria')) {
					// actualizamos el control
					control = 0;
					return 0;
				}
				
				// Reemplazamos los saltos de linea
				var descripcion = model.descripcion.replace(/\n/g,'<br>');
				var requisitos = model.requisitos.replace(/\n/g,'<br>');

				// Creamos la url del curso
				var url = model.titulo.toLowerCase();
				var data = url.split(' ');
				var url2 = '';
				for(var i = 0; i < data.length; i++){
					if(i === (data.length - 1)){
						url2 += data[i];
					} else {
						url2 += data[i] + '-';
					}
				}

				// Enviamos el recurso
				courseResource.save({
					autor: storageFactory.user.id,
					categoria: model.categoria,
					description: descripcion,
					img: '',
					requeriment: requisitos,
					subtitulo: model.subTitulo,
					titulo: model.titulo,
					url: url2
				}, success, error);

				return 1;
			}
		};
	}

	angular
		.module('app')
			.service('courseService', [
				'$location',
				'courseResource',
				'courseExtraResource',
				'storageFactory',
				'fncService',
				CourseService
			]);
})();