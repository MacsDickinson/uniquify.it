﻿(function () {
    this.Uniquify = Class.extend({
        generatePassword: function(domain, key, length, includeSpecial, iterations) {
            if (!iterations) iterations = 1;
            var password = key;
            for (var i = 0; i < iterations; i++) {
                password = this.getHash(domain, password, length, includeSpecial);
            }
            return password;
        },
        getHash: function(domain, key, length, includeSpecial) {
            var hash = hex_hmac_sha256(key, domain);
            return this.applySettings(hash, length, includeSpecial);
        },
        applySettings: function (hash, length, includeSpecial) {
            var chars = [];
            var defaultSpecials = ['!', '£', '$', '%', '&', '*', '@', '~', '#', '.', '<', '>', '?', ';', ':', '_', '+'];
            var standardChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            if (includeSpecial) {
                chars = chars.concat(defaultSpecials);
            }
            chars = chars.concat(standardChars);
            var bytes = [];
            for (var i = 0; i < hash.length; ++i) {
                bytes.push(hash.charCodeAt(i));
            }
            var pass = [];
            for (var k = 0; k < bytes.length; ++k) {
                pass.push(chars[(bytes[k] * (k + 1)) % chars.length]);
            }
            var result = "";
            for (var j = 0; j < pass.length; j++) {
                result += pass[j];
            }

            var securepass = result.substring((result.length - length) / 2, ((result.length - length) / 2) + length);

            if (includeSpecial) {
                var found = false;
                for (var s = 0; s < defaultSpecials.length; ++s) {
                    if (securepass.indexOf(defaultSpecials[s]) !== -1) {
                        found = true;
                    }
                }
                if (!found) {
                    securepass = securepass.replaceAt(bytes[length % bytes.length] % length, defaultSpecials[hash.length % defaultSpecials.length]);
                }
            }

            return securepass;
        }
    });
})();

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};