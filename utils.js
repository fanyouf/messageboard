const fs = require("fs");
const filename = "/message.json"
const util = {
    buildHtmlStr:(msgList)=>{
        if(msgList.length === 0){
            return "<p>not data</p>"
        }
        else {
            let arr = msgList.map(msg=>{
                return `<div class="message"><p>${msg.content}</p> <span>${msg.dateTime}</span></div>`
            });
            return arr.join("");
        }
    },
    insert:(content)=>{
        let curMsg ={content,dateTime:new Date()}
        if(fs.existsSync(__dirname+filename)){
            let str = fs.readFileSync(__dirname+filename);
            let arr = JSON.parse(str) 
            if(typeof arr !== "object"){
                arr = JSON.parse( arr )
            }
            arr.unshift(curMsg);

            fs.writeFileSync(__dirname+filename,JSON.stringify(arr));
        }
        else{
            
            let arr = [curMsg]
            let str = JSON.stringify(arr);
            fs.writeFileSync(__dirname+filename,JSON.stringify(str));
        }
    },
    list:()=>{
        if(fs.existsSync(__dirname+filename)){
  
            let str = fs.readFileSync(__dirname+filename);
            let arr = JSON.parse(str);
            if(typeof arr === "object"){
                return arr;
            }
            else {

                return JSON.parse(arr);
            }
        }
        else{
           return []
        }
    }
}
exports.util = util