/*************************************
Webcomponent para menu de la app
*************************************/

(function (){
	'use strict';

	// Controlador
	function Controller()
	{
		var vm = this;
		var path = window.location.pathname;

		// Clases para el menu
		vm.inicio = { active: true };
		vm.cursos = { active: false };
		vm.categorias = { active: false };
		vm.admin = { active: false };

		// cambios de menu
		vm.change = function (id)
		{
			// Cambiamos los valores
			switch(id){
				case 0:
					vm.inicio = { active: true };
					vm.cursos = { active: false };
					vm.categorias = { active: false };
					vm.admin = { active: false };
					break;
				case 1:
					vm.inicio = { active: false };
					vm.cursos = { active: true };
					vm.categorias = { active: false };
					vm.admin = { active: false };
					break;
				case 2:
					vm.inicio = { active: false };
					vm.cursos = { active: false };
					vm.categorias = { active: true };
					vm.admin = { active: false };
					break;
				case 3:
					vm.inicio = { active: false };
					vm.cursos = { active: false };
					vm.categorias = { active: false };
					vm.admin = { active: true };
					break;
			}
		};

		// Verificamos la ruta
		path = path.split('/');
		
		switch(path[1]){
			case 'init': vm.change(0); break;
			case 'courses': vm.change(1); break;
			case 'categories': vm.change(2); break;
			case 'admin': vm.change(3); break;
		}
	}

	// Configuracion del web component
	var menuPrincipal = {
		templateUrl: './scripts/components/menu-principal/menu-principal.html',
		controller: [Controller]
	};

	angular
		.module('app')
			.component('menuPrincipal', menuPrincipal); // El nombre debe estar con camel case
})();