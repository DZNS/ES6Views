'use strict';
let Layout = require('../layout').Layout

class Sample extends Layout {

    parse() {

        let data = this._data;
        let header = `<h1>Sample ES6 View</h1>`
        let main = `<div>
            <p>This is a sample ES6 View. It only uses the header and main interstitials. See the README for full examples.</p>
        </div>`

        this._markup = Array.prototype.slice.call([header, main]).join("")

    }

}

module.exports = Sample