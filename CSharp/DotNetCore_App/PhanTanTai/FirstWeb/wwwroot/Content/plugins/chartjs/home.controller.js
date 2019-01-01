"use strict",
    angular.module("naut").controller("homeController",
    ["$scope", "envService", "homeService", "$state", "$filter", "$rootScope", function ($scope, envService, homeService, $state, $filter, $rootScope) {
        var vm = $scope;
        var apiUrl = envService.read('apiUrl');
        var dateFilter = $filter("date");
        vm.isMyAppointmentLoading = true;
        vm.drawLeftChart = drawLeftChart;
        vm.weekYear = [];//to display year and weekOfYear on chart
        vm.fourteenWeeksOfYear = caculateFourteenWeeks();
        //get current username
        //homeService.getUserName().then(function (response) {
        //    $rootScope.currentUserName = response.data;
        //})
        homeService.getCurrentAppointments().then(function (response) {
            vm.myAppointments = response.data;
            angular.forEach(vm.myAppointments, function (appointment) {
                appointment.date = $filter("date")(appointment.date, $rootScope.dateFormat);
                appointment.startTime = new Date(appointment.startTime);
            });
            vm.isMyAppointmentLoading = false;
        });

        vm.toContact = function () {
            $state.go("app.patient.add");
        }        
        function drawHomePageChart() {
            var dateFilter = {};
            var invitationsPerWeek14 = [];
            var appointmentsPerWeek14 = [];
            var evaluationRpsPerWeek14 = []
            vm.invitationsPerWeek12 = [];
            vm.appointmentsPerWeek12 = [];
            vm.evaluationRpsPerWeek12 = [];
            vm.evaluationDivideInvitation = [];
            vm.appointmentDivideInvitation = [];
            vm.evaluationDivideInvitationWithSum = [];
            vm.appointmentDivideInvitationWithSum = [];
            dateFilter.toDate = new Date();
            dateFilter.fromDate = new Date();
            dateFilter.fromDate.setDate(dateFilter.fromDate.getDate() - 15 * 7);
            homeService.getEvaluationReports(dateFilter).then(function (response) {
                var evaluationsData = response.data;
                homeService.getInvitationsAppointments(dateFilter).then(function (response) {
                    var invitationsData = response.data.invitations;
                    var appointmentData = response.data.appointments;
                    //init data for 14 weeks
                    for (var j = 0; j < vm.fourteenWeeksOfYear.length; j++) {
                        //fill data for appointmentsPerWeek14
                        var hasAppointment = false;
                        var sumThreeWeek = 0;
                        for (var index = 0; index < appointmentData.length; index++) {
                            if (appointmentData[index].year == vm.fourteenWeeksOfYear[j].year
                                && appointmentData[index].weekOfYear == vm.fourteenWeeksOfYear[j].week) {
                                appointmentsPerWeek14.push(appointmentData[index].numberOfAppointments);
                                hasAppointment = true;
                                break;
                            }
                        }
                        if (hasAppointment == false) {
                            appointmentsPerWeek14.push(0);
                        }
                        //fill data for invitationsPerWeek14
                        var hasInvitation = false;
                        for (var index = 0; index < invitationsData.length; index++) {
                            if (invitationsData[index].year == vm.fourteenWeeksOfYear[j].year
                                && invitationsData[index].weekOfYear == vm.fourteenWeeksOfYear[j].week) {
                                invitationsPerWeek14.push(invitationsData[index].numberOfInvitations);
                                hasInvitation = true;
                                break;
                            }
                        }
                        if (hasInvitation == false) {
                            invitationsPerWeek14.push(0);
                        }
                        //fill data for invitationsPerWeek14
                        var hasEvaluation = false;
                        for (var index = 0; index < evaluationsData.length; index++) {
                            if (evaluationsData[index].year == vm.fourteenWeeksOfYear[j].year
                                && evaluationsData[index].weekOfYear == vm.fourteenWeeksOfYear[j].week) {
                                evaluationRpsPerWeek14.push(evaluationsData[index].numberOfEvaluations);
                                hasEvaluation = true;
                                break;
                            }
                        }
                        if (hasEvaluation == false) {
                            evaluationRpsPerWeek14.push(0);
                        }
                    }//end of for "vm.fourteenWeeksOfYear.length"
                    //caculate data for 12 weeks
                    vm.invitationsPerWeek12 = invitationsPerWeek14.slice(2, 14); // get 12 weeks latest
                    vm.appointmentsPerWeek12 = appointmentsPerWeek14.slice(2, 14);
                    vm.evaluationRpsPerWeek12 = evaluationRpsPerWeek14.slice(2, 14);
                    for (var i = 2; i < vm.fourteenWeeksOfYear.length; i++) {
                        vm.weekYear.push(vm.fourteenWeeksOfYear[i].year + 'w' + vm.fourteenWeeksOfYear[i].week);
                        
                        if (invitationsPerWeek14[i] === 0) {
                            vm.evaluationDivideInvitation.push(evaluationRpsPerWeek14[i] * 100);
                            vm.appointmentDivideInvitation.push(appointmentsPerWeek14[i] * 100);
                        }
                        else {
                            var evalDivideInvit = (evaluationRpsPerWeek14[i] / invitationsPerWeek14[i] * 100).toFixed(2);
                            vm.evaluationDivideInvitation.push(evalDivideInvit);
                            var appointDivideInvit = (appointmentsPerWeek14[i] / invitationsPerWeek14[i] * 100).toFixed(2);
                            vm.appointmentDivideInvitation.push(appointDivideInvit);
                        }

                        //caculate data for sum three weeks
                        var sumInvitations = invitationsPerWeek14[i] + invitationsPerWeek14[i - 1] + invitationsPerWeek14[i - 2];
                        var sumAppointments = appointmentsPerWeek14[i] + appointmentsPerWeek14[i - 1] + appointmentsPerWeek14[i - 2];
                        var sumEvaluations = evaluationRpsPerWeek14[i] + evaluationRpsPerWeek14[i - 1] + evaluationRpsPerWeek14[i - 2];

                        if (sumInvitations === 0) {
                            vm.evaluationDivideInvitationWithSum.push(sumEvaluations);
                            vm.appointmentDivideInvitation.push(sumAppointments);
                        }
                        else {
                            var evalDivideInvit = (sumEvaluations / sumInvitations * 100).toFixed(2);
                            vm.evaluationDivideInvitationWithSum.push(evalDivideInvit);
                            var appointDivideInvit = (sumAppointments / sumInvitations * 100).toFixed(2);
                            vm.appointmentDivideInvitationWithSum.push(appointDivideInvit);
                        }
                    }
                   drawLeftChart();
                   drawRightChart();
                });
            });
        }
        function caculateCurrentWeek(currentDate) {
            var onejan = new Date(currentDate.getFullYear(), 0, 1);
            return Math.ceil((((currentDate - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
        function drawLeftChart() {
            var options = {
                datasetFill: true,
                responsive: true,
                tooltips: {
                    mode: 'label'
                }
            };
            var chartLeftData = {
                labels: vm.weekYear,
                datasets: [
                            {
                                label: "Invitations",
                                backgroundColor: "#0F67D9",
                                data: vm.invitationsPerWeek12
                            },
                            {
                                label: "Appointments",
                                backgroundColor: "#AB0303",
                                data: vm.appointmentsPerWeek12
                            },
                            {
                                label: "Evaluations",
                                backgroundColor: "#59C41B",
                                data: vm.evaluationRpsPerWeek12
                            }
                ]
            };
            
            var leftCanvas = document.getElementById("leftchart").getContext("2d");
            var leftChart = new Chart(leftCanvas, {
                type: 'bar',
                data: chartLeftData,
                options: options
            });
            //document.getElementById("leftlegend").innerHTML = leftChart.generateLegend();
        }   
        function drawRightChart() {
            var options = {
                tooltips: {
                    mode: 'label'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            userCallback: function (tick) {
                                return tick.toString() + "%";
                            }
                        },
                    }]
                }
            };
            var chartRightData = {
                labels: vm.weekYear,
                datasets: [
                            {
                                label: "Eva/Inv",
                                backgroundColor: "#0AD3F2",
                                borderColor: "#0AD3F2",
                                fill: false,
                                borderWidth: 1,
                                data: vm.evaluationDivideInvitation
                            },
                            {
                                label: "Eva/Inv 2",
                                backgroundColor: "#0F67D9",
                                borderColor: "#0F67D9",
                                fill: false,
                                borderWidth: 1,
                                data: vm.evaluationDivideInvitationWithSum
                            },
                            {
                                label: "App/Inv",
                                backgroundColor: "#EAF516",
                                borderColor: "#EAF516",
                                fill: false,
                                borderWidth: 1,
                                data: vm.appointmentDivideInvitation
                            },
                            {
                                label: "App/Inv 2",
                                backgroundColor: "#FFAE21",
                                borderColor: "#FFAE21",
                                borderWidth: 1,
                                fill: false,
                                data: vm.appointmentDivideInvitationWithSum
                            }
                ]
            };

            var rightCanvas = document.getElementById("rightchart").getContext("2d");
            var rightChart = new Chart(rightCanvas, {
                type: 'line',
                data: chartRightData,
                options: options
            });
            //document.getElementById("rightlegend").innerHTML = rightChart.generateLegend();
        }

        function caculateFourteenWeeks() {
            var _listWeekOfYear = [];
            var currentYear = new Date().getFullYear();
            var currentWeekOfYear = caculateCurrentWeek(new Date());
            for (var i = 0; i < 14; i++) {
                if (currentWeekOfYear < 1) {
                    currentWeekOfYear = 52;
                    currentYear = currentYear - 1;
                }
                var weekYearObject = { year: currentYear, week: currentWeekOfYear };
                _listWeekOfYear.unshift(weekYearObject);
                currentWeekOfYear = currentWeekOfYear - 1;
            }
            return _listWeekOfYear;
        }
        drawHomePageChart();
    }]);