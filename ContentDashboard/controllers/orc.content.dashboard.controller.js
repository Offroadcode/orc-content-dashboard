angular.module("umbraco.resources").factory("orcContentDashboardApiResource", function ($http, $q) {

    var orcContentDashboardApiResource = {};

    // Content API Calls //////////////////////////////////////////////////

    orcContentDashboardApiResource.getOldCOntent = function() {
        return $http.get('/umbraco/backoffice/api/ContentDashboard/GetAllOldContent').then(function (response) {
            var responseData = response.data;
            if (typeof responseData === 'string') {
                responseData = JSON.parse(responseData);
            }

            if (responseData) {
                return {
                    oldContent: responseData
                };
            }
        });
    };

    return orcContentDashboardApiResource;
});

angular.module("umbraco").controller("orc.content.dashboard.controller", function ($scope, orcContentDashboardApiResource) {

    // Initialization Methods //////////////////////////////////////////////////

    /**
     * @method init
     * @returns {void}
     * @description Triggered when the controller is loaded by a view to initialize the JS for the controller.
     */
    $scope.init = function() {
        $scope.setInitialVariables();
        $scope.getInitialContent();
    };

    /**
     * @method setInitialVariables 
     * @returns {void}
     * @description Sets the initial states of the variables used in the scope.
     */
    $scope.setInitialVariables = function () {
        $scope.oldContent = [];
    };

    /**
     * @method getInitialContent
     * @returns {void}
     * @description Gets the initial content information
     */
    $scope.getInitialContent = function () {
        $scope.getContent();
    };

    // Helper Methods //////////////////////////////////////////////////////////

    /**
     * @method getContent
     * @returns {void}
     * @description Gets the old content information from the API
     */
    $scope.getContent = function () {
        return orcContentDashboardApiResource.getOldCOntent().then(function (response) {
            $scope.oldContent = response.oldContent;
        });
    };

    // Call $scope.init() //////////////////////////////////////////////////////

    $scope.init();

});