/************************************************
Servicio para obtener los temas
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function ThemeResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/themes';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false },
  			'update': { method: 'PUT' }
  		});
	}

	angular
		.module('app')
			.service('themeResource', [
				'$resource',
				'storageFactory',
				ThemeResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function ThemeExtraResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/themes/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('themeExtraResource', [
				'$resource',
				'storageFactory',
				ThemeExtraResource
			]);
})();

// Recurso para obtener los temas de un capitulo en especifico
(function (){
	'use strict';

	function ThemeChapterResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/themes/chapters/:capitulo/:curso';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('themeChapterResource', [
				'$resource',
				'storageFactory',
				ThemeChapterResource
			]);
})();

// Recurso para actualizar la informacion
(function (){
	'use strict';

	function ThemeDataResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/themes/data';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false },
  			'update': { method: 'PUT' }
  		});
	}

	angular
		.module('app')
			.service('themeDataResource', [
				'$resource',
				'storageFactory',
				ThemeDataResource
			]);
})();