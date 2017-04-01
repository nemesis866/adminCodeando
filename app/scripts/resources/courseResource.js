/************************************************
Servicio para obtener los cursos
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function CourseResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/cursos';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('courseResource', [
				'$resource',
				'storageFactory',
				CourseResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function CourseExtraResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/cursos/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('courseExtraResource', [
				'$resource',
				'storageFactory',
				CourseExtraResource
			]);
})();

// Recurso para GET (uno solo) y DELETE extras
(function (){
	'use strict';

	function CourseAutorResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/cursos/autor/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('courseAutorResource', [
				'$resource',
				'storageFactory',
				CourseAutorResource
			]);
})();