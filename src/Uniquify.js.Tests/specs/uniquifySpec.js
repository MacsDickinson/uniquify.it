///<reference path="~/dependencies/jasmine.js"/>
///<reference path="~/sources/macsen.core.js"/>
///<reference path="~/sources/sha256.js"/>
///<reference path="~/sources/uniquify.js"/>

describe("Uniquify.js", function () {
    var uniquifyer = new SecureClass();

    it("should return hashed password", function () {
        var result = uniquifyer.generateSecurePass('google.com', 'supersecure', '20', true);

        expect(result).toBe('cnS.:rN0_xhQ_MWt2W6D');
    });
});