///<reference path="../defs.d.ts"/>

///<reference path="../../includes.ts"/>
var DatatableTest;
(function (DatatableTest) {
    var pluginName = "datatable-test";
    DatatableTest.templatePath = "test-plugins/datatable/html";
    DatatableTest._module = angular.module(pluginName, []);
    DatatableTest._module.config(["$routeProvider", function ($routeProvider) {
            $routeProvider.
                when('/datatable/test', { templateUrl: UrlHelpers.join(DatatableTest.templatePath, 'test.html') });
        }]);
    DatatableTest._module.run(['HawtioNav', function (nav) {
            var builder = nav.builder();
            nav.add(builder.id(pluginName)
                .href(function () { return '/datatable/test'; })
                .title(function () { return 'Tables'; })
                .build());
        }]);
    hawtioPluginLoader.addModule(pluginName);
})(DatatableTest || (DatatableTest = {}));

/// <reference path="datatablePlugin.ts"/>
var DatatableTest;
(function (DatatableTest) {
    DatatableTest._module.controller('DatatableTest.SimpleTableTestController', ['$scope', '$location', function ($scope, $location) {
            $scope.myData = [
                { name: "James", twitter: "jstrachan", city: 'LONDON', ip: '172.17.0.11' },
                { name: "Stan", twitter: "gashcrumb", city: 'boston', ip: '172.17.0.9' },
                { name: "Claus", twitter: "davsclaus", city: 'Malmo', ip: '172.17.0.10' },
                { name: "Alexandre", twitter: "alexkieling", city: 'Florianopolis', ip: '172.17.0.12' }
            ];
            $scope.mygrid = {
                data: 'myData',
                showFilter: false,
                showColumnMenu: false,
                multiSelect: _.startsWith($location.search()["multi"] || "", "f") ? false : true,
                filterOptions: {
                    filterText: "",
                    useExternalFilter: false
                },
                selectedItems: [],
                rowHeight: 32,
                selectWithCheckboxOnly: true,
                columnDefs: [
                    {
                        field: 'name',
                        displayName: 'Name',
                        width: "***"
                    },
                    {
                        field: 'city',
                        displayName: 'City',
                        width: "***"
                    },
                    {
                        field: 'twitter',
                        displayName: 'Twitter',
                        cellTemplate: '<div class="ngCellText">@{{row.entity.twitter}}</div>',
                        //width: 400
                        width: "***"
                    },
                    {
                        field: 'ip',
                        displayName: 'Pod IP',
                        width: "***",
                        customSortField: function (field) {
                            // use a custom sort to sort ip address
                            var ip = field.ip;
                            // i guess there is maybe nicer ways of sort this without parsing and slicing
                            var regex = /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/;
                            var groups = regex.exec(ip);
                            if (angular.isDefined(groups)) {
                                var g1 = ("00" + groups[1]).slice(-3);
                                var g2 = ("00" + groups[2]).slice(-3);
                                var g3 = ("00" + groups[3]).slice(-3);
                                var g4 = ("00" + groups[4]).slice(-3);
                                var answer = g1 + g2 + g3 + g4;
                                console.log(answer);
                                return answer;
                            }
                            else {
                                return 0;
                            }
                        }
                    }
                ]
            };
            $scope.scrollGrid = angular.extend({ maxBodyHeight: 77 }, $scope.mygrid);
        }]);
})(DatatableTest || (DatatableTest = {}));

/// <reference path="../../includes.ts"/>
var UITest;
(function (UITest) {
    UITest.templatePath = 'test-plugins/ui/html';
    var path = UITest.templatePath;
    UITest.pluginName = 'hawtio-ui-test-pages';
    UITest._module = angular.module(UITest.pluginName, []);
    var tab1 = null;
    var tab2 = null;
    var editorTab = null;
    UITest._module.config(['$routeProvider', 'HawtioNavBuilderProvider', function ($routeProvider, builder) {
            editorTab = builder.create()
                .id(builder.join(UITest.pluginName, 'editor'))
                .href(function () { return '/ui'; })
                .title(function () { return 'Editor'; })
                .subPath('Editor', 'editor', builder.join(path, 'editor.html'))
                .build();
            tab2 = builder.create()
                .id(builder.join(UITest.pluginName, 'tab2'))
                .href(function () { return '/ui2'; })
                .title(function () { return "UI Components 2"; })
                .subPath('Tags', 'tags', builder.join(path, 'tags.html'))
                .subPath('Expandable', 'expandable', builder.join(path, 'expandable.html'))
                .subPath('Auto Columns', 'auto-columns', builder.join(path, 'auto-columns.html'))
                .subPath('Template Popover', 'template-popover', builder.join(path, 'template-popover.html'))
                .subPath('Drop Down', 'drop-down', builder.join(path, 'drop-down.html'))
                .subPath('Auto Dropdown', 'auto-dropdown', builder.join(path, 'auto-dropdown.html'))
                .subPath('Zero Clipboard', 'zero-clipboard', builder.join(path, 'zero-clipboard.html'))
                .build();
            tab1 = builder.create()
                .id(builder.join(UITest.pluginName, 'tab1'))
                .href(function () { return '/ui1'; })
                .title(function () { return "UI Components 1"; })
                .subPath('Icons', 'icons', builder.join(path, 'icon.html'))
                .subPath('Breadcrumbs', 'breadcrumbs', builder.join(path, 'breadcrumbs.html'))
                .subPath('Color Picker', 'color-picker', builder.join(path, 'color-picker.html'))
                .subPath('Confirm Dialog', 'confirm-dialog', builder.join(path, 'confirm-dialog.html'))
                .subPath('Editable Property', 'editable-property', builder.join(path, 'editable-property.html'))
                .subPath('Expandable', 'expandable', builder.join(path, 'expandable.html'))
                .subPath('JSPlumb', 'jsplumb', builder.join(path, 'jsplumb.html'))
                .subPath('Pager', 'pager', builder.join(path, 'pager.html'))
                .subPath('Slideout', 'slideout', builder.join(path, 'slideout.html'))
                .build();
            builder.configureRouting($routeProvider, tab1);
            builder.configureRouting($routeProvider, tab2);
            builder.configureRouting($routeProvider, editorTab);
        }]);
    UITest._module.run(['HawtioNav', function (nav) {
            nav.add(tab1);
            nav.add(tab2);
            nav.add(editorTab);
            nav.add({
                id: 'project-link',
                isSelected: function () { return false; },
                title: function () { return 'github'; },
                attributes: {
                    class: 'pull-right'
                },
                linkAttributes: {
                    target: '_blank'
                },
                href: function () { return 'https://github.com/hawtio/hawtio-ui'; }
            });
            nav.add({
                id: 'hawtio-link',
                isSelected: function () { return false; },
                title: function () { return 'hawtio'; },
                attributes: {
                    class: 'pull-right'
                },
                linkAttributes: {
                    target: '_blank'
                },
                href: function () { return 'http://hawt.io'; }
            });
        }]);
    hawtioPluginLoader.addModule(UITest.pluginName);
})(UITest || (UITest = {}));

///<reference path="uiTestPlugin.ts"/>
var UITest;
(function (UITest) {
    UITest._module.controller("UITest.TagsController", ["$scope", "$templateCache", function ($scope, $templateCache) {
            $scope.toJson = angular.toJson;
            $scope.tags = [];
            $scope.selected = [];
            var data = [
                {
                    id: 'one',
                    tags: ['tag1', 'tag2', 'tag3']
                },
                {
                    id: 'two',
                    tags: ['tag2', 'tag3']
                },
                {
                    id: 'three',
                    tags: ['tag1', 'tag2']
                },
                {
                    id: 'four',
                    tags: ['tag1', 'tag3']
                },
                {
                    id: 'five',
                    tags: ['tag4']
                }
            ];
            $scope.data = data;
            $scope.template = $templateCache.get('tag-ex-template.html');
        }]);
})(UITest || (UITest = {}));

/// <reference path="uiTestPlugin.ts"/>
/// <reference path="../../includes.ts"/>
var UITest;
(function (UITest) {
    UITest._module.controller("UI.UITestController2", ["$scope", "$templateCache", function ($scope, $templateCache) {
            $scope.fileUploadExMode = 'text/html';
            $scope.menuItems = [];
            $scope.divs = [];
            for (var i = 0; i < 20; i++) {
                $scope.menuItems.push("Some Item " + i);
            }
            for (var i = 0; i < 20; i++) {
                $scope.divs.push(i + 1);
            }
            $scope.things = [
                {
                    'name': 'stuff1',
                    'foo1': 'bar1',
                    'foo2': 'bar2'
                },
                {
                    'name': 'stuff2',
                    'foo3': 'bar3',
                    'foo4': 'bar4'
                }
            ];
            $scope.someVal = 1;
            $scope.dropDownConfig = {
                icon: 'fa fa-cogs',
                title: 'My Awesome Menu',
                items: [{
                        title: 'Some Item',
                        action: 'someVal=2'
                    }, {
                        title: 'Some other stuff',
                        icon: 'fa fa-twitter',
                        action: 'someVal=3'
                    }, {
                        title: "I've got children",
                        icon: 'fa fa-file-text',
                        items: [{
                                title: 'Hi!',
                                action: 'someVal=4'
                            }, {
                                title: 'Yo!',
                                items: [{
                                        title: 'More!',
                                        action: 'someVal=5'
                                    }, {
                                        title: 'Child',
                                        action: 'someVal=6'
                                    }, {
                                        title: 'Menus!',
                                        action: 'someVal=7'
                                    }]
                            }]
                    }, {
                        title: "Call a function!",
                        action: function () {
                            Core.notification("info", "Function called!");
                        }
                    }]
            };
            $scope.dropDownConfigTxt = angular.toJson($scope.dropDownConfig, true);
            $scope.$watch('dropDownConfigTxt', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.dropDownConfig = angular.fromJson($scope.dropDownConfigTxt);
                }
            });
            $scope.breadcrumbSelection = 1;
            $scope.breadcrumbConfig = {
                path: '/root',
                icon: 'fa fa-cogs',
                title: 'root',
                items: [{
                        title: 'first child',
                        icon: 'fa fa-folder-close-alt',
                        items: [{
                                title: "first child's first child",
                                icon: 'fa fa-file-text'
                            }]
                    }, {
                        title: 'second child',
                        icon: 'fa fa-file'
                    }, {
                        title: "third child",
                        icon: 'fa fa-folder-close-alt',
                        items: [{
                                title: "third child's first child",
                                icon: 'fa fa-file-text'
                            }, {
                                title: "third child's second child",
                                icon: 'fa fa-file-text'
                            }, {
                                title: "third child's third child",
                                icon: 'fa fa-folder-close-alt',
                                items: [{
                                        title: 'More!',
                                        icon: 'fa fa-file-text'
                                    }, {
                                        title: 'Child',
                                        icon: 'fa fa-file-text'
                                    }, {
                                        title: 'Menus!',
                                        icon: 'fa fa-file-text'
                                    }]
                            }]
                    }]
            };
            $scope.breadcrumbConfigTxt = angular.toJson($scope.breadcrumbConfig, true);
            $scope.$watch('breadcrumbConfigTxt', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.breadcrumbconfig = angular.toJson($scope.breadcrumbConfigTxt);
                }
            });
            $scope.breadcrumbEx = $templateCache.get("breadcrumbTemplate");
            $scope.dropDownEx = $templateCache.get("dropDownTemplate");
            $scope.autoDropDown = $templateCache.get("autoDropDownTemplate");
            $scope.zeroClipboard = $templateCache.get("zeroClipboardTemplate");
            $scope.popoverEx = $templateCache.get("myTemplate");
            $scope.popoverUsageEx = $templateCache.get("popoverExTemplate");
            $scope.autoColumnEx = $templateCache.get("autoColumnTemplate");
        }]);
    UITest._module.controller("UI.UITestController1", ["$scope", "$templateCache", function ($scope, $templateCache) {
            $scope.jsplumbEx = $templateCache.get("jsplumbTemplate");
            $scope.nodes = ["node1", "node2"];
            $scope.otherNodes = ["node4", "node5", "node6"];
            $scope.anchors = ["Top", "Right", "Bottom", "Left"];
            $scope.customizeEndpointOptions = function (jsPlumb, node, options) {
                /*
                if (node) {
                  var anchors = [];
                  _.forEach($scope.anchors, (anchor:string) => {
                    if (_.some(node.anchors, anchor)) {
                      anchors.push(anchor);
                    }
                  });
                  console.log("anchors: ", anchors);
                  if (anchors && anchors.length > 0) {
                    var anchor = _.first(anchors);
                    node.anchors.push(anchor);
                    node.endpoints.push(jsPlumb.addEndpoint(node.el, {
                      anchor: anchor,
                      isSource: true,
                      isTarget: true,
                      maxConnections: -1
                    }));
                  }
                }
                */
            };
            $scope.expandableEx = '' +
                '<div class="expandable closed">\n' +
                '   <div title="The title" class="title">\n' +
                '     <i class="expandable-indicator"></i> Expandable title\n' +
                '   </div>\n' +
                '   <div class="expandable-body well">\n' +
                '     This is the expandable content...  Note that adding the "well" class isn\'t necessary but makes for a nice inset look\n' +
                '   </div>\n' +
                '</div>';
            $scope.editablePropertyEx1 = '<editable-property ng-model="editablePropertyModelEx1" property="property"></editable-property>';
            $scope.editablePropertyModelEx1 = {
                property: "This is editable (hover to edit)"
            };
            $scope.showDeleteOne = new UI.Dialog();
            $scope.showDeleteTwo = new UI.Dialog();
            $scope.fileUploadEx1 = '<div hawtio-file-upload="files" target="test1"></div>';
            $scope.fileUploadEx2 = '<div hawtio-file-upload="files" target="test2" show-files="false"></div>';
            $scope.fileUploadExMode = 'text/html';
            $scope.colorPickerEx = 'My Color ({{myColor}}): <div hawtio-color-picker="myColor"></div>';
            $scope.confirmationEx1 = '' +
                '<button class="btn" ng-click="showDeleteOne.open()">Delete stuff</button>\n' +
                '\n' +
                '<div hawtio-confirm-dialog="showDeleteOne.show"\n' +
                'title="Delete stuff?"\n' +
                'ok-button-text="Yes, Delete the Stuff"\n' +
                'cancel-button-text="No, Keep the Stuff"\n' +
                'on-cancel="onCancelled(\'One\')"\n' +
                'on-ok="onOk(\'One\')">\n' +
                '  <div class="dialog-body">\n' +
                '    <p>\n' +
                '        Are you sure you want to delete all the stuff?\n' +
                '    </p>\n' +
                '  </div>\n' +
                '</div>\n';
            $scope.confirmationEx2 = '' +
                '<button class="btn" ng-click="showDeleteTwo.open()">Delete other stuff</button>\n' +
                '\n' +
                '<!-- Use more defaults -->\n' +
                '<div hawtio-confirm-dialog="showDeleteTwo.show\n"' +
                '  on-cancel="onCancelled(\'Two\')"\n' +
                '  on-ok="onOk(\'Two\')">\n' +
                '  <div class="dialog-body">\n' +
                '    <p>\n' +
                '      Are you sure you want to delete all the other stuff?\n' +
                '    </p>\n' +
                '  </div>\n' +
                '</div>';
            $scope.sliderEx1 = '' +
                '<button class="btn" ng-click="showSlideoutRight = !showSlideoutRight">Show slideout right</button>\n' +
                '<div hawtio-slideout="showSlideoutRight" title="Hey look a slider!">\n' +
                '   <div class="dialog-body">\n' +
                '     <div>\n' +
                '       Here is some content or whatever {{transcludedValue}}\n' +
                '     </div>\n' +
                '   </div>\n' +
                '</div>';
            $scope.sliderEx2 = '' +
                '<button class="btn" ng-click="showSlideoutLeft = !showSlideoutLeft">Show slideout left</button>\n' +
                '<div hawtio-slideout="showSlideoutLeft" direction="left" title="Hey, another slider!">\n' +
                '   <div class="dialog-body">\n' +
                '     <div hawtio-editor="someText" mode="javascript"></div>\n' +
                '   </div>\n' +
                '</div>\n';
            $scope.sliderEx3 = '' +
                '<button class="btn" ng-click="showSlideoutRight = !showSlideoutRight">Show slideout right no close button</button>\n' +
                '<div hawtio-slideout="showSlideoutRight" close="false" title="Hey look a slider with no close button!">\n' +
                '   <div class="dialog-body">\n' +
                '     <div>\n' +
                '       Here is some content or whatever {{transcludedValue}}\n' +
                '     </div>\n' +
                '   </div>\n' +
                '</div>';
            $scope.editorEx1 = '' +
                'Instance 1\n' +
                '<div class="row-fluid">\n' +
                '   <div hawtio-editor="someText" mode="mode" dirty="dirty"></div>\n' +
                '   <div>Text : {{someText}}</div>\n' +
                '</div>\n' +
                '\n' +
                'Instance 2 (readonly)\n' +
                '<div class="row-fluid">\n' +
                '   <div hawtio-editor="someText" read-only="true" mode="mode" dirty="dirty"></div>\n' +
                '   <div>Text : {{someText}}</div>\n' +
                '</div>';
            $scope.transcludedValue = "and this is transcluded";
            $scope.onCancelled = function (number) {
                Core.notification('info', 'cancelled ' + number);
            };
            $scope.onOk = function (number) {
                Core.notification('info', number + ' ok!');
            };
            $scope.showSlideoutRight = false;
            $scope.showSlideoutLeft = false;
            $scope.dirty = false;
            $scope.mode = 'javascript';
            $scope.someText = "var someValue = 0;\n" +
                "var someFunc = function() {\n" +
                "  return \"Hello World!\";\n" +
                "}\n";
            $scope.myColor = "#FF887C";
            $scope.showColorDialog = false;
            $scope.files = [];
            $scope.$watch('files', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    console.log("Files: ", $scope.files);
                }
            }, true);
        }]);
})(UITest || (UITest = {}));

angular.module("hawtio-ui-test-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("test-plugins/datatable/html/test.html","<div ng-controller=\"DatatableTest.SimpleTableTestController\">\n  <div class=\"row\">\n    <div class=\"section-header\">\n\n      <div class=\"section-filter\">\n        <input type=\"text\" class=\"search-query\" placeholder=\"Filter...\" ng-model=\"mygrid.filterOptions.filterText\">\n        <i class=\"fa fa-remove clickable\" title=\"Clear filter\" ng-click=\"mygrid.filterOptions.filterText = \'\'\"></i>\n      </div>\n\n    </div>\n  </div>\n\n  <h3>hawtio-simple-table example</h3>\n\n  <table class=\"table table-striped table-bordered\" hawtio-simple-table=\"mygrid\"></table>\n\n  <div class=\"row\">\n    <p>Selected folks:</p>\n    <ul>\n      <li ng-repeat=\"person in mygrid.selectedItems\">{{person.name}}</li>\n    </ul>\n\n    <p>\n       <a class=\"btn\" href=\"\" ng-click=\"mygrid.multiSelect = !mygrid.multiSelect\">multi select is: {{mygrid.multiSelect}}</a>\n    </p>\n  </div>\n\n  <h3>hawtio-simple-table - fixed height</h3>\n\n  <table class=\"table table-striped table-bordered\" hawtio-simple-table=\"scrollGrid\"></table>\n\n  <div class=\"row\">\n    <p>Selected folks:</p>\n    <ul>\n      <li ng-repeat=\"person in scrollGrid.selectedItems\">{{person.name}}</li>\n    </ul>\n    <p>\n       <a class=\"btn\" href=\"\" ng-click=\"scrollGrid.multiSelect = !scrollGrid.multiSelect\">multi select is: {{scrollGrid.multiSelect}}</a>\n    </p>\n  </div>\n</div>\n");
$templateCache.put("test-plugins/ui/html/auto-columns.html","<div ng-controller=\"UI.UITestController2\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n      <h3>Auto Columns</h3>\r\n      <p>Lays out a bunch of inline-block child elements into columns automatically based on the size of the parent container.  Specify the selector for the child items as an argument</p>\r\n\r\n      <script type=\"text/ng-template\" id=\"autoColumnTemplate\">\r\n<div id=\"container\"\r\n     style=\"height: 225px;\r\n            width: 785px;\r\n            background: lightgrey;\r\n            border-radius: 4px;\"\r\n     hawtio-auto-columns=\".ex-children\"\r\n     min-margin=\"5\">\r\n  <div class=\"ex-children\"\r\n       style=\"display: inline-block;\r\n              width: 64px; height: 64px;\r\n              border-radius: 4px;\r\n              background: lightgreen;\r\n              text-align: center;\r\n              vertical-align: middle;\r\n              margin: 5px;\"\r\n       ng-repeat=\"div in divs\">{{div}}</div>\r\n</div>\r\n      </script>\r\n      <div hawtio-editor=\"autoColumnEx\" mode=\"fileUploadExMode\"></div>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"autoColumnEx\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/auto-dropdown.html","<div ng-controller=\"UI.UITestController2\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n      <h3>Auto Drop Down</h3>\r\n      <p>Handy for horizontal lists of things like menus, if the width of the element is smaller than the items inside any overflowing elements will be collected into a special dropdown element that\'s required at the end of the list</p>\r\n      <script type=\"text/ng-template\" id=\"autoDropDownTemplate\">\r\n        <ul class=\"nav nav-tabs\" hawtio-auto-dropdown>\r\n          <!-- All of our menu items -->\r\n          <li ng-repeat=\"item in menuItems\">\r\n            <a href=\"\">{{item}}</a>\r\n          </li>\r\n          <!-- The dropdown that will collect overflow elements -->\r\n          <li class=\"dropdown overflow\" style=\"float: right !important; visibility: hidden;\">\r\n            <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n              <i class=\"fa fa-chevron-down\"></i>\r\n            </a>\r\n            <ul class=\"dropdown-menu right\"></ul>\r\n          </li>\r\n        </ul>\r\n      </script>\r\n      <div hawtio-editor=\"autoDropDown\" mode=\"fileUploadExMode\"></div>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"autoDropDown\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/breadcrumbs.html","<div ng-controller=\"UI.UITestController2\">\r\n  <script type=\"text/ng-template\" id=\"breadcrumbTemplate\">\r\n    <p><b>path: {{breadcrumbConfig.path}}</b></p>\r\n    <hawtio-breadcrumbs config=\"breadcrumbConfig\"></hawtio-breadcrumbs>\r\n  </script>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>BreadCrumbs</h3>\r\n      <p>A breadcrumb implementation that supports dropdowns for each node.  The data structure is a tree structure with a single starting node.  When the user makes a selection the directive will update the \'path\' property of the config object.  The directive also watches the \'path\' property, allowing you to also set the initial state of the breadcrumbs.  Config options are:</p>\r\n      <dl>\r\n        <dt>\r\n          path\r\n        </dt>\r\n        <dd>\r\n          attribute that holds the current selected path of the breadcrumb widget\r\n        </dd>\r\n        <dt>\r\n          title\r\n        </dt>\r\n        <dd>\r\n          The name and path element of the breadcrumb entry\r\n        </dd>\r\n        <dt>\r\n          icon\r\n        </dt>\r\n        <dd>\r\n          font-awesome icon class for the breadcrumb entry\r\n        </dd>\r\n        <dt>\r\n          items\r\n        </dt>\r\n        <dd>\r\n          array of child breadcrumb items\r\n        </dd>\r\n      </dl>\r\n      <p class=\"well\">\r\n        TODO - it\'d be helpful to make this breadcrumb work with an async config, where the entire tree isn\'t known up front, see <a href=\"https://github.com/hawtio/hawtio-ui/issues/34\">this issue</a>\r\n      </p>\r\n      <h5>Live example</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"breadcrumbEx\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h5>HTML</h5>\r\n      <p>Example HTML markup</p>\r\n      <div hawtio-editor=\"breadcrumbEx\" mode=\"javascript\"></div>\r\n      <h5>JSON</h5>\r\n      <p>Example JSON configuration object</p>\r\n      <div hawtio-editor=\"breadcrumbConfigTxt\" mode=\"javascript\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/color-picker.html","<div ng-controller=\"UI.UITestController1\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>Color picker</h3>\r\n      <p>Used to select a color from a pre-defined set of colors.  The selected color string will be set on the attribute you pass to the directive.</p>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h5>HTML</h5>\r\n      <div hawtio-editor=\"colorPickerEx\" mode=\"fileUploadExMode\"></div>\r\n      <h5>Live example</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"colorPickerEx\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/confirm-dialog.html","<div ng-controller=\"UI.UITestController1\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>Confirmation Dialog</h3>\r\n      <p>Displays a simple confirmation dialog with a standard title and buttons, just the dialog body needs to be provided. The buttons can be customized as well as the actions when the ok or cancel button is clicked.  Configuration options are:</p>\r\n      <dl>\r\n        <dt>\r\n          hawtio-confirm-dialog\r\n        </dt>\r\n        <dd>\r\n          boolean attribute your controller can use to show/hide the dialog\r\n        </dd>\r\n        <dt>\r\n          title\r\n        </dt>\r\n        <dd>\r\n          String to use as the dialog title\r\n        </dd>\r\n        <dt>\r\n          ok-button-text\r\n        </dt>\r\n        <dd>\r\n          String to use as text on the \'ok\' button\r\n        </dd>\r\n        <dt>\r\n          cancel-button-text\r\n        </dt>\r\n        <dd>\r\n          String to use as text on the \'cancel\' button\r\n        </dd>\r\n        <dt>\r\n          on-cancel\r\n        </dt>\r\n        <dd>\r\n          function that gets called when the user clicks the cancel button\r\n        </dd>\r\n        <dt>\r\n          on-ok\r\n        </dt>\r\n        <dd>\r\n          function that gets called when the user clicks the ok button\r\n        </dd>\r\n        <dt>\r\n          on-close\r\n        </dt>\r\n        <dd>\r\n          function that gets called when the dialog closes\r\n        </dd>\r\n      </dl>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h5>Example 1 HTML</h5>\r\n      <div hawtio-editor=\"confirmationEx1\" mode=\"fileUploadExMode\"></div>\r\n      <h5>Example 1</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"confirmationEx1\"></div>\r\n      </div>\r\n\r\n      <h5>Example 2 HTML</h5>\r\n      <div hawtio-editor=\"confirmationEx2\" mode=\"fileUploadExMode\"></div>\r\n      <h5>Example 2</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"confirmationEx2\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/drop-down.html","<div ng-controller=\"UI.UITestController2\">\r\n\r\n  <div>\r\n\r\n    <div class=\"row\">\r\n      <h3>Drop Down</h3>\r\n      <p>A bootstrap.js drop-down widget driven by a simple json structure</p>\r\n      <script type=\"text/ng-template\" id=\"dropDownTemplate\">\r\n<p>someVal: {{someVal}}</p>\r\n  <div hawtio-drop-down=\"dropDownConfig\"></div>\r\n      </script>\r\n      <h5>HTML</h5>\r\n      <div hawtio-editor=\"dropDownEx\" mode=\"fileUploadExMode\"></div>\r\n      <h5>JSON</h5>\r\n      <div hawtio-editor=\"dropDownConfigTxt\" mode=\"javascript\"></div>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"dropDownEx\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/editable-property.html","<div ng-controller=\"UI.UITestController1\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>Editable Property</h3>\r\n      <p>Use to display a value that the user can edit inline.  Configuration options:</p>\r\n      <dl>\r\n        <dt>\r\n          ng-model\r\n        </dt>\r\n        <dd>\r\n          The object in your controller that the directive will look at\r\n        </dd>\r\n        <dt>\r\n          property\r\n        </dt>\r\n        <dd>\r\n          The property in the object that the directive will display and edit\r\n        </dd>\r\n        <dt>\r\n          type\r\n        </dt>\r\n        <dd>\r\n          The type of input field to use, for example \'text\', \'number\', \'password\'\r\n        </dd>\r\n        <dt>\r\n          min\r\n        </dt>\r\n        <dd>\r\n          When using a \'number\' input type, sets the HTML5 \'min\' attribute\r\n        </dd>\r\n        <dt>\r\n          max\r\n        </dt>\r\n        <dd>\r\n          When using a \'number\' input type, sets the HTML5 \'max\' attribute\r\n        </dd>\r\n      </dl>\r\n    </div>\r\n\r\n    <div class=\"col-md-6\">\r\n      <h5>Example HTML</h5>\r\n      <div hawtio-editor=\"editablePropertyEx1\" mode=\"fileUploadExMode\"></div>\r\n      <h5>Live example</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"editablePropertyEx1\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/editor.html","<div ng-controller=\"UI.UITestController1\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n        <h3>CodeMirror</h3>\r\n\r\n        <p>A directive that wraps the codeMirror editor.</p>\r\n\r\n        <div hawtio-editor=\"editorEx1\" mode=\"fileUploadExMode\"></div>\r\n        <div class=\"directive-example\">\r\n          <div compile=\"editorEx1\"></div>\r\n        </div>\r\n      </div>\r\n  </div>\r\n\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/expandable.html","<div ng-controller=\"UI.UITestController1\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>Expandable</h3>\r\n      <p>Use to hide content under a header that a user can display when necessary.  The expandable must be defined similar to example HTML.  The root element needs to have the \'expandable\' class.  The first child element should have the class \'title\', and it should contain an element with the \'expandable-indicator\' class.  The next child of \'expandable\' should have the \'expandable-body\' class, which will be then opened and closed by clicking the expandable title element.</p>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h5>Example HTML</h5>\r\n      <div hawtio-editor=\"expandableEx\" mode=\"fileUploadExMode\"></div>\r\n      <h5>Live example</h5>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"expandableEx\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/file-upload.html","<div ng-controller=\"UI.UITestController1\">\r\n\r\n  <div class=\"row\">\r\n    <h3>File upload</h3>\r\n\r\n    <p>Use to upload files to the hawtio webapp backend. Files are stored in a temporary directory and managed via the\r\n      UploadManager JMX MBean</p>\r\n\r\n    <p>Showing files:</p>\r\n\r\n    <div hawtio-editor=\"fileUploadEx1\" mode=\"fileUploadExMode\"></div>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"fileUploadEx1\"></div>\r\n    </div>\r\n    <hr>\r\n    <p>Not showing files:</p>\r\n\r\n    <div hawtio-editor=\"fileUploadEx2\" mode=\"fileUploadExMode\"></div>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"fileUploadEx2\"></div>\r\n    </div>\r\n  </div>\r\n  <hr>\r\n</div>\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/icon.html","<div ng-controller=\"UI.IconTestController\">\r\n\r\n  <script type=\"text/ng-template\" id=\"example-html\">\r\n\r\n<style>\r\n/* Define icon sizes in CSS\r\n   use the \'class\' attribute\r\n   to handle icons that are\r\n   wider than they are tall */\r\n\r\n.fa.fa-example i:before,\r\n.fa.fa-example img {\r\n  vertical-align: middle;\r\n  line-height: 32px;\r\n  font-size: 32px;\r\n  height: 32px;\r\n  width: auto;\r\n}\r\n\r\n.fa.fa-example img.girthy {\r\n  height: auto;\r\n  width: 32px;\r\n}\r\n</style>\r\n\r\n<!-- Here we turn an array of\r\n     simple objects into icons! -->\r\n<ul class=\"fa fa-example list-inline\">\r\n  <li ng-repeat=\"icon in icons\">\r\n    <hawtio-icon config=\"icon\"></hawtio-icon>\r\n  </li>\r\n</ul>\r\n  </script>\r\n\r\n  <script type=\"text/ng-template\" id=\"example-config-json\">\r\n[{\r\n  \"title\": \"Awesome!\",\r\n  \"src\": \"fa fa-thumbs-up\"\r\n},\r\n{\r\n  \"title\": \"Apache Karaf\",\r\n  \"type\": \"icon\",\r\n  \"src\": \"fa fa-flask\"\r\n},\r\n{\r\n  \"title\": \"Fabric8\",\r\n  \"type\": \"img\",\r\n  \"src\": \"img/icons/fabric8_icon.svg\"\r\n},\r\n{\r\n  \"title\": \"Apache Cassandra\",\r\n  \"src\": \"img/icons/cassandra.svg\",\r\n  \"class\": \"girthy\"\r\n}]\r\n  </script>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <h3>Icons</h3>\r\n      <p>A simple wrapper to handle arbitrarily using FontAwesome icons or images via a simple configuration.  Possible configuration options are:</p>\r\n      <dl>\r\n        <dt>\r\n        title\r\n        </dt>\r\n        <dd>\r\n        Used to set the tooltip on the icon element\r\n        </dd>\r\n        <dt>\r\n        type\r\n        </dt>\r\n        <dd>\r\n          Sets whether the icon is a font or an image\r\n        </dd>\r\n        <dt>\r\n        src\r\n        </dt>\r\n        <dd>\r\n          Either the icon class or src URL for the icon\r\n        </dd>\r\n        <dt>\r\n          class\r\n        </dt>\r\n        <dd>\r\n          Additional CSS class to set on the icon element\r\n        </dd>\r\n      </dl>\r\n      <h5>Live example</h5>\r\n      <p>Based on the example configuration given</p>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"exampleHtml\"></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <h5>HTML</h5>\r\n      <p>The icon sizes are specified in CSS, we can also pass a \'class\' field to the icon as well to handle icons that are wider than they are tall for certain layouts</p>\r\n      <div hawtio-editor=\"exampleHtml\" mode=\"html\"></div>\r\n      <h5>JSON</h5>\r\n      <p>Here we define the configuration for our icons, in this case we\'re just creating a simple array of icon definitions to show in a list</p>\r\n      <div hawtio-editor=\"exampleConfigJson\" mode=\"javascript\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/jsplumb.html","<div ng-controller=\"UI.UITestController1\">\n  <script type=\"text/ng-template\" id=\"jsplumbTemplate\">\n<div class=\"ex-node-container\" hawtio-jsplumb draggable=\"true\" layout=\"true\">\n  <!-- Nodes just need to have an ID and the jsplumb-node class -->\n  <div ng-repeat=\"node in nodes\"\n       id=\"{{node}}\"\n       anchors=\"Continuous\"\n       class=\"jsplumb-node ex-node\">\n    <i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(node)\"></i> Node: {{node}}\n  </div>\n  <!-- You can specify a connect-to attribute and a comma separated list of IDs to connect nodes -->\n  <div id=\"node3\"\n       class=\"jsplumb-node ex-node\"\n       anchors=\"Left,Right\"\n       connect-to=\"node1,node2\">\n    <i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(\'node3\')\"></i> Node 3\n  </div>\n  <!-- Expressions and stuff will work too -->\n  <div ng-repeat=\"node in otherNodes\"\n       id=\"{{node}}\"\n       class=\"jsplumb-node ex-node\"\n       anchors=\"Continuous\"\n       connect-to=\"{{otherNodes[$index - 1]}}\"><i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(node)\"></i> Node: {{node}}</div>\n</div>\n  </script>\n\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <h3>JSPlumb</h3>\n      <p>Use to create an instance of JSPlumb.  The directive works with the markup you define as child elements using the CSS class \'jsplumb-node\'.  You can specify the \'connect-to\' attribute to join nodes together.  It\'s possible to use angularjs directives as well, and expressions can be used to create values for \'connect-to\'.</p>\n      <p>You can define a few functions in your controller\'s scope and the directive will call back into your code when it renders</p>\n      <dl>\n        <dt>\n          customizeDefaultOptions(defaultOptions)\n        </dt>\n        <dd>\n          Called right before the jsplumb instance is created so that default options can be customized.  Possible values are documented <a href=\"https://jsplumbtoolkit.com/community/apidocs/classes/jsPlumb.html#property_Defaults\">here</a>\n        </dd>\n        <dt>\n          customizeEndpointOptions(jsPlumb, node, options)\n        </dt>\n        <dd>\n          Called whenever the jsplumb directive is going to create a jsplumb endpoint from an element with CSS class \'jsplumb-node\'.  The jsplumb instance, node and options that will be used to create the node will be passed in.  This allows for customizing various endpoint options available from jsplumb.\n        </dd>\n        <dt>\n          customizeConnectionOptions(jsPlumb, edge, params, options)\n        </dt>\n        <dd>\n          Called whenever the jsplumb directive is going to create a new jsplumb connection between two endpoints.\n        </dd>\n        <dt>\n          jsPlumbCallback(jsPlumb, nodes, nodesById, transitions);\n        </dt>\n        <dd>\n          Called when the jsplumb directive has drawn all of it\'s endpoints and connections.  A controller can use this to do additional work or customization when the jsplumb directive has finished doing it\'s thing.\n        </dd>\n      </dl>\n      <p>The jsplumb directive also reacts to the following event</p>\n      <dl>\n        <dt>\n          jsplumbDoWhileSuspended\n        </dt>\n        <dd>\n          This event allows your controller to pass a function to the jsplumb directive to perform operations on the scene and suspends jsplumb drawing in the meantime.  Use if you need to add or remove nodes from the scene, after which the jsplumb directive will re-render all the connections and endpoints.\n        </dd>\n      </dl>\n      <p>The jsplumb directive recognizes the following configuration:</p>\n      <dl>\n        <dt>\n          draggable\n        </dt>\n        <dd>\n          Turns on or off drag/drop support, when enabled \'jsplumb-node\' elements can be dragged with the mouse\n        </dd>\n        <dt>\n          layout\n        </dt>\n        <dd>\n          Turns on or off layout support using dagre.  When enabled, dagre will be used to lay out \'jsplumb-node\' elements based on their connections.\n        </dd>\n        <dt>\n          direction\n        </dt>\n        <dd>\n          When \'layout\' is enabled this controls whether the directed graph will go left to right or top to bottom.\n        </dd>\n        <dt>\n          node-sep\n        </dt>\n        <dd>\n          The distance between nodes when using \'layout\'\n        </dd>\n        <dt>\n          edge-sep\n        </dt>\n        <dd>\n          The distance between connected nodes when using \'layout\'\n        </dd>\n        <dt>\n          rank-sep\n        </dt>\n        <dd>\n          The distance between each row of nodes in the directed graph when using \'layout\'\n        </dd>\n        <dt>\n          timeout\n        </dt>\n        <dd>\n          How long to wait until the jsplumb directive gathers elements and renders connections.  Defaults to 100 milliseconds, if there\'s a lot of nodes to render, for example when using ng-repeat with lots of elements, it may be necessary to increase this setting.\n        </dd>\n      </dl>\n    </div>\n    <div class=\"col-md-6\">\n      <h5>Example HTML</h5>\n      <div hawtio-editor=\"jsplumbEx\" mode=\"fileUploadExMode\"></div>\n      <h5>Live example</h5>\n      <div class=\"ex-node-container\" hawtio-jsplumb draggable=\"true\" layout=\"true\">\n        <!-- Nodes just need to have an ID and the jsplumb-node class -->\n        <div ng-repeat=\"node in nodes\"\n          id=\"{{node}}\"\n          anchors=\"Continuous\"\n          class=\"jsplumb-node ex-node\">\n          <i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(node)\"></i> Node: {{node}}\n        </div>\n        <!-- You can specify a connect-to attribute and a comma separated list of IDs to connect nodes -->\n        <div id=\"node3\"\n          class=\"jsplumb-node ex-node\"\n          anchors=\"Left,Right\"\n          connect-to=\"node1,node2\">\n          <i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(\'node3\')\"></i> Node 3\n        </div>\n        <!-- Expressions and stuff will work too -->\n        <div ng-repeat=\"node in otherNodes\"\n          id=\"{{node}}\"\n          class=\"jsplumb-node ex-node\"\n          anchors=\"Continuous\"\n          connect-to=\"{{otherNodes[$index - 1]}}\"><i class=\"fa fa-plus clickable\" ng-click=\"createEndpoint(node)\"></i> Node: {{node}}</div>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("test-plugins/ui/html/pager.html","<div ng-controller=\"UI.UITestController1\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n      <h3>Pager</h3>\r\n      <hr>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/slideout.html","<div ng-controller=\"UI.UITestController1\">\r\n\r\n  <div class=\"row\">\r\n    <h3>Slideout</h3>\r\n    <p>Displays a panel that slides out from either the left or right and immediately disappears when closed</p>\r\n\r\n    <div hawtio-editor=\"sliderEx1\" mode=\"fileUploadExMode\"></div>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"sliderEx1\"></div>\r\n    </div>\r\n\r\n    <div hawtio-editor=\"sliderEx2\" mode=\"fileUploadExMode\"></div>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"sliderEx2\"></div>\r\n    </div>\r\n\r\n    <div hawtio-editor=\"sliderEx3\" mode=\"fileUploadExMode\"></div>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"sliderEx3\"></div>\r\n    </div>\r\n\r\n    <hr>\r\n  </div>\r\n\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/tags.html","<div class=\"row\">\r\n  <div class=\"col-md-12\">\r\n    <h2>Tags</h2>\r\n  </div>\r\n</div>\r\n<div class=\"row\" ng-controller=\"UITest.TagsController\">\r\n  <div class=\"col-md-4\">\r\n    <p>Directives that can be helpful for providing the user a way to narrow down the number of items in a list.  Tags are handled via 2 directives and a filter.  The hawtioTagList directive will will display a list of tags for an item, and provide click handlers to update a list of selected tabs.  The hawtioTagFilter directive builds an available list of tags, and manages the list of selected tags, providing the user a way of managing which tags are selectedTags.  Finally the selectedTags filter is used to hide list elements.</p>\r\n    <h5>Example Markup</h5>\r\n    <script type=\"text/ng-template\" id=\"tag-ex-template.html\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n          <ul>\r\n            <li ng-repeat=\"item in data | selectedTags:\'tags\':selected\">\r\n              {{item.id}}\r\n              <hawtio-tag-list tags=\"item.tags\" selected=\"selected\"></hawtio-tag-list>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-6\">\r\n          <hawtio-tag-filter tags=\"tags\"\r\n                             selected=\"selected\"\r\n                             collection=\"data\"\r\n                             collection-property=\"tags\"></hawtio-tag-filter>\r\n         </div>\r\n      </div>\r\n    </script>\r\n    <div hawtio-editor=\"template\" mode=\"html\"></div>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <div class=\"row\">\r\n      <h5>Example Data</h5>\r\n      <div hawtio-editor=\"toJson(data, true)\" read-only=\"true\" mode=\"javascript\"></div>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    <p>Click on any of the tags below to limit the visible items in the list</p>\r\n    <div class=\"directive-example\">\r\n      <div compile=\"template\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/template-popover.html","<div ng-controller=\"UI.UITestController2\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n      <h3>Template Popover</h3>\r\n      <p>Uses bootstrap popover but lets you supply an angular template to render as the popover body.  For example here\'s a simple template for the popover body:</p>\r\n      <script type=\"text/ng-template\" id=\"myTemplate\">\r\n<table>\r\n  <tbody>\r\n    <tr ng-repeat=\"(k, v) in stuff track by $index\">\r\n      <td>{{k}}</td>\r\n      <td>{{v}}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n      </script>\r\n      <div hawtio-editor=\"popoverEx\" mode=\"fileUploadExMode\"></div>\r\n\r\n      <p>\r\n      You can then supply this template as an argument to hawtioTemplatePopover.  By default it will look for a template in $templateCache called \"popoverTemplate\", or specify a templte for the \"content\" argument.  You can specify \"placement\" if you want the popover to appear on a certain side, or \"auto\" and the directive will calculate an appropriate side (\"right\" or \"left\") depending on where the element is in the window.\r\n      </p>\r\n\r\n      <script type=\"text/ng-template\" id=\"popoverExTemplate\">\r\n<ul>\r\n  <li ng-repeat=\"stuff in things\" hawtio-template-popover content=\"myTemplate\">{{stuff.name}}</li>\r\n</ul>\r\n      </script>\r\n      <div hawtio-editor=\"popoverUsageEx\" mode=\"fileUploadExMode\"></div>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"popoverUsageEx\"></div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n");
$templateCache.put("test-plugins/ui/html/zero-clipboard.html","<div ng-controller=\"UI.UITestController2\">\r\n\r\n  <div>\r\n    <div class=\"row\">\r\n      <h3>Zero Clipboard</h3>\r\n      <p>Directive that attaches a zero clipboard instance to an element so a user can click on a button to copy some text to the clipboard</p>\r\n      <p>Best way to use this is next to a readonly input that displays the same data to be copied, that way folks that have Flash disabled can still copy the text.</p>\r\n      <script type=\"text/ng-template\" id=\"zeroClipboardTemplate\">\r\n        <input type=\"text\" class=\"no-bottom-margin\" readonly value=\"Some Text!\">\r\n        <button class=\"btn\" zero-clipboard data-clipboard-text=\"Some Text!\" title=\"Click to copy!\">\r\n          <i class=\"fa fa-copy\"></i>\r\n        </button>\r\n      </script>\r\n      <div hawtio-editor=\"zeroClipboard\" mode=\"fileUploadExMode\"></div>\r\n      <div class=\"directive-example\">\r\n        <div compile=\"zeroClipboard\"></div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n");}]); hawtioPluginLoader.addModule("hawtio-ui-test-templates");