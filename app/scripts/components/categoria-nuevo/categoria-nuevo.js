/*************************************
Webcomponent para categoria nueva
*************************************/

(function (){
	'use strict';

	// Controlador
	function CategoriaNuevo (categoryService)
	{
		var vm = this;

		// Cambiamos el titulo
		document.title = 'Crear categoria | Codeando.org';

		// Maneja de la clase oculto
		vm.viewForm = { oculto: false };
		vm.viewMsg = { oculto: true };

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,20}$/',
		};
		// pattern: '/^[a-zA-Z0-9]{1,20}$/',

		// Procesando formulario
		vm.setCategory = function (model)
		{
			var control = categoryService.setCategory(model);

			// Verificamos el control
			if(control === 1){
				vm.viewForm = { oculto: true };
				vm.viewMsg = { oculto: false };				
			}
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