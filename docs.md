File extension:

    .ns
        Nite source - Plain text source code
    .nc 
        Nite Compiled - Compiled bytecode for nite
    .ni
        Deprecated file extension, short for Nite

Misc:

    0x0 - nothing
    0x1 - <length> 
        Prints the next <length> bytes to STDOUT
    0x2 - <varAddress>
        Prints the content at varAdrress to STDOUT (kinda broken i think)
    0x3 - <location> <value>
        Sets memory at location <location> to <value>

Math:

    0x4 - <a> <b> <destination>
        Adds a and b and copies to <destination>
    0x5 - <a> <b> <destination>
        Subtracts a from b and copies to <destination>

    0x6 - <a> <b> <destination>
        Multiplies a and b and copies to <destination>

    0x7 - <a> <b> <destination>
        Divides a by b and copies to <destination>