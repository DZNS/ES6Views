# ES6Views
View Engine for ExpressJS. Write your views using ES6 Template Strings. Simple, fast, extensible.


### Installation
```
npm install --save es6views
```

### Usage
```js
// where ever you setup your view engine for ExpressJS
const esviews = require("es6views")
esviews.viewEngine(app)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'es6')
```

### Templates 
First off, create your base layout which will hold all the common logic for your views
```js
const Layout  = require("es6views").Layout

class MyLayout extends Layout {

    parse() {
        let markup = `<head>
            <title>${this._data.title}</title>
        </head>
        <body>`
        
        markup += [this.header(), this.content(), this.footer()].join("")
          
        markup += `</body>`
        
        this._markup = markup
    }
    
    header () {
        const data = this.data
        return `<header>${data.title}</header>`
    }
    
    content () {
        return ``
    }
    
    footer () {
        return `<footer>2008-${(new Date()).getFullYear() Dezine Zync Studios. All Rights Reserved.}</footer>`
    }
    
}

module.exports = MyLayout
```

Then, inside a page template, you can do the following: 
```js
const MyLayout = require('./mylayout.es6')

class Posts extends MyLayout {
    content () {
        const data = this.data
        const posts = data.posts
        
        return posts.map(post => {
            return `<article>${post.body}</article>`
        }).join("")
    }
}

module.exports = Posts
```

You can then use it in your route like so:
```js
router.get('/posts', (req, res) => {
    let locals = Object.assign({}, res.locals, {
        posts: posts
    })
    res.render('projects', locals)
})
```
