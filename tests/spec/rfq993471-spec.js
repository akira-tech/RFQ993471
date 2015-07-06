describe("Agile BPA PoC", function () {

    describe("in general", function () {
        beforeAll(function () {
            require('../../server/methods/api.js');
        });
        afterAll(function () {
            delete require.cache[require.resolve('../../server/methods/api.js')]
        });
        it("should load all necessary libs", function () {
            expect(_).toBeTruthy();
            expect(fs).toBeTruthy();
        });
        it("should define blacklist", function () {
            expect(blacklist).toBeTruthy();
            expect(blacklist).toMatch(/yourself/);
        });
    });

    describe("CacheList", function () {
        beforeEach(function () {
            spyOn(CacheList, 'allow');
            require('../../server/methods/api.js');
        });
        afterEach(function () {
            delete require.cache[require.resolve('../../server/methods/api.js')]
        });
        it("should configure CacheList", function () {
            expect(CacheList.allow).toHaveBeenCalled();
        });
    });

    describe("get_data", function () {
        describe("get_data with empty data", function () {
            beforeEach(function () {
                spyOn(global, 'get_data').and.callThrough();
                spyOn(Meteor.http, 'get').and.callFake(function (url, options) {
                    return {
                        statusCode: 200,
                        content: '{"results":[]}'
                    }
                });
                spyOn(JSON, 'parse').and.callThrough();
                spyOn(String.prototype, 'toLowerCase').and.callThrough();
                require('../../server/methods/api.js');
                get_data(150);
            });
            afterEach(function () {
                delete require.cache[require.resolve('../../server/methods/api.js')]
            });
            it("should retrieve data and parse", function () {
                expect(Meteor.http.get).toHaveBeenCalled();
                expect(Meteor.http.get).toHaveBeenCalledWith('https://api.fda.gov/drug/label.json?api_key=xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100', Object({ timeout: 30000 }));
                expect(JSON.parse).toHaveBeenCalledWith('{"results":[]}');
                expect(String.prototype.toLowerCase).toHaveBeenCalled();
                expect(String.prototype.toLowerCase.calls.count()).toEqual(2);
            });
        });

        describe("with non-empty data", function () {
            var ret;
            beforeEach(function () {
                spyOn(global, 'get_data').and.callThrough();
                spyOn(Meteor.http, 'get').and.callFake(function (url, options) {
                    return {
                        statusCode: 200,
                        content: '{"results":[{"warnings":["testw"], "openfda":{"route":["testr"],"product_type":["pt"]}}]}'
                    }
                });
                spyOn(JSON, 'parse').and.callThrough();
                spyOn(String.prototype, 'toLowerCase').and.callThrough();
                require('../../server/methods/api.js');
                ret = get_data(150);
            });
            afterEach(function () {
                delete require.cache[require.resolve('../../server/methods/api.js')]
            });
            it("should retrieve data and parse", function () {
                expect(Meteor.http.get).toHaveBeenCalled();
                expect(Meteor.http.get).toHaveBeenCalledWith('https://api.fda.gov/drug/label.json?api_key=xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100', Object({ timeout: 30000 }));
                expect(JSON.parse).toHaveBeenCalledWith('{"results":[{"warnings":["testw"], "openfda":{"route":["testr"],"product_type":["pt"]}}]}');
                expect(String.prototype.toLowerCase).toHaveBeenCalled();
                expect(String.prototype.toLowerCase.calls.count()).toEqual(3);
                expect(ret).toEqual([ Object({ key: 'testr pt::testw', value: 1 }) ]);
            });
        });

        describe("with non-empty data with multiple values in arrays", function () {
            var ret;
            beforeEach(function () {
                spyOn(global, 'get_data').and.callThrough();
                spyOn(Meteor.http, 'get').and.callFake(function (url, options) {
                    return {
                        statusCode: 200,
                        content: '{"results":[{"warnings":["testw"], "openfda":{"route":["testr1","testr2"],"product_type":["pt1","pt2"]}}]}'
                    }
                });
                spyOn(JSON, 'parse').and.callThrough();
                spyOn(String.prototype, 'toLowerCase').and.callThrough();
                require('../../server/methods/api.js');
                ret = get_data(150);
            });
            afterEach(function () {
                delete require.cache[require.resolve('../../server/methods/api.js')]
            });
            it("should retrieve data and parse", function () {
                expect(Meteor.http.get).toHaveBeenCalled();
                expect(Meteor.http.get).toHaveBeenCalledWith('https://api.fda.gov/drug/label.json?api_key=xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100', Object({ timeout: 30000 }));
                expect(JSON.parse).toHaveBeenCalledWith('{"results":[{"warnings":["testw"], "openfda":{"route":["testr1","testr2"],"product_type":["pt1","pt2"]}}]}');
                expect(String.prototype.toLowerCase).toHaveBeenCalled();
                expect(String.prototype.toLowerCase.calls.count()).toEqual(3);
                expect(ret).toEqual([ Object({ key: 'testr1 pt1::testw', value: 1 }), Object({ key: 'testr1 pt2::testw', value: 1 }), Object({ key: 'testr2 pt1::testw', value: 1 }), Object({ key: 'testr2 pt2::testw', value: 1 }) ]);
            });
        });

        describe("with incorrect response code", function () {
            var ret;
            beforeEach(function () {
                spyOn(global, 'get_data').and.callThrough();
                spyOn(Meteor.http, 'get').and.callFake(function (url, options) {
                    return {
                        statusCode: 404,
                        content: '{"results":[{"warnings":["testw"], "openfda":{"route":["testr1","testr2"],"product_type":["pt1","pt2"]}}]}'
                    }
                });
                spyOn(JSON, 'parse').and.callThrough();
                spyOn(String.prototype, 'toLowerCase').and.callThrough();
                spyOn(console, 'log').and.returnValue(null);
                require('../../server/methods/api.js');
            });
            afterEach(function () {
                delete require.cache[require.resolve('../../server/methods/api.js')]
            });
            it("throws error", function () {
                expect(function () {
                    ret = get_data(150)
                }).toThrowError();
                expect(Meteor.http.get).toHaveBeenCalledWith('https://api.fda.gov/drug/label.json?api_key=xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100', Object({ timeout: 30000 }));
                expect(JSON.parse).not.toHaveBeenCalledWith('{"results":[{"warnings":["testw"], "openfda":{"route":["testr1","testr2"],"product_type":["pt1","pt2"]}}]}');
                expect(String.prototype.toLowerCase).toHaveBeenCalled();
                expect(String.prototype.toLowerCase.calls.count()).toEqual(2);
                expect(ret).toBeFalsy();
                expect(console.log).toHaveBeenCalledWith('Response issue', 404);
            });
        });
    });
    describe("get_words_frequency", function () {
        beforeEach(function () {
            require('../../server/methods/api.js');
            response = {}
            response.setHeader = function () {
            };
            response.end = function () {
            };
            spyOn(global, 'get_words_frequency').and.callThrough();
            spyOn(response, 'end');
            spyOn(response, 'setHeader');
            get_data = function () {
                return {}
            }
            get_words_frequency();
        });
        afterEach(function () {
            delete require.cache[require.resolve('../../server/methods/api.js')]
        });
        it("should generate appropriate JSON output", function () {
            expect(response.statusCode).toEqual(200);
            expect(response.setHeader).toHaveBeenCalledWith("Content-Type", "application/javascript");
            expect(response.end).toHaveBeenCalledWith('{}');
        });
    });
    describe("Router", function () {
        beforeEach(function () {
            spyOn(Router, 'map').and.callThrough();
            require('../../server/methods/api.js');
        });
        afterEach(function () {
            delete require.cache[require.resolve('../../server/methods/api.js')]
        });
        it("adds route for REST API", function () {
            expect(Router.map).toHaveBeenCalledWith(jasmine.any(Function));
        });
    });
    describe("Meteor", function () {
        beforeEach(function () {
            spyOn(Meteor, 'methods').and.callThrough();
            spyOn(Meteor, 'startup').and.callThrough();
            require('../../server/methods/api.js');
        });
        afterEach(function () {
            delete require.cache[require.resolve('../../server/methods/api.js')]
        });
        it("should provide get_data", function () {
            expect(Meteor.methods).toHaveBeenCalledWith({ drug_label: jasmine.any(Function) });
        });
        it("should start", function () {
            expect(Meteor.startup).toHaveBeenCalledWith(jasmine.any(Function));
        });
    });
});
