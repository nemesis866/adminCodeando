/*************************************
Webcomponent para editar curso
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoEditar ($routeParams, $scope, storageFactory, categoryService, courseService)
	{
		var vm = this;
		vm.param = $routeParams.id;

		// Cambiamos el titulo
		document.title = 'Editar curso | Codeando.org';

		// Obtenemos las categorias
		categoryService.getCategory();
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
			vm.name = storageFactory.user.name;
			vm.categories = storageFactory.categories;
			vm.titulo = storageFactory.courseEdit.titulo;
		};

		// Guardamos la categoria
		vm.updateCourse = function(model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				// Contenido por default para model
				model = {};
				model.categoria = storageFactory.courseEdit.categoria;
				model.descripcion = storageFactory.courseEdit.description;
				model.img = storageFactory.courseEdit.img;
				model.requisitos = storageFactory.courseEdit.requeriment;
				model.subTitulo = storageFactory.courseEdit.subtitulo;
				model.titulo = storageFactory.courseEdit.titulo;
				model.url = storageFactory.courseEdit.url;
			}

			var control = courseService.updateCourse(model, vm.param);

			// Verificamos el control
			if(control === 1){
				vm.viewForm = { oculto: true };
				vm.viewMsg = { oculto: false };				
			}
		};

		// En escucha de cambios
		$scope.$watch(vm.valueWitch);
	}

	// Configuracion del web component
	var cursoEditar = {
		templateUrl: './scripts/components/curso-editar/curso-editar.html',
		controller: [
				'$routeParams',
				'$scope',
				'storageFactory',
				'categoryService',
				'courseService',
				CursoEditar
			]
	};

	angular
		.module('app')
			.component('cursoEditar', cursoEditar); // El nombre debe estar con camel case
})();