/* 
 * Tac gia: Nguyen Hoang Duy
 * Ngay: 2018.11.27
 */
$.widget('widget.MindMapTree', $.widget.base, {
    options: {
        name: 'MindMapTree',
        title: '',
        data: []
    },
    _create: function () {
        var self = this;
        this.nodeIdCounter = -1;
        this.element.css({ "height": "500px" });
        var div = $("<div id='contentMindMap'>").css({ "height": "100%" });
        div.append($("<div id='myDiagramDiv'>").css({ "height": "100%" }));
        div.append($("<div id='contextMenu'>").css({ "height": "100%" }));
        this.element.append(div);
        this.init();
        this._super();
        this._saveData(this);
    },
    init: function () {
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        var self = this;
        this.cxElement = this.element.find("#contextMenu")[0];
        var myContextMenu = $(go.HTMLInfo, {
            show: self.showContextMenu.bind(self),
            mainElement: self.cxElement
        });
        debugger;
        this.myDiagram =
            $(go.Diagram, this.element.find("#myDiagramDiv")[0], // must be the ID or reference to div
                {
                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = {
                            key: getNextKey(), // assign the key based on the number of nodes
                            name: "(new person)",
                            title: ""
                        };
                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout:
                        $(go.TreeLayout,
                            {
                                treeStyle: go.TreeLayout.StyleLastParents,
                                arrangement: go.TreeLayout.ArrangementHorizontal,
                                // properties for most of the tree:
                                angle: 90,
                                layerSpacing: 35,
                                // properties for the "last parents":
                                alternateAngle: 90,
                                alternateLayerSpacing: 35,
                                alternateAlignment: go.TreeLayout.AlignmentBus,
                                alternateNodeSpacing: 20
                            }),
                    "undoManager.isEnabled": true // enable undo & redo
                });
        this.myDiagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                { corner: 5, relinkableFrom: true, relinkableTo: true },
                $(go.Shape, { strokeWidth: 4, stroke: "#00a4a4" }));  // the link shape

        // read in the JSON-format data from the "mySavedModel" element
        //load();


        // support editing the properties of the selected person in HTML
        if (window.Inspector) myInspector = new Inspector("myInspector", this.myDiagram,
            {
                properties: {
                    "key": { readOnly: true },
                    "comments": {}
                }
            });
        this.myDiagram.nodeTemplate =
            $(go.Node, "Auto",
                { contextMenu: myContextMenu },
                { doubleClick: this.nodeDoubleClick.bind(self) },
                { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
                    mouseDragEnter: function (e, node, prev) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();
                        if (!self.mayWorkFor(selnode, node)) return;
                        var shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;  // remember the original brush
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: function (e, node, next) {
                        var shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;  // restore the original brush
                        }
                    },
                    mouseDrop: function (e, node) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();  // assume just one Node in selection
                        if (self.mayWorkFor(selnode, node)) {
                            // find any existing link into the selected node
                            var link = selnode.findTreeParentLink();
                            if (link !== null) {  // reconnect any existing link
                                link.fromNode = node;
                            } else {  // else create a new link
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },
                // for sorting, have the Node.text be the data.name
                new go.Binding("text", "name"),
                // bind the Part.layerName to control the Node's layer depending on whether it isSelected
                new go.Binding("layerName", "isSelected", function (sel) { return sel ? "Foreground" : ""; }).ofObject(),
                // define the node's outer shape
                $(go.Shape, "Rectangle",
                    {
                        name: "SHAPE", fill: "white", stroke: null,
                        // set the port properties:
                        portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                    }),
                $(go.Panel, "Horizontal",
                    $(go.Picture,
                        {
                            name: "Picture",
                            desiredSize: new go.Size(39, 50),
                            margin: new go.Margin(6, 8, 6, 10),
                        },
                        new go.Binding("source", "key", this.findImage.bind(this))),
                    // define the panel where the text will appear
                    $(go.Panel, "Table",
                        {
                            maxSize: new go.Size(150, 999),
                            margin: new go.Margin(6, 10, 0, 3),
                            defaultAlignment: go.Spot.Left
                        },
                        $(go.RowColumnDefinition, { column: 2, width: 4 }),
                        $(go.TextBlock, this.textStyle(),  // the name
                            {
                                row: 0, column: 0, columnSpan: 5,
                                font: "12pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 16)
                            },
                            new go.Binding("text", "name").makeTwoWay()),
                        $(go.TextBlock, "Chức vụ: ", this.textStyle(),
                            { row: 1, column: 0 }),
                        $(go.TextBlock, this.textStyle(),
                            {
                                row: 1, column: 1, columnSpan: 4,
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 14),
                                margin: new go.Margin(0, 0, 0, 3)
                            },
                            new go.Binding("text", "title").makeTwoWay()),
                        $(go.TextBlock, this.textStyle(),
                            { row: 2, column: 0 },
                            new go.Binding("text", "key", function (v) { return "ID: " + v; })),
                        $(go.TextBlock, this.textStyle(),
                            { name: "boss", row: 2, column: 3, }, // we include a name so we can access this TextBlock when deleting Nodes/Links
                            new go.Binding("text", "parent", function (v) { return "Boss: " + v; })),
                        $(go.TextBlock, this.textStyle(),  // the comments
                            {
                                row: 3, column: 0, columnSpan: 5,
                                font: "italic 9pt sans-serif",
                                wrap: go.TextBlock.WrapFit,
                                editable: true,  // by default newlines are allowed
                                minSize: new go.Size(10, 14)
                            },
                            new go.Binding("text", "comments").makeTwoWay())
                    )  // end Table Panel
                ) // end Horizontal Panel
            );  // end Node 
        //// when the document is modified, add a "*" to the title and enable the "Save" button
        //myDiagram.addDiagramListener("Modified", function (e) {
        //    var button = document.getElementById("SaveButton");
        //    if (button) button.disabled = !myDiagram.isModified;
        //    var idx = document.title.indexOf("*");
        //    if (myDiagram.isModified) {
        //        if (idx < 0) document.title += "*";
        //    } else {
        //        if (idx >= 0) document.title = document.title.substr(0, idx);
        //    }
        //});

        //// manage boss info manually when a node or link is deleted from the diagram
        //myDiagram.addDiagramListener("SelectionDeleting", function (e) {
        //    var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
        //    // so we'll get the first since we know we only have one selection
        //    myDiagram.startTransaction("clear boss");
        //    if (part instanceof go.Node) {
        //        var it = part.findTreeChildrenNodes(); // find all child nodes
        //        while (it.next()) { // now iterate through them and clear out the boss information
        //            var child = it.value;
        //            var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        //            if (bossText === null) return;
        //            bossText.text = "";
        //        }
        //    } else if (part instanceof go.Link) {
        //        var child = part.toNode;
        //        var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        //        if (bossText === null) return;
        //        bossText.text = "";
        //    }
        //    myDiagram.commitTransaction("clear boss");
        //});

        var levelColors = ["#AC193D", "#2672EC", "#8C0095", "#5133AB",
            "#008299", "#D24726", "#008A00", "#094AB2"];

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        this.myDiagram.layout.commitNodes = function () {
            go.TreeLayout.prototype.commitNodes.call(self.myDiagram.layout);  // do the standard behavior
            // then go through all of the vertexes and set their corresponding node's Shape.fill
            // to a brush dependent on the TreeVertex.level value
            self.myDiagram.layout.network.vertexes.each(function (v) {
                if (v.node) {
                    var level = v.level % (levelColors.length);
                    var color = levelColors[level];
                    var shape = v.node.findObject("SHAPE");
                    if (shape) shape.fill = $(go.Brush, "Linear", { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
                }
            });
        };

        //Create Context Menu
        this.cxElement.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            return false;
        }, false);

        var model = $(go.TreeModel);
        model.nodeDataArray = this.options.data;
        this.myDiagram.model = model;
        //this.myDiagram.model = go.Model.fromJson(this.options.data);
    },
    cxCommand: function () {
        debugger;
    },
    showContextMenu: function (obj, diagram, tool) {
        var self = this;
        var cmd = diagram.commandHandler;
        var ul = $("<ul>").appendTo(this.element.find("#contextMenu")[0]);
        var cut = $("<li id='cut'>")
            .css({ "display": cmd.canCutSelection() ? "block" : "none" })
            .append(
                $("<a href='#'>").html("cut")
            )
            .appendTo(ul)
            ;
        debugger;

        document.getElementById("cut").style.display = cmd.canCutSelection() ? "block" : "none";
        // Now show the whole context menu element
        this.cxElement.style.display =  "block" ;
        // we don't bother overriding positionContextMenu, we just do it here:
        var mousePt = diagram.lastInput.viewPoint;
        this.cxElement.style.left = mousePt.x + "px";
        this.cxElement.style.top = mousePt.y + "px";
    },
    getNextKey: function () {
        var key = this.nodeIdCounter;
        while (this.myDiagram.model.findNodeDataForKey(key) !== null) {
            key = this.nodeIdCounter--;
        }
        return key;
    },
    nodeDoubleClick: function (e, obj) {
        var clicked = obj.part;
        if (clicked !== null) {
            var thisemp = clicked.data;
            this.options.doubleClick(clicked.data);
        }
    },
    _CreateNode: function (newemp) {
        if (newemp == null) {
            newemp = { key: this.getNextKey(), name: "(new person)", title: "", parent: thisemp.key };
        }
        this.myDiagram.startTransaction("add employee");
        this.myDiagram.model.addNodeData(newemp);
        this.myDiagram.commitTransaction("add employee");
    },
    mayWorkFor: function (node1, node2) {
        if (!(node1 instanceof go.Node)) return false;  // must be a Node
        if (node1 === node2) return false;  // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
        return true;
    },
    GetRecords: function () {
        return this.options.data;
    },
    textStyle: function () {
        return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
    },
    findImage: function (key) {
        var node = this.options.data.find(function (x) {
            return x.key === key;
        });
        return node.Image || "/Content/Images/NotImage.png";
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