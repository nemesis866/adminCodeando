/*************************************
Webcomponent para eliminar categoria
*************************************/

(function (){
	'use strict';

	// Controlador
	function CategoriaEliminar (storageFactory, categoryService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Eliminamos un tema
		vm.deleteCategory = function ()
		{
			var control = categoryService.deleteCategory(vm.categoryId);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeCategory();
			}
		};

		// Cerramos la ventana modal
		vm.closeCategory = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Cerramos
			$('#bs-categoria-eliminar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de tema
		$('#bs-categoria-eliminar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.categoryId = id; // Guardamos el ID del modal abierto
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-categoria-eliminar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var categoriaEliminar = {
		templateUrl: './scripts/components/categoria-eliminar/categoria-eliminar.html',
		controller: [
			'storageFactory',
			'categoryService',
			CategoriaEliminar
		]
	};

	angular
		.module('app')
			.component('categoriaEliminar', categoriaEliminar); // El nombre debe estar con camel case
})();