$.widget('widget.texteditor', $.widget.base, {
    options: {
        // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
        // The full preset from CDN which we used as a base provides more features than we need.
        // Also by default it comes with a 3-line toolbar. Here we put all buttons in a single row.
        toolbar: [
            { name: 'document', items: ['Source', 'Templates', 'Preview', 'Print'] },
            { name: 'clipboard', items: ['Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', 'SelectAll'] },
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize', 'size'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'BidiLtr', 'BidiRtl'] },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote'] },
            { name: 'insert', items: ['Widgets', 'Table', 'SpecialChar', '-', 'Mathjax', 'EqnEditor', 'HorizontalRule', 'Chart'] },
            { name: 'tools', items: ['Scayt', 'Maximize'] },
        ],
        language: 'vi',
        // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
        // One HTTP request less will result in a faster startup time.
        // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
        customConfig: '',
        // Sometimes applications that convert HTML to PDF prefer setting image width through attributes instead of CSS styles.
        // For more information check:
        //  - About Advanced Content Filter: http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
        //  - About Disallowed Content: http://docs.ckeditor.com/#!/guide/dev_disallowed_content
        //  - About Allowed Content: http://docs.ckeditor.com/#!/guide/dev_allowed_content_rules
        disallowedContent: 'img{width,height,float}',
        extraAllowedContent: 'img[width,height,align]',
        // Enabling extra plugins, available in the full-all preset: http://ckeditor.com/presets-all
        extraPlugins: 'tableresize,stylesheetparser,closedialogoutside,custimage,autoembed,embedsemantic,mathjax',
        mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
        /*********************** File management support ***********************/
        // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
        // solution with file upload/management capabilities, like for example CKFinder.
        // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration
        // Uncomment and correct these lines after you setup your local CKFinder instance.
        // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
        // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
        /*********************** File management support ***********************/
        // Make the editing area bigger than default.
        removePlugins: 'image,image2,imageresponsive,autosave,codesnippet,yaqr',
        height: '450px',
        resize_enabled: false,
        dropdownmenumanager: {
            'Widgets': {
                items: [
                    {
                        name: 'textWidget',
                        label: 'Thêm tập tin từ hệ thống',
                        command: 'insertImage',
                        order: 1,
                        icon: '/Content/Images/png-file.png'
                    },
                    {
                        name: 'Base64image',
                        label: 'Thêm ảnh cố định',
                        command: 'base64imageDialog',
                    },
                    {
                        name: 'Youtube',
                        label: 'Thêm video từ youtube',
                        command: 'youtube',
                        icon: '/Content/plugins/ckeditor492/plugins/youtube/images/icon.png'
                    },
                    {
                        name: 'Uploadcare',
                        label: 'Thêm ảnh từ Facebook/Intagram/...',
                        command: 'showUploadcareDialog'
                    },
                    {
                        name: 'googlePicker',
                        label: 'Thêm ảnh từ Google',
                        command: 'insertFromGoogle',
                        icon: '/Content/Images/drive.png'
                    },
                ],
                label: {
                    text: 'Widgets',
                    width: 45
                },
                iconPath: '/Content/Images/images.png'
            },
        },
        // An array of stylesheets to style the WYSIWYG area.
        // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
        contentsCss: ['https://cdn.ckeditor.com/4.9.2/full-all/contents.css'],
        // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
        bodyClass: 'document-editor',
        // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
        format_tags: 'p;h1;h2;h3;pre',
        // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
        removeDialogTabs: 'image:advanced;link:advanced',
        // Define the list of styles which should be available in the Styles dropdown list.
        // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
        // (and on your website so that it rendered in the same way).
        // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
        // that file, which means one HTTP request less (and a faster startup).
        // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
        stylesSet: [
            /* Inline Styles */
            { name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
            { name: 'Cited Work', element: 'cite' },
            { name: 'Inline Quotation', element: 'q' },
            /* Object Styles */
            {
                name: 'Special Container',
                element: 'div',
                styles: {
                    padding: '5px 10px',
                    background: '#eee',
                    border: '1px solid #ccc'
                }
            },
            {
                name: 'Compact table',
                element: 'table',
                attributes: {
                    cellpadding: '5',
                    cellspacing: '0',
                    border: '1',
                    bordercolor: '#ccc'
                },
                styles: {
                    'border-collapse': 'collapse'
                }
            },
            { name: 'Borderless Table', element: 'table', styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
            { name: 'Square Bulleted List', element: 'ul', styles: { 'list-style-type': 'square' } },

            // Enhanced Image (https://ckeditor.com/cke4/addon/image2) style.
            { name: 'Banner', type: 'widget', widget: 'image', attributes: { 'class': 'bigBanner' } },
            { name: 'Clean Image', type: 'widget', widget: 'image', attributes: { 'class': 'image-clean' } },
            { name: 'Grayscale Image', type: 'widget', widget: 'image', attributes: { 'class': 'image-grayscale' } },

            // Media Embed (https://ckeditor.com/cke4/addon/embedSemantic) styles.
            { name: '240p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-240p' }, group: 'size' },
            { name: '360p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-360p' }, group: 'size' },
            { name: '480p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-480p' }, group: 'size' },
            { name: '720p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-720p' }, group: 'size' },
            { name: '1080p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-1080p' }, group: 'size' },
        ]
    },
    _create: function () {
        var self = this;
        //this.options.skin = this.options.skin || 'moono-lisa';
        this.options.template.attr('id', this.options.name);
        this.options.editor = CKEDITOR.replace(this.options.name, this.options);
        var editor = this.options.editor;


        editor.setData(this.options.data || "");

        //TODO: add button as ckeditor plugin
        editor.addCommand('insertImage', {
            exec: function (edt) {
                framework.common.openPopup(self.options.name, {
                    name: 'testPopup',
                    url: '/UIFileMgt/File/FileList',
                    title: 'Choose Images',
                    autoResize: true,
                    data: {
                        onMessageReceive: onMessageReceive
                    }
                }, {
                    CommandAction: {
                        IsImage: true
                    }
                });
            }
        });

        var self = this;
        editor.addCommand('insertFromGoogle', {
            exec: function (edt) {
                var picker = framework.global.findElementByPageId(self.options._pageId, 'googlePicker');
                picker.build();
            }
        });
        //if (this.options.buttons) {
        //    $.each(this.options.buttons, function (key, value) {
        //        editor.addCommand(value.id, {
        //            exec: function (edt) {
        //                value.onclick(edt);
        //            }
        //        });
        //        editor.ui.addButton(value.id, {
        //            title: 'hello',
        //            label: value.text,
        //            command: value.id,
        //            toolbar: 'tools',
        //            icon: value.icon,
        //        });
        //    });
        //}
        this.options.editor.addImage = function (url) {
            if (url != null) {
                var element = CKEDITOR.dom.element.createFromHtml('<img src="' + url + '"/>');
                if (element != null) {
                    editor.insertElement(element);
                }
            }
        };
        this.options.editor.getPureText = function () {
            return editor.document.getBody().getText();
        }
        this._super();

        //use for receiving message from FileList.js, please don't remove this
        var onMessageReceive = function (message) {
            $.each(message.data, function (key, value) {
                self.options.editor.addImage(value.linkToFile);
            });
            message.callback && message.callback();
        }

        this._saveData(this.options.editor);
    },
});