/************************************************
Factory para compartir datos entre los controladores
************************************************/

(function (){
	'use strict';

	function StorageFactory()
	{
    var storage = {
        capitulosEdit: {}, // Objeto para guardar los capitulos a editar
    	categories: {}, // Objeto para almacenas categorias
    	categoryEdit: '', // titulo de la categoria a editar
        chapters: {}, // Objeto para almacenar los capitulos
        chapterClass: { oculto: false }, // Guardamos el valor de la clase
        chapterEdit: {}, // Objeto para almacenar el capitulo a editar
        chapterID: '', // Guardamos el ID del capitulo
    	courses: {}, // Objeto para almacenar los cursos
    	courseEdit: {}, // Objeto para almacenar un curso en especifico
        files: {}, // Objeto para guardar los archivos de los temas
        filesView: {}, // Objeto para visualizar un archivo
        themes: {}, // Objeto para almacenar los temas de un capitulo
        themeBuild: {}, // Guardamos el tema en cuestion para construccion
        themeClass: { oculto: true }, //Guardamos el valor de la clase
        themeEdit: {}, // Objeto para almacenar un tema en especifico
        themeHeader: '', // Guardamos el titulo de la seccion de temas
        urlServer: 'http://127.0.0.1:5000', // Url del servidor DB
    	user: {
    		id: 1234567890, // ID del usuario
    		name: 'Paulo Andrade', // Nombre del usuario
    		nivel: 10, // Nivel de accesibilidad
    		userName: 'nemesis866' // User name
    	}
    };

    return storage;
	}

	angular
		.module('app')
			.factory('storageFactory', [
				StorageFactory
			]);
})();