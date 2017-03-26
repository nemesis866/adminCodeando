/*************************************
Webcomponent para editar categoria
*************************************/

(function (){
	'use strict';

	// Controlador
	function CategoriaEditar ($routeParams, $scope, storageFactory, categoryService)
	{
		var vm = this;
		vm.param = $routeParams.id;

		// Cambiamos el titulo
		document.title = 'Editar categoria | Codeando.org';

		// Obtenemos los datos de la categoria a editar
		categoryService.getByIdCategory(vm.param);

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
			vm.value = storageFactory.categoryEdit;
		};

		// Guardamos la categoria
		vm.updateCategory = function(model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				model = {};
				model.titulo = storageFactory.categoryEdit;	
			}

			var control = categoryService.updateCategory(model, vm.param);

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
	var categoriaEditar = {
		templateUrl: './scripts/components/categoria-editar/categoria-editar.html',
		controller: [
				'$routeParams',
				'$scope',
				'storageFactory',
				'categoryService',
				CategoriaEditar
			]
	};

	angular
		.module('app')
			.component('categoriaEditar', categoriaEditar); // El nombre debe estar con camel case
})();