$.widget('widget.viewExam', $.widget.base, {
    options: {
        name: null,
        height: '100%',
        items: null,
        examDetail: null,
        clickItem: function () { }
    },
    _create: function () {
        var self = this;
        self.element.addClass('exam').css({ 'height': self.options.height });

        self.options.examContainer = $('<div>')
			.addClass('exam-container')
			.appendTo(self.element);

        if (self.options.items)
            self._renderData(self.options.items, self.options.examDetail);

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
    _renderData: function (items, examDetail) {
        var self = this;
        var header = $('<div>').addClass('exam-header');

        examDetail && examDetail.Header && header.html(examDetail.Header);
        self.options.examContainer.append(header);

        for (index in items) {
            var nextQuestionPartId = items[(parseInt(index) + 1)] && items[(parseInt(index) + 1)].QuestionPart
                ? items[(parseInt(index) + 1)].QuestionPart.QuestionPartId
                : 0;
            if (items[index].QuestionPart && items[index].QuestionPart.QuestionPartId !== nextQuestionPartId
			) {
                var questionPartContainer = $('<div>').addClass('question-part');
                questionPartContainer.html(items[index].QuestionPart.QuestionPartContent);
                questionPartContainer.appendTo(self.options.examContainer);
            }
            if (items[index].Question && items[index].Answers) {
                var answerContainer = $('<div>').addClass('answer');
                var questionContainer = $('<div>').addClass('question');
                var questionNumber = $('<b>').addClass('question-number').html('Câu: ' + (parseInt(index) + 1));
                var questionContent = $('<div>').addClass('question-content').html(items[index].Question.QuestionContent);

                questionContainer.append(questionNumber, questionContent);

                $.each(items[index].Answers, function (indexAnswer, answer) {
                    var answerNumber = $('<b>').addClass('answer-number').html(indexAnswer + 1 + '.');
                    var answerContent = $('<div>').addClass('answer-content').html(answer.Content);
                    var answerItem = $('<div>').addClass('answer-item').append(answerNumber, answerContent)

                    answerContainer.append(answerItem)
                });

                self.options.examContainer.append(questionContainer, answerContainer);
            }
        }

        var footer = $('<div>').addClass('exam-footer');

        examDetail && examDetail.Footer && footer.html(examDetail.Footer);
        self.options.examContainer.append(footer);
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