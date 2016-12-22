/*************************************
Webcomponent para cursos nuevos
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoNuevo($scope, storageFactory, categoryService, courseService)
	{
		var vm = this;

		// Variables de conteo
		vm.countTitulo = 60;

		// Cambiamos el titulo
		document.title = 'Crear curso | Codeando.org';

		// Obtenemos las categorias
		categoryService.getCategory();

		// Maneja de la clase oculto
		vm.viewForm = { oculto: false };
		vm.viewMsg = { oculto: true };

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z0-9]{3,20}$/'
		};
		// pattern: '/^[a-zA-Z0-9]{1,20}$/',

		// Pasamos datos al formulario
		vm.formWitch = function ()
		{
			vm.name = storageFactory.user.name;
			vm.categories = storageFactory.categories;
		};

		// Procesamos el formulario
		vm.setCourse = function (model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				model = {};
				model.titulo = '';
				model.subTitulo = '';
				model.categoria = '';
				model.descripcion = '';
				model.requisitos = '';
			}

			var control = courseService.setCourse(model);

			// Verificamos el control
			if(control === 1){
				vm.viewForm = { oculto: true };
				vm.viewMsg = { oculto: false };				
			}
		};

		$scope.$watch(vm.formWitch);
	}

	// Configuracion del web component
	var cursoNuevo = {
		templateUrl: './scripts/components/curso-nuevo/curso-nuevo.html',
		controller: [
			'$scope',
			'storageFactory',
			'categoryService',
			'courseService',
			CursoNuevo
		]
	};

	angular
		.module('app')
			.component('cursoNuevo', cursoNuevo); // El nombre debe estar con camel case
})();