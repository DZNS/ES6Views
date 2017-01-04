"use strict";

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

        if(!this._locals.renderPartial)
            this.parse()

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
        
            var html = Array.prototype.slice.call(arguments).join("");
            this._markup = html;

        */

    }

}

const parser = (filePath, options, callback) => {
        
    const _parser = (cb, reject) => {
        let partial = options.renderPartial
        let XLayout = require(filePath)
        delete options["_locals"] //circular

        let current = new XLayout(options)
        let env = process.env.NODE_ENV
        let isDev = (env == "dev" || env == "development")

        if(partial) {
            let markup = current[partial](options)
            if(cb && reject)
                cb(markup)
            else
                cb(undefined, markup)
            return;
        }
            
        if(cb && reject)
            cb(current.markup)
        else
            cb(undefined, current.markup)
    }

    if(callback) 
        _parser(callback)
    else
        return new Promise(_parser)
    
}

const viewEngine = app => {
    app.engine('es6', parser)
}

module.exports = {
    ModelView,
    Layout,
    viewEngine,
    parser
}
