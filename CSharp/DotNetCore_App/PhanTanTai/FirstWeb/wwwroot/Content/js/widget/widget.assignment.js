$.widget('widget.assignment', $.widget.base, {
    options: {
        name: null,
        height: '100%',
        items: null,
        clickSave: function () { },
        clickCancel: function () { }
    },
    _create: function () {
        var self = this;
        self.element.addClass('assignment').css({ 'height': self.options.height });

        self.options.assignmentContainer = $('<div>')
			.addClass('assignment-container')
			.appendTo(self.element);

        if (self.options.items && self.options.items.length === 1)
            self._renderData(self.options.items[0]);

        this._super();
        this._addPublicFunction();
        this._saveData(this.options);
    },
    _addPublicFunction: function () {
        var self = this;
        this.options.refreshData = function (items) {
            self._destroy();
            self.options.items = items;
            self._create();
        };
    },
    _renderData: function (items) {
        var self = this;
        if (items.QuestionPart) {
            var questionPartContainer = $('<div>').addClass('question--part-container');
            questionPartContainer.html(items.QuestionPart.QuestionPartContent);
            questionPartContainer.appendTo(self.options.assignmentContainer);
        }

        if (items.Question && items.Answers) {
            var questionContainer = $('<div>').addClass('question-container');
            var questionNumber = $('<div>').addClass('question-number').html('Câu ' + items.QuestionOrder);
            var questionContent = $('<div>').addClass('question-content').html(items.Question.QuestionContent);

            //items.PointWeight && questionContent.append(" (" + items.PointWeight + "đ)")
            questionContainer.append(questionNumber, questionContent);

            var btnSave = $('<button>').addClass('btn btn-lg btn-primary btn-block lf-btn--disabled');
            var answerContainer = $('<div id="answer">').addClass('answer-container');
            $.each(items.Answers, function (index, answer) {
                var answerChoice = $('<div>').addClass('answer-choice');
                var answersResult = items.StudentResult || false;
                var answersSelected = [];
                if (answersResult) {
                    answersSelected = answersResult.split('$');
                }

                if (items.Question.QuestionTypeId && items.Question.QuestionTypeId === 1) {
                    answerChoice.addClass('lf-radio');
                    var radio = $('<input type="radio" id="rd-' + answer.AnswerId + '" name="rd">').appendTo(answerChoice);
                    var label = $('<label for="rd-' + answer.AnswerId + '">').appendTo(answerChoice);
                    radio.click(function () {
                        self._disableBtnSave(self._isInputChecked(), btnSave);
                    });
                    if (answersSelected.length > 1 && answersSelected.indexOf(answer.AnswerId.toString()) > -1) {
                        radio.attr('checked', true);
                    }
                } else {
                    answerChoice.addClass('lf-checkbox');
                    var checkbox = $('<input type="checkbox" id="cb-' + answer.AnswerId + '" name="cb-' + answer.AnswerId + '">').appendTo(answerChoice);
                    var label = $('<label for="cb-' + answer.AnswerId + '">').appendTo(answerChoice);
                    checkbox.click(function () {
                        self._disableBtnSave(self._isInputChecked(), btnSave);
                    });
                    if (answersSelected.length > 1 && answersSelected.indexOf(answer.AnswerId.toString()) > -1) {
                        checkbox.attr('checked', true);
                    }
                }

                var answerContent = $('<div>').addClass('answer-content').html(answer.Content);
                var answerItem = $('<div>').addClass('answer-item').append(answerChoice, answerContent);

                answerContainer.append(answerItem);
            });
            self.options.assignmentContainer.append(questionContainer, answerContainer);

            var btnCancel = $('<button>').addClass('btn btn-lg btn-block').html('Bỏ Qua');
            btnCancel.click(function (e) {
                self.options.clickCancel(e, true);
            }.bind(self));

            var colMd61 = $('<div>').addClass('col-md-6').append(btnCancel);
            btnSave.html('Lưu Kết Quả');

            btnSave.click(function (e) {
                var answerChoosen = '';
                var answers = $("#answer").find("input:checked");

                for (i = 0; i < answers.length; i++) {
                    var answerChoosenSplit = answers[i].id.split('-');
                    var answerId = answerChoosenSplit.pop();

                    answerChoosen += answerId + '$'
                }

                self.options.clickSave(e, {
                    MerchantId: items.Question.MerchantId,
                    QuestionId: items.Question.QuestionId,
                    Result: answerChoosen
                });
            }.bind(self));

            var colMd62 = $('<div>').addClass('col-md-6').append(btnSave);
            var btnGroup = $('<div>').addClass('row').append(colMd61, colMd62);
            self.options.assignmentContainer.append(btnGroup);
            self.options.assignmentContainer.append(btnGroup);
        }
    },
    _isInputChecked: function () {
        var inputCheck = $("#answer").find("input:checked");

        return inputCheck.length > 0 ? true : false;
    },
    _disableBtnSave: function (isInputChecked, btnSave) {
        if (isInputChecked) {
            btnSave.removeClass('lf-btn--disabled');
        } else {
            btnSave.addClass('lf-btn--disabled');
        }
    },
    _refresh: function () {
        var self = this;

        self._destroy();
        self._create();
    },
    _destroy: function () {
        this.element.html('');
    }
});