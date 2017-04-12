(function() {
    angular.module("dp-ui",[])
    .directive("dpMatchHeight", function() {

        heightGroupController.$inject = ['$scope', '$timeout', '$window', '$interval','$log'];

        function heightGroupController($scope, $timeout, $window, $interval,$log) {

            $scope.processHeightgroup = function() {

                $timeout(function() {
                    var elements = document.querySelectorAll("div[dp-match-height='" + $scope.dpMatchHeight + "'");
                    var maxheight = 0;

                    angular.forEach(elements, function(element, index) {
                        angular.element(element).css('height', 'auto');
                    });

                    angular.forEach(elements, function(element, index) {

                        if (maxheight < element.offsetHeight) {
                            maxheight = element.offsetHeight;
                        }
                    });
                    $log.debug(maxheight);
                    angular.forEach(elements, function(element, index) {
                        angular.element(element).css('height', maxheight + 'px');
                    });


                }, 200);
            }

            $scope.$on('match-height-refresh',function(event,args){
              $scope.processHeightgroup();
            });

            $scope.processHeightgroup();

            $scope.bindImages = function() {
                $timeout(function() {
                    var bindElements = document.querySelectorAll("div[dp-match-height='" + $scope.dpMatchHeight + "'] img");
                    angular.forEach(bindElements, function(element, index) {
                        angular.element(element).bind('load', function() {
                            $scope.processHeightgroup();
                        });
                    });
                }, 200);
            }

            $scope.bindImages();
        }

        return {
            restrict: 'A',
            scope: {
                dpMatchHeight: '@?'
            },
            controller: heightGroupController
        }
    });
})();
