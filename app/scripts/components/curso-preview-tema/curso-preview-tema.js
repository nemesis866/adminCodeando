/*************************************
Webcomponent para curso modal administrar tema
*************************************/

(function (){
    'use strict';

    // Controlador
    function CursoPreviewTema (storageFactory, themeService)
    {
        var vm = this;
        vm.control = 0; // Control para la ventana modal

        // Control de clases
        vm.info = { active: true };
        vm.doc = { active: false };
        vm.vid = { active: false };
        vm.git = { active: false };
        vm.viewInfo = { oculto: false };
        vm.viewDoc = { oculto: true };
        vm.viewVid = { oculto: true };
        vm.viewGit = { oculto: true};

        // Configuración del formulario
        vm.formConfig = {
            required: true,
            pattern: '/^[a-zA-Z]{3,60}$/'
        };

        // Router para menu
        vm.change = function (id)
        {
            switch(id){
                case 0:
                    vm.info = { active: true };
                    vm.doc = { active: false };
                    vm.vid = { active: false };
                    vm.git = { active: false };

                    vm.viewInfo = { oculto: false };
                    vm.viewDoc = { oculto: true };
                    vm.viewVid = { oculto: true };
                    vm.viewGit = { oculto: true };
                    break;
                case 1:
                    vm.info = { active: false };
                    vm.doc = { active: true };
                    vm.vid = { active: false };
                    vm.git = { active: false };

                    vm.viewInfo = { oculto: true };
                    vm.viewDoc = { oculto: false };
                    vm.viewVid = { oculto: true };
                    vm.viewGit = { oculto: true };
                    break;
                case 2:
                    vm.info = { active: false };
                    vm.doc = { active: false };
                    vm.vid = { active: true };
                    vm.git = { active: false };

                    vm.viewInfo = { oculto: true };
                    vm.viewDoc = { oculto: true };
                    vm.viewVid = { oculto: false };
                    vm.viewGit = { oculto: true };
                    break;
                case 3:
                    vm.info = { active: false };
                    vm.doc = { active: false };
                    vm.vid = { active: false };
                    vm.git = { active: true };

                    vm.viewInfo = { oculto: true };
                    vm.viewDoc = { oculto: true };
                    vm.viewVid = { oculto: true };
                    vm.viewGit = { oculto: false };
                    break;
            }
        };

        // Guardamos un tema
        vm.setTheme = function (model)
        {
            // Acciones para model
            if(typeof(model) === 'undefined'){
                model = {};
                model.titulo = '';
            }

            var control = themeService.setTheme(model, vm.themeId);

            // Verificamos el control
            if(control === 1){
                // Cerramos la ventana modal
                vm.closeTheme();
            }
        };

        // Cerramos la ventana modal
        vm.closeTheme = function ()
        {
            // Actualizamos control
            vm.control = 1;

            // Reseteamos las clases
            vm.info = { active: true };
            vm.doc = { active: false };
            vm.vid = { active: false };
            vm.git = { active: false };
            vm.viewInfo = { oculto: false };
            vm.viewDoc = { oculto: true };
            vm.viewVid = { oculto: true };
            vm.viewGit = { oculto: true};

            // Cerramos
            $('#bs-preview-tema-modal-lg').modal('hide');

            // Actualizamos el control
            vm.control = 0;
        };

        // Ventana modal para formulario de tema
        $('#bs-preview-tema-modal-lg').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Button that triggered the modal
            var id = button.data('id'); // Extract info from data-* attributes

            vm.themeId = id; // Guardamos el ID del modal abierto

            // Obtenemos el titulo del tema
            for(var i = 0; i < storageFactory.themes.length; i++){
                if(storageFactory.themes[i]._id === id){
                    document.getElementById('themePreviewTitle').innerHTML = 'Gestionar tema "'+storageFactory.themes[i].titulo+'"';
                    break;
                }
            }
        });

        // Evento llamado antes de cerrar la ventana
        $('#bs-preview-tema-modal-lg').on('hide.bs.modal', function (event) {
            // Verificamos el control
            if(vm.control === 0){
                // Evitamos que la ventana se cierre
                event.preventDefault();
            }
        });
    }

    // Configuracion del web component
    var cursoPreviewTema = {
        templateUrl: './scripts/components/curso-preview-tema/curso-preview-tema.html',
        controller: [
            'storageFactory',
            'themeService',
            CursoPreviewTema
        ]
    };

    angular
        .module('app')
            .component('cursoPreviewTema', cursoPreviewTema); // El nombre debe estar con camel case
})();