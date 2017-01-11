/*************************************
Webcomponent para curso modal administrar tema
*************************************/

(function (){
    'use strict';

    // Controlador
    function CursoPreviewTema ($routeParams, $scope, storageFactory, fncService, themeService)
    {
        var vm = this;

        // Obtenemos parametros
        vm.curso = $routeParams.curso;
        vm.tema = $routeParams.tema;

        // Cambiamos el titulo
        document.title = 'Preview tema | Codeando.org';

        // Configuración del formulario
        vm.formConfig = {
            required: true,
            pattern: '/^[a-zA-Z]{3,60}$/'
        };
        
        // Obtenemos el tema en concreto
        themeService.getByIdTheme(vm.tema);

        // Ponemos en escucha
        vm.themeWatch = function ()
        {
            vm.themeTitle = storageFactory.themeBuild.titulo;
        };

        // Guardamos la informacion del tema
        vm.setTheme = function (model)
        {
            // Acciones para model
            if(typeof(model) === 'undefined'){
                model = {};
                model.info = storageFactory.themeBuild.info;
                model.doc = storageFactory.themeBuild.doc;
                model.vid = storageFactory.themeBuild.video;
                model.git = storageFactory.themeBuild.github;
            }
            if(typeof(model.info) === 'undefined'){
                model.info = storageFactory.themeBuild.info;
            }
            if(typeof(model.doc) === 'undefined'){
                model.doc = storageFactory.themeBuild.doc;
            }
            if(typeof(model.vid) === 'undefined'){
                model.vid = storageFactory.themeBuild.video;
            }
            if(typeof(model.git) === 'undefined'){
                model.git = storageFactory.themeBuild.github;   
            }

            var control = themeService.setData(model, vm.tema);

            // Verificamos el control
            if(control === 1){
                
            }
        };

        // Acciones para la caja de herramientas del textarea
        vm.toolbox = function (id, identificador)
        {
            if(id === 1){
                // Añadimos opcion de codigo
                vm.sel = fncService.getCursorSelection(document.getElementById(identificador));
                if(fncService.isEmpty(vm.sel)){
                    // Si no hay texto seleccionado usamos uno por defecto
                    vm.selAux = '// aqui va el codigo';
                    vm.sel = '';
                } else {
                    vm.selAux = vm.sel;
                }
                vm.inner = '[code]'+vm.selAux+'[/code]'; // Contenido a insertar
                vm.pos = fncService.getCursorPosition(document.getElementById(identificador)); // Obtenemos la posicion del puntero
                vm.texto = document.getElementById(identificador).value; // Obtenemos el contenido del textarea

                // reemplazamos todo el contenido
                vm.texto = vm.texto.substr(0, vm.pos) + vm.inner + vm.texto.substr(vm.pos + vm.sel.length, vm.texto.length);

                document.getElementById(identificador).value = vm.texto;
                fncService.setCursorPosition(document.getElementById(identificador), vm.pos + (vm.inner.length - 7)); // Colocamos el cursor al final del texto insertado
                document.getElementById(identificador).focus();
            } else if(id === 2){
                // Añadimos la opcion de negrita
                vm.sel = fncService.getCursorSelection(document.getElementById(identificador)); // Obtenemos seleccion
                vm.inner = '[b]'+vm.sel+'[/b]';
                vm.pos = fncService.getCursorPosition(document.getElementById(identificador));
                vm.texto = document.getElementById(identificador).value;

                // reemplazamos el texto
                vm.texto = vm.texto.substr(0, vm.pos) + vm.inner + vm.texto.substr(vm.pos + vm.sel.length, vm.texto.length);

                document.getElementById(identificador).value = vm.texto;
                fncService.setCursorPosition(document.getElementById(identificador), vm.pos + vm.inner.length);
                document.getElementById(identificador).focus();
            } else if(id === 3){
                // Añadimos la opcion de cursiva
                vm.sel = fncService.getCursorSelection(document.getElementById(identificador)); // Obtenemos seleccion
                vm.inner = '[I]'+vm.sel+'[/I]';
                vm.pos = fncService.getCursorPosition(document.getElementById(identificador));
                vm.texto = document.getElementById(identificador).value;

                // reemplazamos el texto
                vm.texto = vm.texto.substr(0, vm.pos) + vm.inner + vm.texto.substr(vm.pos + vm.sel.length, vm.texto.length);

                document.getElementById(identificador).value = vm.texto;
                fncService.setCursorPosition(document.getElementById(identificador), vm.pos + vm.inner.length);
                document.getElementById(identificador).focus();
            } else if(id === 4){
                // Añadimos la opcion de subrayado
                vm.sel = fncService.getCursorSelection(document.getElementById(identificador)); // Obtenemos seleccion
                vm.inner = '[u]'+vm.sel+'[/u]';
                vm.pos = fncService.getCursorPosition(document.getElementById(identificador));
                vm.texto = document.getElementById(identificador).value;

                // reemplazamos el texto
                vm.texto = vm.texto.substr(0, vm.pos) + vm.inner + vm.texto.substr(vm.pos + vm.sel.length, vm.texto.length);

                document.getElementById(identificador).value = vm.texto;
                fncService.setCursorPosition(document.getElementById(identificador), vm.pos + vm.inner.length);
                document.getElementById(identificador).focus();
            } else if(id === 5){
                // Añadimos la opcion de tachado
                vm.sel = fncService.getCursorSelection(document.getElementById(identificador)); // Obtenemos seleccion
                vm.inner = '[t]'+vm.sel+'[/t]';
                vm.pos = fncService.getCursorPosition(document.getElementById(identificador));
                vm.texto = document.getElementById(identificador).value;

                // reemplazamos el texto
                vm.texto = vm.texto.substr(0, vm.pos) + vm.inner + vm.texto.substr(vm.pos + vm.sel.length, vm.texto.length);

                document.getElementById(identificador).value = vm.texto;
                fncService.setCursorPosition(document.getElementById(identificador), vm.pos + vm.inner.length);
                document.getElementById(identificador).focus();
            }
        };

        // Ponemos en escucha
        $scope.$watch(vm.themeWatch);
    }

    // Configuracion del web component
    var cursoPreviewTema = {
        templateUrl: './scripts/components/curso-preview-tema/curso-preview-tema.html',
        controller: [
            '$routeParams',
            '$scope',
            'storageFactory',
            'fncService',
            'themeService',
            CursoPreviewTema
        ]
    };

    angular
        .module('app')
            .component('cursoPreviewTema', cursoPreviewTema); // El nombre debe estar con camel case
})();