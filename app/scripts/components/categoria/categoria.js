/*************************************
Webcomponent para las categorias
*************************************/

(function (){
	'use strict';

	// Controlador
	function Categoria ($location, $scope, storageFactory, categoryService, fncService)
	{
		var vm = this;

		// Cambiamos el titulo
		document.title = 'Categorias | Codeando.org';

		// Obtenemos las categorias
		categoryService.getCategory();

		// Categorias disponibles
		vm.categoryWatch = function ()
		{
			vm.categories = storageFactory.categories;

			// Verificamos si hay categorias
			if(fncService.isEmpty(vm.categories)){
				// Si el objeto esta vacio
				vm.viewCategory = { oculto: true };
				vm.viewMsg = { oculto: false };
			} else {
				vm.viewCategory = { oculto: false };
				vm.viewMsg = { oculto: true };
			}
		};

		// Eliminamos una categoria
		vm.deleteCategory = function (id)
		{
			categoryService.deleteCategory(id);
		};

		// Editamos una categoria
		vm.editCategory = function (id)
		{
			$location.url('/categories/edit/' + id);
		};

		// Ponemos en escucha
		$scope.$watch(vm.categoryWatch);
	}

	// Configuracion del web component
	var categoria = {
		templateUrl: './scripts/components/categoria/categoria.html',
		controller: [
			'$location',
			'$scope',
			'storageFactory',
			'categoryService',
			'fncService',
			Categoria
		]
	};

	angular
		.module('app')
			.component('categoria', categoria); // El nombre debe estar con camel case
})();