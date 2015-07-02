describe("Logic", function () {

    beforeEach(function () {
        console.log( "TEST" );
        MeteorStubs.install();
    });

    afterEach(function () {
        MeteorStubs.uninstall();
    });

    it("Template.home", function () {
        spyOn(Template.home, "rendered").and.callThrough();
        Template.home.rendered();
        expect(Template.home.rendered).toHaveBeenCalled();
        expect(generate).toHaveBeenCalled();
blah
        /*
        expect( orig_w ).toEqual( 960 );
        expect( orig_h ).toEqual( 600 );
        expect( w ).toEqual( 960 );
        expect( h ).toEqual( 600 );
        $('html').attr('lang', 'en');
        */
    });
});
