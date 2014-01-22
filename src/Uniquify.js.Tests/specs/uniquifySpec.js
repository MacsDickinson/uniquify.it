///<reference path="~/dependencies/jasmine.js"/>
///<reference path="~/sources/macsen.core.js"/>
///<reference path="~/sources/sha256.js"/>
///<reference path="~/sources/uniquify.js"/>

describe("Uniquify.js", function () {
    var uniquifyer = new Uniquify();

    it("should return expected password", function() {
        // Arrange
        var domain = 'google.com';
        var key = 'OXts6Qm?';
        var expected = 'tP$gyy_*';
        // Act
        var result = uniquifyer.generatePassword(domain, key, 8, true);
        // Assert
        expect(result).toBe(expected);
    });

    it("should return a password with the supplied length", function () {
        for (var i = 1; i < 64; i++) {
            // Act
            var result = uniquifyer.generatePassword('google.com', 'supersecure', i, true);
            // Assert
            expect(result.length).toBe(i);
        }
    });

    it("should return a password with special chars when specified", function () {
        // Act
        var result = uniquifyer.generatePassword('google.com', 'supersecure', 20, true);

        // Assert
        expect(containsSpecialChar(result)).toBeTruthy();
    });

    it("should return a password without special chars when specified", function () {
        // Act
        var result = uniquifyer.generatePassword('google.com', 'supersecure', 20, false);

        // Assert
        expect(containsSpecialChar(result)).toBeFalsy();
    });

    it("should return 1 iteration if no iterations are supplied", function() {
        // Act
        var oneiteration = uniquifyer.generatePassword('google.com', 'supersecure', 20, false, 1);
        var noiterations = uniquifyer.generatePassword('google.com', 'supersecure', 20, false);
        // Assert
        expect(noiterations).toBe(oneiteration);
    });

    it("should return different password for two iterations", function () {
        // Act
        var result = uniquifyer.generatePassword('google.com', 'supersecure', 20, false, 2);
        var oneiterations = uniquifyer.generatePassword('google.com', 'supersecure', 20, false, 1);
        // Assert
        expect(result).toNotBe(oneiterations);
    });

    it("should return password contained one of the specified special characters", function () {
        // Arrange
        var special = ['£'];
        // Act
        var result = uniquifyer.generatePassword('google.com', 'supersecure', 20, true, 2, special);
        // Assert
        expect(containsSpecialChar(result)).toBeTruthy();
    });

    function containsSpecialChar(result, special) {
        if (!special) special = ['!', '£', '$', '%', '&', '*', '@', '~', '#', '.', '<', '>', '?', ';', ':', '_', '+'];
        for (var s in special) {
            if (result.indexOf(special[s]) > -1) {
                return true;
            }
        }
        return false;
    }
});