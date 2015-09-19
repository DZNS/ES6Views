class ModelView {

    constructor(data) {

        if(data) this.data = data;

    }

    set data(newData) {
        this._data = newData;
        this._markup = undefined;
    }

    get data() {
        return this._data;
    }

    get markup() {
        if(!this._markup)
            this.parse();

        return (this._markup || "").trim();
    }

    get minified() {
        return this.markup.replace(/\r?\n?/gim, "").replace(/\s{2,10000}/gim,"");
    }

    parse() {

        console.log("Subclasses should implement how views are drawn. Do not call super. It does nothing.");

        return undefined;

    }

}

class Layout extends ModelView {

    constructor(locals) {

        super(locals||{});
        this._locals = locals;
        this.parse();

    }

    parse() {

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

}

function viewEngine(app) {

    app.engine('es6', function (filePath, options, callback) {
        
        var layout = require(filePath);

        delete options["_locals"]; //circular

        var current = new layout(options);
        
        callback(undefined, current.minified);
        
    });

}

export {ModelView as ModelView}
export {Layout as Layout}
export {viewEngine as viewEngine}