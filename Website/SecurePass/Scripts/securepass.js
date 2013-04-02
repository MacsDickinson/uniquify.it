SecureClass = Class.extend({
    generateSecure: function (domain, key) {
        domain = domain.split('.')[0];
        return hex_hmac_sha256(key, domain);
    },
    generateMemorable: function (domain, key) {
        domain = domain.split('.')[0];
        var dLen = domain.length;
        var kLen = key.length;
        var pad = "0000000";
        var dChar = (pad.substring(0, pad.length - domain.length) + domain).split('');
        var kChar = (pad.substring(0, pad.length - key.length) + key).split('');

        var char1 = dLen % 7;
        var char2 = kLen % 7;
        var char3 = (dLen * kLen) % 7;
        var char4 = Math.ceil((dLen / kLen) * 100) % 7;
        return dChar[char1] + dChar[char2] + kChar[char1] + kChar[char2] + dLen + kChar[char3] + kChar[char4] + dChar[char3] + dChar[char4];
    }
})