/**
 * Dependency Modules
 */
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const { Key } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// Application Server
// local
// const serverUri = "http://localhost:3000";
// travis
const serverUri = "http://localhost:8082";
const By = webdriver.By;

let browser;

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


test.describe('Login', function () {

    this.timeout(0);

    beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser('firefox')
            .build();
        browser.get(serverUri+"/login");
        done();
    });

    afterEach(function(done) {
        browser.quit();
        done();
    });


    // Test case
    test.it('Test login title and header', function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, 'Gold Trading');
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, 'Gold Trading');
        });

        assertH1('Log in');
        matchUrl('login');

        done();
    });

    test.it('Test login form submit-button exists', function(done) {
        browser.findElement(By.className('btn btn-primary')).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, "submit")
            })
        })
        matchUrl('login');

        done();
    });

    test.it('Test login form function', async function(done) {
        let email = 'testar@testar.testar';

        await browser.findElement(By.name('email')).sendKeys(email);
        await browser.findElement(By.name('password')).sendKeys('testar');
        await browser.findElement(By.className('btn btn-primary')).sendKeys(Key.ENTER);
        done();
    });
});