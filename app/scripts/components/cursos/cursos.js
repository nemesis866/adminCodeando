/*************************************
Webcomponent para cursos
*************************************/

(function (){
	'use strict';

	// Controlador
	function Cursos($location, $scope, storageFactory, courseService, fncService)
	{
		var vm = this;

		// Cambiamos el titulo
		document.title = 'Cursos | Codeando.org';

		// Obtenemos los cursos
		courseService.getCourse();

		// cursos disponibles
		vm.courseWatch = function ()
		{
			vm.courses = storageFactory.courses;

			// Verificamos si hay categorias
			if(fncService.isEmpty(vm.courses)){
				// Si el objeto esta vacio
				vm.viewCourse = { oculto: true };
				vm.viewMsg = { oculto: false };
			} else {
				vm.viewCourse = { oculto: false };
				vm.viewMsg = { oculto: true };
			}
		};

		// Eliminamos un curso
		vm.deleteCourse = function (id)
		{
			courseService.deleteCourse(id);
		};

		// Configuracion del curso
		vm.previewCourse = function (id)
		{
			$location.url('/courses/preview/' + id);	
		};

		// Editamos un curso
		vm.editCourse = function (id)
		{
			$location.url('/courses/edit/' + id);
		};

		// Ponemos los cambios en escucha
		$scope.$watch(vm.courseWatch);
	}

	// Configuracion del web component
	var cursos = {
		templateUrl: './scripts/components/cursos/cursos.html',
		controller: [
			'$location',
			'$scope',
			'storageFactory',
			'courseService',
			'fncService',
			Cursos
		]
	};

	angular
		.module('app')
			.component('cursos', cursos); // El nombre debe estar con camel case
})();