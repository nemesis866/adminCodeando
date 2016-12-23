/*************************************
Webcomponent para preview del curso
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreview ($routeParams, $scope, storageFactory, categoryService, courseService)
	{
		var vm = this;
		vm.param = $routeParams.id;

		// Cambiamos el titulo
		document.title = 'Preview curso | Codeando.org';

		// Obtenemos los datos del curso a editar
		courseService.getByIdCourse(vm.param);

		// Maneja de la clase oculto
		vm.viewForm = { oculto: false };
		vm.viewMsg = { oculto: true };

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,20}$/'
		};
		// pattern: '/^[a-zA-Z0-9]{1,20}$/',

		// Ponemos en escucha
		vm.valueWitch = function ()
		{
			vm.titulo = storageFactory.courseEdit.titulo;
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
				'courseService',
				CursoPreview
			]
	};

	angular
		.module('app')
			.component('cursoPreview', cursoPreview); // El nombre debe estar con camel case
})();