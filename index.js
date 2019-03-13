const http = require("http")
const url = require("url")
const fs = require("fs")
const querystring = require('querystring');
const {util} = require( "./utils" )
const httpServer = http.createServer((req,res)=>{
    let pathname = url.parse(req.url).pathname

    switch (pathname) {
        case "/":
            let strs = fs.readFileSync("./public/index.html");
            strs = strs.toString();
            let list = util.list();
   
console.info(typeof strs, strs)
            let messageStr = util.buildHtmlStr(list);

            strs = strs.replace("##messagecontent##",messageStr)
         

            res.statusCode = 200;
            res.end(strs);

            break;
        case "/add":
            let info = "";
            req.on("data",(rs)=>{
                info += rs;
            });
            req.on("end",()=>{
                let postInfo = querystring.parse(info)
                console.info(postInfo)
                
                util.insert(postInfo.content)

                res.writeHead(200, {"context-text" : "text/html;charset=utf-8"});
                res.write(`<html><head><meta charset="UTF-8"> </head><body><p>添加成功！${postInfo.content}<a href="./">返回</a></p></body></html>`)
                res.end();
            })
            break;
        default:
            console.info(req.url)
            if(fs.existsSync(__dirname+req.url)){
                let strs = fs.readFileSync(__dirname+req.url);

                res.statusCode = 200;
                res.end(strs);
            }
            res.end();
            break;
    }
})

httpServer.listen(300,()=>{
    
})