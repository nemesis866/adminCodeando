/*************************************
Webcomponent para categoria nueva
*************************************/

(function (){
	'use strict';

	// Controlador
	function CategoriaNuevo()
	{
		var vm = this;

		vm.msg = 'Hola mundo';
	}

	// Configuracion del web component
	var categoriaNuevo = {
		templateUrl: './scripts/components/categoria-nuevo/categoria-nuevo.html',
		controller: CategoriaNuevo
	};

	angular
		.module('app')
			.component('categoriaNuevo', categoriaNuevo); // El nombre debe estar con camel case
})();