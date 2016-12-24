/*************************************
Webcomponent para preview del curso
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreview ($routeParams, $scope, storageFactory, categoryService, chapterService, courseService, fncService)
	{
		var vm = this;
		vm.param = $routeParams.id;

		// Cambiamos el titulo
		document.title = 'Preview curso | Codeando.org';

		// Obtenemos los datos del curso a editar
		courseService.getByIdCourse(vm.param);
		// Obtenemos los capitulos del curso a editar
		chapterService.getByIdCourse(vm.param);

		// Maneja de la clase oculto
		vm.viewList = { oculto: true };
		vm.viewMsg = { oculto: false };

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,20}$/'
		};
		// pattern: '/^[a-zA-Z0-9]{1,20}$/',

		// Ponemos en escucha
		vm.valueWitch = function ()
		{
			// Obtenemos el titulo del curso
			vm.titulo = storageFactory.courseEdit.titulo;
			// Obtenemos los capitulos del curso
			vm.chapters = storageFactory.chapters;

			// Verificamos si hay capitulo
			if(!fncService.isEmpty(vm.chapters)){
				vm.viewList = { oculto: false };
				vm.viewMsg = { oculto: true };
			}
		};

		// En escucha de cambios
		$scope.$watch(vm.valueWitch);
	}

	// Configuracion del web component
	var cursoPreview = {
		templateUrl: './scripts/components/curso-preview/curso-preview.html',
		controller: [
				'$routeParams',
				'$scope',
				'storageFactory',
				'categoryService',
				'chapterService',
				'courseService',
				'fncService',
				CursoPreview
			]
	};

	angular
		.module('app')
			.component('cursoPreview', cursoPreview); // El nombre debe estar con camel case
})();