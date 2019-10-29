/**
 * Dependency Modules
 */
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const firefox = require('selenium-webdriver/firefox');

// Application Server
// local
// const serverUri = "http://localhost:3000";
// travis
const serverUri = "http://localhost:8082";
const appTitle = "Gold Trading";
const By = webdriver.By;

let browser;

function goToNavLink(target) {
    browser.findElement(By.linkText(target)).then(function (element) {
        element.click();
    })
        .catch(error => console.log(error.message));
}

function matchUrl(target) {
    browser.getCurrentUrl().then(function (url) {
        assert.ok(url.endsWith("" + target));
    })
        .catch(error => console.log(error.message));
}

function assertH1(target) {
    browser.findElement(By.css("h1")).then(function (element) {
        element.getText().then(function (text) {
            assert.equal(text, target);
        })
            .catch(error => console.log(error.message));
    });
}


test.describe('Navbar navigation', function () {

    this.timeout(0);

    beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();
        browser.get(serverUri);
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });

    test.it('Test index', function (done) {
        browser.getTitle()
            .then(function (title) {
                assert.equal(title, appTitle);
                assert.notEqual(title, "Bananer");
            })
            .then(function () {
                assertH1("Welcome to Gold Trading!");
                matchUrl("");
            })
            .then(() => done())
    })


    test.it('Test go to Login', function (done) {
        goToNavLink("Login");

        assertH1("Log in");
        matchUrl("/login");

        done();
    });

    test.it('Test go to Register', function (done) {
        goToNavLink("Register");

        assertH1("Create Account");
        matchUrl("/register");

        done();
    });
    
    test.it('Test go to Trading without logged in', function (done) {
        goToNavLink("Trading");

        assertH1("Log in");
        matchUrl("login");

        done();
    });

    test.it('Test go to Gold Trading in navbar', function (done) {
        goToNavLink("Gold Trading");

        assertH1("Welcome to Gold Trading!");
        matchUrl("");

        done();
    });
});
