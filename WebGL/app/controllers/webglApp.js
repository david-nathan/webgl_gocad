///<reference path="../_references.ts" />
angular.module("webglApp")
    .constant("viewsUrl", "settings/views.json")
    .controller("exploreDropDownCtrl", ["$scope", "viewsUrl", function ($scope, viewsUrl) {
        $scope.webgl = {};
        // array of available partial views.
        $scope.webgl.views = [{
                name: "Home", url: "app/views/home.html"
            }];
        // current active partial view
        $scope.webgl.view = $scope.webgl.views[0];
        // get other available partial views from stored JSON file
        d3.json(viewsUrl, function (viewsarray) {
            $scope.webgl.dropdown = viewsarray.views;
            angular.forEach(viewsarray.views, function (view) {
                $scope.webgl.views.push(view);
            });
        });
        // function to set active partial view
        $scope.selectView = function (name) {
            angular.forEach($scope.webgl.views, function (view) {
                if (view.name == name) {
                    $scope.webgl.view = view;
                }
            });
        };
    }]);
//# sourceMappingURL=webglApp.js.map