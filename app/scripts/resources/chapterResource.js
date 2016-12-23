/************************************************
Servicio para obtener los capitulo
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function ChapterResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/chapters';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('chapterResource', [
				'$resource',
				ChapterResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function ChapterExtraResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/chapters/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('chapterExtraResource', [
				'$resource',
				ChapterExtraResource
			]);
})();