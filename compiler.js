function hexdump(buffer, blockSize) {
   blockSize = blockSize || 16;
   var lines = [];
   var hex = "0123456789ABCDEF";
   for (var b = 0; b < buffer.length; b += blockSize) {
       var block = buffer.slice(b, Math.min(b + blockSize, buffer.length));
       var addr = ("0000" + b.toString(16)).slice(-4);
       var codes = block.split('').map(function (ch) {
           var code = ch.charCodeAt(0);
           return " " + hex[(0xF0 & code) >> 4] + hex[0x0F & code];
       }).join("");
       codes += "   ".repeat(blockSize - block.length);
       var chars = block.replace(/[\x00-\x1F\x20]/g, '.');
       chars +=  " ".repeat(blockSize - block.length);
       lines.push(addr + " " + codes + "  " + chars);
   }
   return lines.join("\n");
}

const fs = require('fs')
let bytecode = ''
fs.readFile('source.ns', (err, data )=> {
    let index = 0
    const tokens = data.toString().replace(/\n/g, ' ').split(' ')
    // console.log(tokens)
    function nextToken(){
        c = tokens[index]
        index++
        return c
    }
    while(index < tokens.length){
        token = nextToken()
        if(token == 'set'){
            bytecode+='\x03';
            const address = nextToken()
            const value = nextToken()
            bytecode+=String.fromCharCode(address)
            bytecode+=String.fromCharCode(value)
           
        }
        function math(operator){
            bytecode+=operator;
            const left = nextToken()
            const right = nextToken()
            const destination = nextToken()
            bytecode += String.fromCharCode(left)
            bytecode += String.fromCharCode(right)
            bytecode += String.fromCharCode(destination)
        }
        if(token == 'add'){
           math('\x04')
        
        }
        if(token == 'sub'){
            math('\x05')
         
         }
         if(token == 'div'){
            math('\x07')
         
         }
         if(token == 'mul'){
            math('\x06')
         
         }
         if(token == "print"){
             const message = nextToken()
             bytecode+="\x01" + String.fromCharCode(message.length) + message
             
         }

        if(token == 'prv'){
            const address = nextToken()
            bytecode+='\x02' + String.fromCharCode(address)
        }
    }
    fs.writeFile('source.nc', bytecode, () => {
        console.log("Written ")
    })
    console.log(hexdump(bytecode, 6))
})
