describe("Agile BPA PoC", function () {

    describe( "in general", function() {
        beforeAll(function() {
            require('../../server/methods/api.js');
        });
        afterAll(function() {
            delete require.cache[require.resolve( '../../server/methods/api.js' )]
        });
        it("should load all necessary libs", function () {
            expect(_).toBeTruthy();
            expect(fs).toBeTruthy();
        });
        it("should define blacklist", function () {
            expect(blacklist).toBeTruthy();
            expect(blacklist).toMatch(/yourself/);
        });
    } );

    describe("CacheList", function() {
        beforeEach(function() {
            spyOn( CacheList, 'allow' );
            require('../../server/methods/api.js');
        });
        afterEach(function() {
            delete require.cache[require.resolve( '../../server/methods/api.js' )]
        });
        it("should configure CacheList", function () {
            expect(CacheList.allow ).toHaveBeenCalled();
        });
    } );

    describe("get_data", function() {
        beforeEach(function() {
            spyOn( global, 'get_data' ).and.callThrough();
            spyOn( Meteor.http, 'get' ).and.callFake( function( url, options ) {
                return {
                    statusCode: 200,
                    content: '{"results":[]}'
                }
            } );
            spyOn( JSON, 'parse' ).and.callThrough();
            require('../../server/methods/api.js');
            get_data( 150 );
        });
        afterEach(function() {
            delete require.cache[require.resolve( '../../server/methods/api.js' )]
        });
        it("should retrieve data and parse", function () {
            expect( Meteor.http.get ).toHaveBeenCalled();
            expect( Meteor.http.get ).toHaveBeenCalledWith('https://api.fda.gov/drug/label.json?api_key=xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100', Object({ timeout: 30000 }));
            expect( JSON.parse ).toHaveBeenCalledWith('{"results":[]}');
        });
    } );
});
