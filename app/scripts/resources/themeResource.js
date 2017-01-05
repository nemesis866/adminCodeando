/************************************************
Servicio para obtener los temas
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function ThemeResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/themes';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false },
  			'update': { method: 'PUT' }
  		});
	}

	angular
		.module('app')
			.service('themeResource', [
				'$resource',
				ThemeResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function ThemeExtraResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/themes/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('themeExtraResource', [
				'$resource',
				ThemeExtraResource
			]);
})();

// Recurso para obtener los temas de un capitulo en especifico
(function (){
	'use strict';

	function ThemeChapterResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/themes/chapters/:capitulo/:curso';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('themeChapterResource', [
				'$resource',
				ThemeChapterResource
			]);
})();

// Recurso para actualizar la informacion
(function (){
	'use strict';

	function ThemeDataResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/themes/data';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false },
  			'update': { method: 'PUT' }
  		});
	}

	angular
		.module('app')
			.service('themeDataResource', [
				'$resource',
				ThemeDataResource
			]);
})();