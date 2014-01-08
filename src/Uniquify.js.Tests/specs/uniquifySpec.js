///<reference path="~/dependencies/jasmine.js"/>
///<reference path="~/sources/macsen.core.js"/>
///<reference path="~/sources/sha256.js"/>
///<reference path="~/sources/uniquify.js"/>

describe("Uniquify.js", function () {
    var uniquifyer = new SecureClass();

    it("should return a password with the supplied length", function () {
        for (var expected = 1; expected < 64; expected++) {
            // Act
            var result = uniquifyer.generateSecurePass('google.com', 'supersecure', expected, true);
            // Assert
            expect(result.length).toBe(expected);
        }
    });
});