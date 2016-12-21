/*************************************
Webcomponent para las categorias
*************************************/

(function (){
	'use strict';

	// Controlador
	function Categoria (categoryService)
	{
		var vm = this;

		vm.msg = 'Hola mundo';

		categoryService.getCategory();
	}

	// Configuracion del web component
	var categoria = {
		templateUrl: './scripts/components/categoria/categoria.html',
		controller: ['categoryService', Categoria]
	};

	angular
		.module('app')
			.component('categoria', categoria); // El nombre debe estar con camel case
})();