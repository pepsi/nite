 let memory = {}
 for(i = 0; i < 128; i++){
    memory[i] = '\x00'
 }
 
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
 const codes = {
     '\x00': () => {},
    '\x01': function(next){ //PRINT X YZV (x = number of bytes to print, YZV = Bytes equal with length equal to X)
        const length = next()
        let printText = ''
        for(i = 0; i < length.charCodeAt(0); i++ ){
            printText += next()
        }
        process.stdout.write(printText)
    },
    '\x02': function(next){ // print var
        const _var = next()
        console.log(memory[_var.charCodeAt()])
    },
    '\x03': function(next) { // Set memory address
        const address = next();
        const value = next();
        memory[address.charCodeAt(0)] = value.charCodeAt(0);
    },
    '\x04': function(next){ //add
        const address1 = next();
        const address2 = next();
        const destination = next();
        memory[destination.charCodeAt(0)] = memory[address1.charCodeAt(0)] + memory[address2.charCodeAt(0)];

    },
    '\x05': function(next){ //sub
        const address1    = next();
        const address2    = next();
        const destination = next();
        memory[destination.charCodeAt(0)] = memory[address1.charCodeAt(0)] - memory[address2.charCodeAt(0)];
    },
    '\x06': function(next){ //mul
        const address1    = next();
        const address2    = next();
        const destination = next();
        memory[destination.charCodeAt(0)] = memory[address1.charCodeAt(0)] * memory[address2.charCodeAt(0)];
    },
    '\x07': function(next){ //div
        const address1    = next();
        const address2    = next();
        const destination = next();
        memory[destination.charCodeAt(0)] = memory[address1.charCodeAt(0)] / memory[address2.charCodeAt(0)];
    }
 }
 const fs = require('fs')
 fs.readFile('source.nc', (err, data )=> {
    //  console.log(data)
     index = 0;
     function nextChar(){
         c = data.toString()[index]
         index++
         return c
     }
     prev = codes[nextChar()](nextChar)
    while(index < data.length){
        n = nextChar()
     next = (codes[n] || (() => {})) (nextChar)
    
    }
 })