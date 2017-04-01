/************************************************
Servicio para obtener los capitulo
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function ChapterResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/chapters';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('chapterResource', [
				'$resource',
				'storageFactory',
				ChapterResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function ChapterExtraResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/chapters/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('chapterExtraResource', [
				'$resource',
				'storageFactory',
				ChapterExtraResource
			]);
})();

// Recurso para obtener los capitulos de un curso en especifico
(function (){
	'use strict';

	function ChapterCourseResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/chapters/course/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('chapterCourseResource', [
				'$resource',
				'storageFactory',
				ChapterCourseResource
			]);
})();