/*************************************
Webcomponent para curso modal eliminar capitulo
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewEliminarCapitulo (storageFactory, chapterService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Guardamos un capitulo
		vm.deleteChapter = function ()
		{
			var control = chapterService.deleteChapter(vm.chapterId);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeChapter();
				// Reestablecemos temas
				storageFactory.chapterClass = { oculto : false };
				storageFactory.themeClass = { oculto: true };
				storageFactory.themeHeader = '';
			}
		};

		// Cerramos la ventana modal
		vm.closeChapter = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Cerramos
			$('#bs-capitulo-eliminar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de capitulo
		$('#bs-capitulo-eliminar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.chapterId = id; // Guardamos el ID del modal abierto
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-capitulo-eliminar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewEliminarCapitulo = {
		templateUrl: './scripts/components/curso-preview-eliminar-capitulo/curso-preview-eliminar-capitulo.html',
		controller: [
			'storageFactory',
			'chapterService',
			CursoPreviewEliminarCapitulo
		]
	};

	angular
		.module('app')
			.component('cursoPreviewEliminarCapitulo', cursoPreviewEliminarCapitulo); // El nombre debe estar con camel case
})();