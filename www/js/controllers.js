angular.module('starter.controllers', ['ngRoute'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {
        // Form data for the login modal
        $scope.loginData = {username: 9920942573, password: "1234"};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            var user = Parse.Object.extend("User");
            //var testObject = new TestObject();
            var query = new Parse.Query(user);
            //  alert(Cards)
            if ($scope.loginData.password == "1234") {
                query.equalTo("mobile", $scope.loginData.username);
                query.find({

                    success: function (results) {
                        //  alert(results.length);
                        // $(".success").show();
                        // console.log(results);

                        for (var q = 0; q < results.length; q++) {
                            var object = results[q];
                            // alert(object.id + ' - ' + object.get('Name') + ' - ' + object.get('mobile'));

                            window.localStorage['username'] = $scope.loginData.username;
                            window.localStorage['name'] = object.get('Name');

                            return $state.go('app.home');
                        }

                    },
                    error: function (model, error) {
                        $(".error").show();
                    }
                });

            }
            else {
                alert("enter correct password");
            }


            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
        };


        $scope.logout = function () {


        };
    })


    .controller('logCtrl', function ($scope, $stateParams) {


    })


    .config(function ($routeProvider) {
        //configure the routing rules here
        $routeProvider.when('/historyDemo/:id', {
            controller: 'historyCtrl'
        });

    })




    .controller('historyCtrl', function ($scope, $stateParams, $state, $routeParams) {
        $scope.historyPage = window.localStorage['historyPage'];
        $scope.cardExpiry = window.localStorage['cardExpiry'];
        $scope.cardNumber = window.localStorage['cardNumber'];
        $scope.name = window.localStorage['name'];
             //  alert($routeParams.id);
    })




    .controller('addcardCtrl', function ($scope, $stateParams ) {

        $scope.name = window.localStorage['name'];
        $('.active form').card({
            container: $('.card-wrapper')
        });


        $scope.inputData = {};
        $scope.doInput = function () {
            console.log('Doing login', $scope.inputData);

            var cards = Parse.Object.extend("cards");
            var card = new cards();

          // var x = str.trim($scope.inputData.cardnumber);

            var x= $scope.inputData.cardnumber.replace(" ", "");
            var x= x.replace(" ", "");
            var x= x.replace(" ", "");

            var y= $scope.inputData.expirydate.replace(" ", "");
            var y= y.replace("/", "");
            var y= y.replace(" ", "");
          //  console.log(x);
            var numb = Number(x);
            console.log(numb);
            var expr = Number(y);
            card.set("cardExpiry",expr);
            card.set("cardNumber",numb);
            card.set("mobile",$scope.loginData.username);
             card.set("status",false);


            card.save( null,{
                success:function(card) {
                    response.success(card);

                },
                error:function(error) {
                    response.error(error);
                }
            });
        }
    })



    .controller('homeCtrl', function ($scope, $stateParams, $state) {

        $scope.css = "red";
        $scope.username = window.localStorage['username'];
        $scope.uname = window.localStorage['name'];
        var num = Number(window.localStorage['username']);
        var Cards = Parse.Object.extend("cards");
        var User = Parse.Object.extend("User");
        var query = new Parse.Query(Cards);
        var userQuery = new Parse.Query(User);

        query.equalTo("mobile", num);

        query.find({

            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var num = results[i].get('cardNumber');
                 /*   $scope.test = {};
                    $scope.test[i];
                    alert($scope.test[i]);*/
                    var id = object.id;
                    var expiry = object.get('cardExpiry').toString();
                    var number = object.get('cardNumber').toString();
                    var status = object.get('status');
                    console.log(object);
                    //checks for card type
                    $scope.cardtypeimg = {};
                    if ('4' == number.substr(0, 1)) {
                        // var cardType = 'Visa';

                        $scope.cardtypeimg[i] = true;
                        console.log(typeof($scope.cardtypeimg[i]));

                    }
                    if ('5' == number.substr(0, 1)) {
                        //  var cardType = 'Master';
                        $scope.cardtypeimg[i] = false;
                        // alert(number.substr(0, 1))
                        console.log(typeof($scope.cardtypeimg[i]));
                    }
                    console.log($scope.cardtypeimg);
                 /*   else {
                        alert("not a card");
                    }
*/
                    query.equalTo("mobile", $scope.loginData.username);

                    query.find({

                        success: function (results) {

                            for (var j = 0; j < results.length; j++) {
                                var object = results[j];
                                var num = results[j].get('cardNumber');

                                var id = object.id;
                                var expiry = object.get('cardExpiry').toString();
                                var number = object.get('cardNumber').toString();
                                var status = object.get('status');

                                $scope.cardStatusToggle = function (index) {
                                    console.log(index);
                                    var cardNum = $scope.cards[index].attributes.cardNumber;
                                    var status = $scope.cards[index].attributes.status;
                                    if (status == false) {
                                        var x = prompt("Enter Password:");
                                        if (x == 1234) {
                                            $scope.cards[index].attributes.status = !$scope.cards[index].attributes.status;
                                            var Cards = Parse.Object.extend("cards");
                                            var query = new Parse.Query(Cards);
                                            query.equalTo("cardNumber", cardNum);
                                            query.find({
                                                success: function (results) {
                                                    for (var k = 0; k < results.length; k++) {
                                                        var object = results[k];
                                                        var num = results[k].get('cardNumber');
                                                        object.set("status", !status);
                                                        object.save();
                                                        alert(" Done ");
                                                    }
                                                }
                                            })

                                        }
                                        else {
                                            alert("You Enter Wrong Password");
                                        }
                                    }


                                    if (status == true) {

                                        $scope.cards[index].attributes.status = !$scope.cards[index].attributes.status;
                                        var Cards = Parse.Object.extend("cards");
                                        var query = new Parse.Query(Cards);
                                        query.equalTo("cardNumber", cardNum);
                                        query.find({
                                            success: function (results) {
                                                for (var l = 0; l < results.length; l++) {
                                                    var object = results[l];
                                                    var num = results[l].get('cardNumber');
                                                    object.set("status", !status);
                                                    object.save();

                                                }
                                            }
                                        })
                                    }


                                };













                            }

                        },
                        error: function (model, error) {
                            $(".error").show();
                        }


                    })


                    $scope.cardStatusToggle12 = function (index , cardExpiry ,cardNumber ) {
                        console.log(index);
                        window.localStorage['historyPage'] = index;
                        window.localStorage['cardExpiry'] =cardExpiry;
                        window.localStorage['cardNumber'] =cardNumber;

                    }
                    $scope.cards = results;

                }

            },
            error: function (model, error) {
                $(".error").show();
            }


        })

      /*  $scope.togg = function () {
            //  $scope.msg = "hiii";
            alert(2);

            object.set("status", false);

            return object.save();


        };*/
        //app.controller('ImageToggleCtrl', function($scope) {
        //$scope.followBtnImgUrl = 'http://ismanettoneblog.altervista.org/blog/wp-content/uploads/2014/02/bt_ON.png';
        //
        //
        //$scope.toggleImage = function () {
        //    if ($scope.followBtnImgUrl === 'http://ismanettoneblog.altervista.org/blog/wp-content/uploads/2014/02/bt_ON.png') {
        //        $scope.followBtnImgUrl = baseUrl + 'http://ismanettoneblog.altervista.org/blog/wp-content/uploads/2014/02/bt_OFF.png';
        //    } else {
        //        $scope.followBtnImgUrl = 'http://ismanettoneblog.altervista.org/blog/wp-content/uploads/2014/02/bt_ON.png';
        //    }
        //}
        //
        //});
        // $scope.toggle1 = function () {
        // alert(4);
        //
        //    object.set("status", true);
        //
        // return object.save();
        //
        //
        //
        // };
    });

    /*.controller('MainCtrl', function ($scope) {
     $scope.username = window.localStorage['username'];
     $scope.uname1 = window.localStorage['name'];

     var Cards = Parse.Object.extend("cards");

     var query = new Parse.Query(Cards);


     query.equalTo("mobile", $scope.loginData.username);

     query.find({

     success: function (results) {

     //  $(".success").show();


     for (var i = 0; i < results.length; i++) {
     var object = results[i];
     var num = results[i].get('cardNumber');

     var id = object.id;
     var status = object.get('status');
     var counter = status;
     $scope.cardStatusToggle = function (index) {
     console.log(index);

     *//*  if (counter === true) {
 //  alert(0);
 object.set("status", false);

 return object.save();

 counter = false;

 }
 else if (counter === false) {
 //  alert(1);
 object.set("status", true);

 return object.save();
 counter = true;
 }*//*


 };

 //  $scope.pushNotification[i] = [{ checked: status }];


 }

 },
 error: function (model, error) {
 $(".error").show();
 }


 })


 })*/

