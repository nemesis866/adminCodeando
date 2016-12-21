/*************************************
Webcomponent para categoria nueva
*************************************/

(function (){
	'use strict';

	// Controlador
	function CategoriaNuevo (categoryService)
	{
		var vm = this;

		// Configuración del formulario
		vm.formConfig = {
			required: true
		};

		// Procesando formulario
		vm.setCategory = function (model)
		{
			categoryService.setCategory(model);
		};
	}

	// Configuracion del web component
	var categoriaNuevo = {
		templateUrl: './scripts/components/categoria-nuevo/categoria-nuevo.html',
		controller: [
				'categoryService',
				CategoriaNuevo
			]
	};

	angular
		.module('app')
			.component('categoriaNuevo', categoriaNuevo); // El nombre debe estar con camel case
})();