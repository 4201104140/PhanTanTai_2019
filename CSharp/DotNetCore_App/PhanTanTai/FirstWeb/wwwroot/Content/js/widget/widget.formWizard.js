/* 
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.08.10
 */
$.widget('widget.formWizard', $.widget.base, {
    options: {
        name: null,
        data: []
    },
    _create: function () {
        var self = this;
        
        //this.element.html('<form role="form" class="f1 text-center"> <h3>Register To Our App</h3> <p>Fill in the form to get instant access</p><div class="f1-steps"> <div class="f1-progress"> <div class="f1-progress-line" data-now-value="16.66" data-number-of-steps="3" style="width: 16.66%;"></div></div><div class="f1-step active"> <div class="f1-step-icon"><i class="fa fa-user"></i></div><p>about</p></div><div class="f1-step"> <div class="f1-step-icon"><i class="fa fa-key"></i></div><p>account</p></div><div class="f1-step"> <div class="f1-step-icon"><i class="fa fa-twitter"></i></div><p>social</p></div></div><fieldset> <h4>Tell us who you are:</h4> <div class="form-group"> <label class="sr-only" for="f1-first-name">First name</label> <input type="text" name="f1-first-name" placeholder="First name..." class="f1-first-name form-control" id="f1-first-name"> </div><div class="form-group"> <label class="sr-only" for="f1-last-name">Last name</label> <input type="text" name="f1-last-name" placeholder="Last name..." class="f1-last-name form-control" id="f1-last-name"> </div><div class="form-group"> <label class="sr-only" for="f1-about-yourself">About yourself</label> <textarea name="f1-about-yourself" placeholder="About yourself..." class="f1-about-yourself form-control" id="f1-about-yourself"></textarea> </div><div class="f1-buttons"> <button type="button" class="btn btn-next">Next</button> </div></fieldset> <fieldset> <h4>Set up your account:</h4> <div class="form-group"> <label class="sr-only" for="f1-email">Email</label> <input type="text" name="f1-email" placeholder="Email..." class="f1-email form-control" id="f1-email"> </div><div class="form-group"> <label class="sr-only" for="f1-password">Password</label> <input type="password" name="f1-password" placeholder="Password..." class="f1-password form-control" id="f1-password"> </div><div class="form-group"> <label class="sr-only" for="f1-repeat-password">Repeat password</label> <input type="password" name="f1-repeat-password" placeholder="Repeat password..." class="f1-repeat-password form-control" id="f1-repeat-password"> </div><div class="f1-buttons"> <button type="button" class="btn btn-previous">Previous</button> <button type="button" class="btn btn-next">Next</button> </div></fieldset> <fieldset> <h4>Social media profiles:</h4> <div class="form-group"> <label class="sr-only" for="f1-facebook">Facebook</label> <input type="text" name="f1-facebook" placeholder="Facebook..." class="f1-facebook form-control" id="f1-facebook"> </div><div class="form-group"> <label class="sr-only" for="f1-twitter">Twitter</label> <input type="text" name="f1-twitter" placeholder="Twitter..." class="f1-twitter form-control" id="f1-twitter"> </div><div class="form-group"> <label class="sr-only" for="f1-google-plus">Google plus</label> <input type="text" name="f1-google-plus" placeholder="Google plus..." class="f1-google-plus form-control" id="f1-google-plus"> </div><div class="f1-buttons"> <button type="button" class="btn btn-previous">Previous</button> <button type="submit" class="btn btn-submit">Submit</button> </div></fieldset> </form>');
        self._draw(self.options.data).appendTo(self.element);
        
        $('.f1 .btn-next').click(function (e) {
            var data = [];
            var form = $("#" + e.currentTarget.id);

            jQuery.extend(jQuery.validator.messages, {
                required: "Bắt buộc phải nhập",
                min: jQuery.validator.format("Giá trị nhập không được nhỏ hơn {0}.")
            });
            if (form.valid()) {
                var ar = form.serializeArray();
                ar.forEach(function (value) {
                    data[value.name] = value.value;
                });
                $.extend(e.currentTarget, {
                    data: data
                });
                self.options.buttonClick(e.currentTarget);



                //=================================
                // button next
                var parent_fieldset = $(this).parents('fieldset');
                var next_step = true;
                // navigation steps / progress steps
                var current_active_step = $(this).parents('.f1').find('.f1-step.active');
                var progress_line = $(this).parents('.f1').find('.f1-progress-line');

                // fields validation
                parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function () {
                    if ($(this).val() == "") {
                        $(this).addClass('input-error');
                        next_step = false;
                    }
                    else {
                        $(this).removeClass('input-error');
                    }
                });
                // fields validation

                if (next_step) {
                    parent_fieldset.fadeOut(400, function () {
                        // change icons
                        current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                        // progress bar
                        bar_progress(progress_line, 'right');
                        // show next step
                        $(this).next().fadeIn();
                        // scroll window to beginning of the form
                        scroll_to_class($('.f1'), 20);
                    });
                }
            }
            
        });
        this._super();
        this._saveData(this);
    },
    onNext: function () {
        
    },
    _createEvent: function () {
        var self = this;
    },
    _draw: function (data) {
        var self = this;
        var box = $("<div>").addClass("f1 text-center");
        $("<h3>").html(data.Title).appendTo(box);
        $("<p>").html(data.Description).appendTo(box);

        //============================================================
        var f1_steps = $("<div>").addClass("f1-steps").appendTo(box);
        $("<div>")
            .addClass("f1-progress")
            .append(
                $("<div>")
                    .addClass("f1-progress-line")
                    .attr({
                        "data-now-value": "16.66",
                        "data-number-of-steps": Object.getOwnPropertyNames(data.Step).length
                    })
                    .css({ "width": "16.66%" })
            ).appendTo(f1_steps);
        $.each(data.Step, function (k, v) {
            $("<div>").addClass("f1-step").addClass(v.isActive)
                .append(
                    $("<div>").addClass("f1-step-icon").append($("<i>").addClass(v.icon))
                ).append(
                    $("<p>").html(v.title)
                ).appendTo(f1_steps);
        });


        //===============================================================
        $.each(data.Step, function (k, v) {
            var field = $("<fieldset>").appendTo(box);
            var form = $("<form>").addClass("form-horizontal").html(v.content).appendTo(field);
            var button = $("<div>").addClass("f1-buttons").appendTo(form);

            $.each(v.button, function (key, value) {
                $("<button>").addClass(value.class).attr({ "type": "button", "id": value.id }).html(value.title).appendTo(button);
                form.attr({ "id": value.id });
            });
        });
        return $("<div>").append(box).append($("<script>").attr({ "src": "/Content/plugins/FormWizard/scripts.js" }));
    },
    _renderMoney(data) {
        var val = data || 0;
        if (w2utils.isMoney(val)) {
            val = w2utils.formatNumber(val, w2utils.settings.currencyPrecision, w2utils.settings.groupSymbol);
            val = w2utils.settings.currencyPrefix + val + w2utils.settings.currencySuffix;
        }
        return val;
    },
    _destroy: function () {
        this.element.html('');
    },
    reset: function (data) {
        this._destroy();
        this.options.data = data;
        this._create();
    }
});