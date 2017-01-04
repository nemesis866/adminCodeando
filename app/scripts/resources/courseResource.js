/************************************************
Servicio para obtener los cursos
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function CourseResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/cursos';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('courseResource', [
				'$resource',
				CourseResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function CourseExtraResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/cursos/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('courseExtraResource', [
				'$resource',
				CourseExtraResource
			]);
})();

// Recurso para GET (uno solo) y DELETE extras
(function (){
	'use strict';

	function CourseAutorResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/cursos/autor/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('courseAutorResource', [
				'$resource',
				CourseAutorResource
			]);
})();