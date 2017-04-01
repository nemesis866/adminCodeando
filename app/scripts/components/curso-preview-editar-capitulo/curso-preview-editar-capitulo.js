/*************************************
Webcomponent para curso modal editar capitulo
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewEditarCapitulo (storageFactory, chapterService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Guardamos un capitulo
		vm.updateChapter = function (model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				// Contenido para el model
				model = {};
				for(var i = 0; i < storageFactory.chapters.length; i++){
					if(storageFactory.chapters[i]._id === vm.cursoId){
						model.titulo = storageFactory.chapters[i].titulo;
					}
				}
			}

			var control = chapterService.updateChapter(model, vm.cursoId);

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
			$('#bs-capitulo-editar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de capitulo
		$('#bs-capitulo-editar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.cursoId = id; // Guardamos el ID del modal abierto

			// Obtenemos el titulo del capitulo a editar
			for(var i = 0; i < storageFactory.chapters.length; i++){
				if(storageFactory.chapters[i]._id === vm.cursoId){
					document.getElementById('editChapter').value = storageFactory.chapters[i].titulo;
				}
			}
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-capitulo-editar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewEditarCapitulo = {
		templateUrl: './scripts/components/curso-preview-editar-capitulo/curso-preview-editar-capitulo.html',
		controller: [
			'storageFactory',
			'chapterService',
			CursoPreviewEditarCapitulo
		]
	};

	angular
		.module('app')
			.component('cursoPreviewEditarCapitulo', cursoPreviewEditarCapitulo); // El nombre debe estar con camel case
})();