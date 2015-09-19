"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelView = (function () {
    function ModelView(data) {
        _classCallCheck(this, ModelView);

        if (data) this.data = data;
    }

    _createClass(ModelView, [{
        key: "parse",
        value: function parse() {

            console.log("Subclasses should implement how views are drawn. Do not call super. It does nothing.");

            return undefined;
        }
    }, {
        key: "data",
        set: function set(newData) {
            this._data = newData;
            if (this._data) this.parse();else this._markup = undefined;
        },
        get: function get() {
            return this._data;
        }
    }, {
        key: "markup",
        get: function get() {
            return this._markup.trim();
        }
    }, {
        key: "minified",
        get: function get() {
            return this.markup.replace(/\r?\n?/gim, "").replace(/\s{2,10000}/gim, "");
        }
    }]);

    return ModelView;
})();

var Layout = (function (_ModelView) {
    _inherits(Layout, _ModelView);

    function Layout(locals) {
        _classCallCheck(this, Layout);

        _get(Object.getPrototypeOf(Layout.prototype), "constructor", this).call(this, locals || {});
        this._locals = locals;
        this.parse();
    }

    _createClass(Layout, [{
        key: "parse",
        value: function parse() {

            console.log("You should write your common layout logic in a subclass of Layout. When you're done, simply call super with your rendered interstetials.");

            /*
             * In your View subclass
                var header = "...";
                var main = "...";
                var footer ="...";
                super.parse(
                    header,
                    main,
                    footer
                )
             */

            /*
             * In your layout subclass
            
                var html = [].slice.call(arguments).join("");
                this._markup = html;
             */
        }
    }]);

    return Layout;
})(ModelView);

function viewEngine(app) {

    app.engine('es6', function (filePath, options, callback) {

        var layout = require(filePath);

        delete options["_locals"]; //circular

        var current = new layout(options);

        callback(undefined, current.minified);
    });
}

exports.ModelView = ModelView;
exports.Layout = Layout;
exports.viewEngine = viewEngine;
