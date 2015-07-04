Npm = {
    require: function ( lib ) {
        return require( lib );
    }
};

CacheList = {
    allow: function() {}
};

Router = {
    map: function() {}
};

Meteor = {
    startup: function( f ) { f() },
    publish: function( str, f ) {},
    methods: function( a ) {},
    http: {
        get: function() {
            return {
                statusCode: 200
            }
        }
    }
};
