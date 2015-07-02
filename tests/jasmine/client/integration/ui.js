if (navigator.userAgent.indexOf("PhantomJS") > 0) {
    var consoleReporter = new jasmineRequire.ConsoleReporter()({
        showColors: true,
        timer: new jasmine.Timer,
        print: function() {
            console.log.apply(console, arguments)
        }
    });

    jasmine.getEnv().addReporter(consoleReporter);
}

function waitForSelector(selector, successCallback) {
    var checkInterval = 500;
    var timeout = 20000;
    var elapsedTime = 0,
        intervalID = Meteor.setInterval(function () {
            elapsedTime += checkInterval;
            if ($(selector).length > 0) {
                Meteor.clearInterval(intervalID);
                successCallback();
            }
            if (elapsedTime >= timeout) {
                Meteor.clearInterval(intervalID);
            }
        }, checkInterval);
}

describe("Layout", function () {
    it("Displays correct header", function () {
        expect($(".logo h1").text()).toEqual('Warning Prevalence by Route and Product Type');
    });
    it("Shows Legend tab contents by default", function () {
        expect($("a[role='tab'][aria-expanded='true'] h2").text()).toEqual('Legend');
    });
    // Integration tests arenot requested, but this is a good place for them anyway
});
