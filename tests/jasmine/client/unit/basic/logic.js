describe("Logic", function () {

    beforeEach(function () {
        MeteorStubs.install();
    });

    afterEach(function () {
        MeteorStubs.uninstall();
    });

    it("Calls startup", function () {
        console.log( "TEST ==================== #$%#$%#$%#$%#%$" );
        spyOn(Meteor, "startup").and.callThrough();
        Meteor.startup();
        expect(Meteor.startup).toHaveBeenCalled();
        /*
        expect( orig_w ).toEqual( 960 );
        expect( orig_h ).toEqual( 600 );
        expect( w ).toEqual( 960 );
        expect( h ).toEqual( 600 );
        $('html').attr('lang', 'en');
        */
    });
});
