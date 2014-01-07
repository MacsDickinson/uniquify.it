///<reference path="~/dependencies/jasmine.js"/>
///<reference path="~/dependencies/macsen.core.js"/>
///<reference path="~/dependencies/sha256.js"/>
///<reference path="~/sources/uniquify.js"/>

describe("Calculator", function () {
    var uniquifyer = new SecureClass();

    it("should return hashed password", function () {
        var result = uniquifyer.generateSecurePass('google.com', 'supersecure', '20', true);

        expect(result).toBe('cnS.:rN0_xhQ_MWt2W6D');
    });
});