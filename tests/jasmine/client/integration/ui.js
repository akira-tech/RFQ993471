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
    it("ORAL HUMAN PRESCRIPTION DRUG is the most popular category", function (cb) {
        waitForSelector("#legend_panel_contents .row .col-md-10", function () {
            expect($("#legend_panel_contents .row .col-md-10")[0].innerText).toEqual('ORAL HUMAN PRESCRIPTION DRUG');
            cb();
        });
    }, 20000);
    it("'Patients' is the most popular word", function (cb) {
        waitForSelector("#vis svg g text:first-child", function () {
            expect($("#vis svg g text:first-child").text()).toEqual('patients');
            cb();
        });
    }, 20000);
});
