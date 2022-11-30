const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const ejs = require('ejs')


const server = http.createServer((req, res) => {

    const requestURL = url.parse(req.url, true)

    switch (requestURL.pathname) {
        case '/helloworld':
            const fileDir = path.resolve('./', 'templates', 'helloWorld.html')

            fs.readFile(fileDir, (err, data) => {
                res.writeHead(200,{
                    'Content-type' : 'text/html; charset=utf-8'
                    })
                res.end(data)
            })
            break;
    
        case '/ejs' :
            const fileDirEjs = path.resolve('./', 'templates', 'helloWorld.ejs')

            ejs.renderFile(fileDirEjs,{nom : "pol"}, (err, render) => {
                if (err) {
                    console.log(err.message);
                    res.writeHead(500,{
                        'Content-type' : 'text/html; charset=utf-8'
                        })
                    res.end('Ca a pete 💣')
                }
                res.writeHead(200)
                res.end(render)
            })

            break;
        
        case '/products' : 
            
            const products = [
                {name : 'babibel', price : 2.5},
                {name : 'rustique', price : 5},
                {name : 'president', price : 6},
                {name : 'comte', price : 4.2},
            ]

            const fileDirProducts = path.resolve('./', 'templates', 'products.ejs')

            ejs.renderFile(fileDirProducts, {products : products}, (err, render) => {
                res.writeHead(200)
                res.end(render)
            } )

            break;
        
            default:
            break;
    }

    

    

})

server.listen(1337)