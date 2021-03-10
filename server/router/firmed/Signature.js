const sjcl = require('./Encrypted') 

function toHex (message) {
    let str = '', c;
    for (let i = 0; i < message.length; i++) {
        c = message.charCodeAt(i);
        str += c.toString(16) ;
    }
    return str;
}

function sign(originalMessage, key){
    const message =toHex(originalMessage);
    let signature, hmac;    
    hmac = new sjcl.misc.hmac(sjcl.codec.hex.toBits(key), sjcl.hash.sha256);
    signature = sjcl.codec.hex.fromBits(hmac.encrypt(sjcl.codec.hex.toBits(message)));
    return signature;
}

module.exports.sign = sign

