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
        return ModelView.minify(this.markup);
    }

    parse() {

        console.log("Subclasses should implement how views are drawn. Do not call super. It does nothing.");

        return undefined;

    }

    static minify(html) {
        return html.replace(/\r?\n?/gim, "").replace(/\s{2,10000}/gim,"");
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
        
        var partial = options.renderPartial;
        var layout = require(filePath);

        delete options["_locals"]; //circular

        var current = new layout(options);
        var env = process.env.NODE_ENV;
        var isDev = (env == "dev" || env == "development");

        if(partial) {
            var markup = current[partial](options);
            callback(undefined, isDev ? markup : ModelView.minify(markup));
            return;
        }
        
        callback(undefined, current.markup);
        
    });

}

export {ModelView as ModelView}
export {Layout as Layout}
export {viewEngine as viewEngine}