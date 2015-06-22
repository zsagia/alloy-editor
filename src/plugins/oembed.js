(function() {
    'use strict';

    if (CKEDITOR.plugins.get('oembed')) {
        return;
    }

    /**
     * CKEditor plugin which allows adding a content from different providers using oEmbed API to the editor.
     *
     * @class CKEDITOR.plugins.oembed
     */
    var oEmbed = {
        init: function(editor) {
            editor.on('paste', function (event) {
                CKEDITOR.plugins.oembed.fetch(editor, event.data.dataValue);
            });
        },

        /**
         * Fetches data for the URL using a configured provider.
         *
         * @method fetch
         * @param {Object} editor Instance of CKEditor.
         * @param {String} url The URL, for which a data should be fetched.
         * @param {String} callback Globally available function, specified as string which will be invoked when the response returns.
         */
        fetch: function(editor, url, callback) {
            callback = callback || 'CKEDITOR.plugins.oembed.contentLoaded';

            var script = document.createElement('script');
            script.src = '//open.iframe.ly/api/oembed?url=' + encodeURI(url) + '&callback=' + callback + '&origin=ipeychev';
            document.body.appendChild(script);

            CKEDITOR.plugins.oembed.contentLoaded = CKEDITOR.plugins.oembed.contentLoaded || function(data) {
                var el = CKEDITOR.dom.element.createFromHtml('<div style="width: 620px; height: 480px;">' + data.html + '</div>');

                editor.insertElement(el);
            };
        }
    };

    CKEDITOR.plugins.add('oembed', oEmbed);

    CKEDITOR.plugins.oembed = oEmbed;
}());