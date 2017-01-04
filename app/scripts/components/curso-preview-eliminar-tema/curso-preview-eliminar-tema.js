/*************************************
Webcomponent para curso modal eliminar tema
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewEliminarTema (storageFactory, themeService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Eliminamos un tema
		vm.deleteTheme = function ()
		{
			var control = themeService.deleteTheme(vm.themeId);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeTheme();
			}
		};

		// Cerramos la ventana modal
		vm.closeTheme = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Cerramos
			$('#bs-tema-eliminar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de tema
		$('#bs-tema-eliminar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.themeId = id; // Guardamos el ID del modal abierto
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-theme-eliminar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewEliminarTema = {
		templateUrl: './scripts/components/curso-preview-eliminar-tema/curso-preview-eliminar-tema.html',
		controller: [
			'storageFactory',
			'themeService',
			CursoPreviewEliminarTema
		]
	};

	angular
		.module('app')
			.component('cursoPreviewEliminarTema', cursoPreviewEliminarTema); // El nombre debe estar con camel case
})();