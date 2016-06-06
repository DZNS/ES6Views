'use strict';
let Layout = require('../layout').Layout

class Sample extends Layout {

    parse() {

        let data = this._data;
        let header = `<h1>${data.title}</h1>`
        let main = `<div><p>${data.description}</p></div>`

        this._markup = [header, main].join("")

    }

}

module.exports = Sample