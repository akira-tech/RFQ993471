Meteor.startup(function() {
	var fs = Npm.require('fs');
    var _ = Npm.require('underscore');
    var blacklist = new RegExp('^(' + "\\d+|\\S|\\S\\S|\\S\\S\\S|i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall"+ ')$');
    var cache;

	Meteor.methods({
		drug_label : function( count ) {
            if( cache ) {
                return cache;
            } else {
                var api_key = "xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa";
                var url = "https://api.fda.gov/drug/label.json?api_key=" + api_key + '&search=effective_time:[20090601+TO+20140731]+AND+_exists_:warnings&limit=100';
                var result = Meteor.http.get(url, {timeout:30000})
                if (result.statusCode == 200) {
                    var res = JSON.parse(result.content);
                    var words = [];
                    for (var i = 0; i < res.results.length; i++) {
                        for( var j in res.results[i].warnings ) {
                            var data = res.results[i].warnings[j].match(/\w+/g);
                            for( var k in data ) {
                                var word = data[k].toLowerCase();
                                if( !word.match( blacklist ) ) {
                                    for( var l in res.results[i].openfda.generic_name ) {
                                        words.push( res.results[i].openfda.generic_name[l] + '::' + word );
                                    }
                                }
                            }
                        }
                    }
                    var counted_words = _.reduce(words,function(counts,key){ counts[key]++; return counts }, _.object( _.map( _.uniq(words), function(key) { return [key, 0] })));
                    var counted_words_hash = _.map( counted_words, function( v, k ) { return {key: k, value: v} } );
                    counted_words_hash = _.sortBy( counted_words_hash, function(el) { return -el.value } );
                    counted_words_hash = _.first( counted_words_hash, count );
                    //console.log( "2>>>", counted_words_hash );
                    cache = counted_words_hash;
                    return counted_words_hash;
                } else {
                    console.log('Response issue', result.statusCode);
                    throw new Meteor.Error(result.statusCode, 'Error');
                }
            }
		}
	});

});

