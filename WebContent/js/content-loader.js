/// <reference path="../references/jquery-1.11.2.js" />

var contentLoader = (function ($) {

    var view = (function () {
        function createHolder() {
            var holder = $('<div>', { class: 'ch-content-holder' });
            $('body').append(holder);
            return holder;
        }

        function show() {

        }
        function hide() {

        }

        return {
            show: show,
            hide: hide
        };
    } ());

    var model = (function () {
        function getContent(uri) {
            if (!uri) {
                throw new Error('missing uri agrument');
            }

            var def = $.Deferred();

            $.ajax({
                url: uri,
                method: 'GET',
                success: function (data) {
                    def.resolve(data);
                },
                error: function (err) {
                    def.reject(err);
                }
            });

            return def.promise();
        }

        return {
            getContent: getContent
        };
    } ());

    var controller = (function () {

        return {};
    })



    return {
        load: controller.load,
        clear: controller.clear,
        show: controller.show,
        hide: controller.hide
    }

} (jQuery));