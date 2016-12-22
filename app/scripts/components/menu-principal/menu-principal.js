/*************************************
Webcomponent para menu de la app
*************************************/

(function (){
	'use strict';

	// Controlador
	function Controller(fncService)
	{
		var vm = this;
		var path = window.location.pathname;

		// Clases para el menu
		vm.inicio = { active: true };
		vm.cursos = { active: false };
		vm.categorias = { active: false };

		// cambios de menu
		vm.change = function (id)
		{
			// Cambiamos los valores
			switch(id){
				case 0:
					vm.inicio = { active: true };
					vm.cursos = { active: false };
					vm.categorias = { active: false };
					break;
				case 1:
					vm.inicio = { active: false };
					vm.cursos = { active: true };
					vm.categorias = { active: false };
					break;
				case 2:
					vm.inicio = { active: false };
					vm.cursos = { active: false };
					vm.categorias = { active: true };
					break;
			}
		};
	}

	// Configuracion del web component
	var menuPrincipal = {
		templateUrl: './scripts/components/menu-principal/menu-principal.html',
		controller: ['fncService', Controller]
	};

	angular
		.module('app')
			.component('menuPrincipal', menuPrincipal); // El nombre debe estar con camel case
})();