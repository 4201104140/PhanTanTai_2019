$.widget("widget.googlePicker", $.widget.base, {
    options: {
        developerKey: 'AIzaSyCLnNDVNiATrYYA_yrjZuPk6gHCWKHDcyk',
        clientId: '248898453363-19a073fj6b16n1qp1up6pg0pe215f4ac.apps.googleusercontent.com',
        appId: 'task-management-201108',
        scope: [
            "https://www.googleapis.com/auth/drive",
            "https://www.googleapis.com/auth/photos",
            "https://www.googleapis.com/auth/youtube",
            "https://www.googleapis.com/auth/plus.me",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ],
        pickerApiLoaded: false,
        authApiLoaded: false,
        oauthToken: null,
        pickerCallback: function () { },
    },
    _create: function () {
        var self = this;
        window.gapi.load('auth', { 'callback': self._onAuthApiLoad.bind(self) }); // bind(this)->use this.tenbien thay vì this.options.tenbien
        window.gapi.load('picker', { 'callback': self._onPickerApiLoad.bind(self) });

        this._addPublicFunction();
        this._super();
        this._saveData(this.options);
    },
    _addPublicFunction: function () {
        var self = this;
        this.options.build = function () {
            if (!self.options.oauthToken && self.options.authApiLoaded) {
                window.gapi.auth.authorize({
                    'client_id': self.options.clientId,
                    'scope': self.options.scope,
                    'immediate': false
                }, function (authResult) {
                    if (authResult && !authResult.error) {
                        self.options.oauthToken = authResult.access_token;
                        self._createPicker();
                    }
                });
            }
            else {
                self._createPicker();
            }
        };
    },
    _createPicker: function () {
        var self = this;
        if (this.options.oauthToken && this.options.pickerApiLoaded) {
            var picker = new google.picker.PickerBuilder()
                .addView(new google.picker.DocsView()
                    .setIncludeFolders(true)
                    .setOwnedByMe(true))

                .setAppId(this.options.appId)
                .setOAuthToken(this.options.oauthToken)
                .setDeveloperKey(this.options.developerKey)
                .setLocale('vi')
                .setMaxItems(20)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)

                .addView(new google.picker.View(google.picker.ViewId.RECENTLY_PICKED))
                .addView(new google.picker.DocsUploadView()
                    .setIncludeFolders(true))
                //.addView(new google.picker.PhotosView())
                //.addView(new google.picker.View(google.picker.ViewId.PHOTO_UPLOAD))
                .addView(new google.picker.View(google.picker.ViewId.YOUTUBE))
                .addView(new google.picker.WebCamView())
                .addView(new google.picker.ImageSearchView())
                .addView(new google.picker.VideoSearchView())
                .setCallback(function (data) {
                    if (data.action == google.picker.Action.PICKED) {
                        self.options.pickerCallback(data.docs);
                    }
                })
                .build();
            picker.setVisible(true);
        }
    },
    _onAuthApiLoad: function () {
        this.options.authApiLoaded = true;
    },
    _onPickerApiLoad: function () {
        this.options.pickerApiLoaded = true;
    },
    _destroy: function () {
        this.element.html('');
    },
});