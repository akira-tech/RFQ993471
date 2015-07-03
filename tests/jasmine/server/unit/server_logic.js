
describe("Server-side code", function () {
    beforeEach(function () {
        MeteorStubs.install();
        //mock(global, 'Players');
    });

    afterEach(function () {
        MeteorStubs.uninstall();
    });

    it("defines CacheList", function () {
        expect( CacheList ).toBeTruthy();
    });
    it("defines blacklist", function () {
        expect( blacklist ).toBeTruthy();
        expect( blacklist).toMatch( /myself/ );
    });
    it("Defines core functions", function () {
        expect( get_data ).toBeTruthy();
        expect( get_words_frequency ).toBeTruthy();
    });
    /*
    describe( "get_words_frequency", function() {
        it( "work", function() {
            spyOn( JSON, 'stringify').and.callThrough();
            spyOn( global, 'get_data').and.callThrough();
            get_words_frequency();
            expect( JSON.stringify).toHaveBeenCalled();
            expect( get_data ).toHaveBeenCalledWith( 200 );
            this.response.statusCode == 200;
            this.response.getHeader("Content-Type") == "application/javascript";
        } );
    } );
    */
});
