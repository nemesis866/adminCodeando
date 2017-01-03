/*************************************
Webcomponent para curso modal crear capitulo
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewNuevoCapitulo (chapterService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,60}$/'
		};

		// Guardamos un capitulo
		vm.setChapter = function (model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				model = {};
				model.titulo = '';
			}

			var control = chapterService.setChapter(model, vm.cursoId);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeChapter();
			}
		};

		// Cerramos la ventana modal
		vm.closeChapter = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Cerramos
			$('#bs-capitulo-nuevo-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de capitulo
		$('#bs-capitulo-nuevo-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.cursoId = id; // Guardamos el ID del modal abierto
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-capitulo-nuevo-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewNuevoCapitulo = {
		templateUrl: './scripts/components/curso-preview-nuevo-capitulo/curso-preview-nuevo-capitulo.html',
		controller: [
			'chapterService',
			CursoPreviewNuevoCapitulo
		]
	};

	angular
		.module('app')
			.component('cursoPreviewNuevoCapitulo', cursoPreviewNuevoCapitulo); // El nombre debe estar con camel case
})();