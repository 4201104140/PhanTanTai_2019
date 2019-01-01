$.widget('widget.pluploadCustom', $.widget.base, {
    options: {
        name: null,

        //event
        onFileUploaded:null
    },
    _create: function () {
        this._createEvent();
        var uploader = this.element.plupload(this.options);
        this._fixCss();
        this._super();
        this._saveData(uploader);
    },
    _fixCss: function () {
        $('.ui-widget-header', this.element).css('height', '53px');
        $('.plupload_logo', this.element).remove();
        $('.plupload_view_switch', this.element).remove();
        //$('.plupload_droptext', this.element).html('Kéo/Thả ảnh vào đây');
        //$('.plupload_header_title', this.element).html('Chọn ảnh')
        //$('.plupload_header_text', this.element).html('Sau khi upload ảnh xong, vui lòng click vào ảnh để thêm ảnh');

        //var header = $('.plupload_start', this.element);
        //var htmlStr = "&nbsp";
        //htmlStr += "    <label class=\"radio-inline\">";
        //htmlStr += "        <input type=\"radio\" id=\"isPrivateImages\"  name=\"chooseUploadFolder\" checked > Ảnh cá nhân";
        //htmlStr += "    <\/label>";
        //htmlStr += "    <label class=\"radio-inline\">";
        //htmlStr += "        <input type=\"radio\" name=\"chooseUploadFolder\" > Ảnh public";
        //htmlStr += "    <\/label>";
        //var div = $('<div>').addClass('controls').css('display', 'inline-block').html(htmlStr).insertAfter(header);
    },
    _createEvent: function () {
        var self = this;
        $.extend(this.options, {
            init: {
                BeforeUpload: function (up, file) {
                    // Called right before the upload for a given file starts, can be used to cancel it if required
                    //log('[BeforeUpload]', 'File: ', file);
                    self.options.onBeforeUpload && self.options.onBeforeUpload(up, file);

                },

                UploadProgress: function (up, file) {
                    // Called while file is being uploaded
                    //log('[UploadProgress]', 'File:', file, "Total:", up.total);

                    self.options.onUploadProgress && self.options.onUploadProgress(up, file);
                },

                FileFiltered: function (up, file) {
                    // Called when file successfully files all the filters
                    //log('[FileFiltered]', 'File:', file);

                    self.options.onFileFiltered && self.options.onFileFiltered(up, file);

                },

                FilesAdded: function (up, files) {
                    // Called when files are added to queue
                    //log('[FilesAdded]');

                    //plupload.each(files, function (file) {
                    //    log('  File:', file);
                    //});

                    self.options.onFilesAdded && self.options.onFilesAdded(up, files);

                },

                FilesRemoved: function (up, files) {
                    // Called when files are removed from queue
                    //log('[FilesRemoved]');

                    //plupload.each(files, function (file) {
                    //    log('  File:', file);
                    //});

                    self.options.onFilesRemoved && self.options.onFilesRemoved(up, files);

                },

                FileUploaded: function (up, file, info) {
                    // Called when file has finished uploading
                    if (info.response)
                        info.response = JSON.parse(info.response);
                    self.options.onFileUploaded && self.options.onFileUploaded(up, file, info);
                },

                UploadComplete: function (up, files) {
                    // Called when all files are either uploaded or failed
                    //log('[UploadComplete]');

                    self.options.onUploadComplete && self.options.onUploadComplete(up, files);

                },
            }
        });
    }
});
