SecureClass = Class.extend({
    generateSecure: function(key, domain) {

    },
    generateMemorable: function (domain, key) {
        domain = domain.split('.')[0];
        var dLen = domain.length;
        var pad = "0000";
        var dChar = (pad.substring(0, pad.length - domain.length) + domain).split('');
        var kChar = (pad.substring(0, pad.length - key.length) + key).split('');

        return dChar[0]+dChar[1]+kChar[0]+kChar[1]+dLen+kChar[2]+kChar[3]+dChar[2]+dChar[3];
    }
})