const router = require('express').Router();
const path = require("path");
const fs=require("fs");


router.get("/getEnvironment/:process",function(req,res){
    console.log("welcome");
    if(req.params.process == "P1" || req.params.process == "P2"){
        const filePath = path.join(__dirname, req.params.process+"/.env");
              
        let readerStream = fs.createReadStream(filePath);

        let  result ={};
        readerStream.on('data', function(chunk) {
            console.log(chunk);
            let chunkArray = chunk.toString().split("\n");
            for(let i=0;i<chunkArray.length;i++)
            {
                let splitArray = chunkArray[i].toString().split("=") ;
                result[splitArray[0].toString().trim()] = splitArray[1].toString().trim();
            }
            console.log(result);
            res.send(result);
        });

        
    }
    else {
        res.send("Data not found").status(400); 
    }
  
});

router.post("/setEnvironment/:process/:key/:value",function(req,res){

    console.log("from post");

    if(req.params.process == "P1" || req.params.process == "P2"){
        const filePath = path.join(__dirname, req.params.process+"/.env");
              
        let readerStream = fs.createReadStream(filePath);

        let  result ={};
        readerStream.on('data', function(chunk) {
            console.log(chunk);
            let chunkArray = chunk.toString().split("\n");
            console.log("chunkArray" +chunkArray);
            for(let i=0;i<chunkArray.length;i++)
            {
                let splitArray = chunkArray[i].toString().split("=") ;
                result[splitArray[0].toString().trim()] = splitArray[1].toString().trim();
            }
            console.log(result);
            
            for(let key in result){
                if(key == req.params.key){
                    result[key] = req.params.value;
                }
            }
            
            let wstream = fs.createWriteStream(filePath);
            for(let key in result){
                wstream.write(key+" "+"="+" "+result[key]+"\n");
                
                                
            }
            wstream.end();

            res.send(result).status(200);
    });
        

        
    }
   
});

module.exports = router;