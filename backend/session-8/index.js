const fs = require("fs");

//fs.writeFileSync("./data.txt", "Esraa");
//fs.appendFileSync("./data.txt", "Esraa");

// fs.writeFile("./data.txt", "MEAN Stack", (error)=>{
//    if(error) console.log(error.message)
// })

const files = fs.readdirSync(".");
console.log(files);