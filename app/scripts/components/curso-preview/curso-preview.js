/*************************************
Webcomponent para preview del curso
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreview ($routeParams, $scope, storageFactory, categoryService, chapterService, courseService, themeService, fncService)
	{
		var vm = this;
		vm.param = $routeParams.id;

		// Cambiamos el titulo
		document.title = 'Preview curso | Codeando.org';

		// Obtenemos los datos del curso a editar
		courseService.getByIdCourse(vm.param);
		// Obtenemos los capitulos del curso a editar
		chapterService.getByIdCourse(vm.param);

		// Maneja de la clase oculto
		vm.viewList = { oculto: true }; // Lista capitulos
		vm.viewMsg = { oculto: false }; // msg capitulo
		vm.viewListTheme = { oculto: true }; // Lista temas
		vm.viewMsgTheme = { oculto: false }; // msg seleccionar capitulo
		vm.viewMsg2Theme = { oculto: false }; // msg temas

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,20}$/'
		};
		// pattern: '/^[a-zA-Z0-9]{1,20}$/',

		// Ponemos en escucha
		vm.valueWitch = function ()
		{
			// Obtenemos el titulo del curso
			vm.titulo = storageFactory.courseEdit.titulo;
			// Obtenemos los capitulos del curso
			vm.chapters = storageFactory.chapters;
			// Obtenemos los temas del capitulo
			vm.themes = storageFactory.themes;
			// Obtenemos el ID del capitulo
			vm.chapter = storageFactory.chapterID;
			// Obtenemos el valor
			vm.viewMsgTheme = storageFactory.chapterClass;
			vm.viewListTheme = storageFactory.themeClass;
			// Titulo de la seccion de temas
			vm.chapterTitle = storageFactory.themeHeader;

			// Verificamos si hay capitulo
			if(!fncService.isEmpty(vm.chapters)){
				vm.viewList = { oculto: false };
				vm.viewMsg = { oculto: true };
			}

			// Verificamos si hay temas
			if(!fncService.isEmpty(vm.themes)){
				// Si hay temas
				vm.viewMsg2Theme = { oculto: true };
			} else {
				// Si no hay temas
				vm.viewMsg2Theme = { oculto: false };
			}
		};

		// Mostramos la lista de temas del capitulo seleccionado
		vm.previewTheme = function (id)
		{
			// Guardamos el ID del capitulo
			storageFactory.chapterID = id;
			
			// Mostramos la lista de temas
			storageFactory.chapterClass = { oculto: true };
			storageFactory.themeClass = { oculto: false };

			// Obtenemos el titulo del capitulo
			for(var i = 0; i < storageFactory.chapters.length; i++){
				if(storageFactory.chapters[i]._id === id){
					storageFactory.themeHeader = '"'+storageFactory.chapters[i].titulo+'"';
				}
			}

			// Limpiamos los temas
			storageFactory.themes = {};

			// Obtenemos los temas del capitulo
			storageFactory.themes = themeService.getByIdChapter(id, vm.param);
		};

		// En escucha de cambios
		$scope.$watch(vm.valueWitch);
	}

	// Configuracion del web component
	var cursoPreview = {
		templateUrl: './scripts/components/curso-preview/curso-preview.html',
		controller: [
				'$routeParams',
				'$scope',
				'storageFactory',
				'categoryService',
				'chapterService',
				'courseService',
				'themeService',
				'fncService',
				CursoPreview
			]
	};

	angular
		.module('app')
			.component('cursoPreview', cursoPreview); // El nombre debe estar con camel case
})();