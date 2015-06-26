Meteor.startup(function() {
	var fs = Npm.require('fs');
    var _ = Npm.require('underscore');
    var blacklist = new RegExp('^(' +"\\d+|i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall"+ ')$');

	function getAssetsFolder() {
		
		var meteor_root = Npm.require('fs').realpathSync( process.cwd() + '/../' );
		var application_root = Npm.require('fs').realpathSync( meteor_root + '/../' );

		// if running on dev mode
		if( Npm.require('path').basename( Npm.require('fs').realpathSync( meteor_root + '/../../../' ) ) == '.meteor' ){
		    application_root =  Npm.require('fs').realpathSync( meteor_root + '/../../../../' );
		}

		var assets_folder = meteor_root + '/server/assets/' + Npm.require('path').basename( application_root );

		return assets_folder;
	}	

    /*
	function makeBlackList(blacklistFile) {		
			
		    var data = fs.readFileSync(blacklistFile, 'utf8');
		    if (data != "") {
		    	data = JSON.parse(data);	
		    }
		    else {
		    	data = [];
		    }
		    
			for (var i = 0; i < data.length; i++) {
				var el = "|" + data[i];
				blacklist += el;
			}

			var re = new RegExp('^(' + blacklist + ')$');

			blacklist = re;
	}
    */
	function uniqueArray(arr) {
		var tags = {};

		for (var  i = 0; i < arr.length;) {
			arr[i] = arr[i].toLowerCase();			
			var item = arr[i];

			if (blacklist.test(item)) {
				arr[i] = arr[arr.length - 1].toLowerCase();
				arr.length -= 1;
				continue;
			}

			if (tags[item] > 0) {
				arr[i] = arr[arr.length - 1].toLowerCase();
				arr.length -= 1;
								
			} else {				
				i++;
			}
			tags[item] = (tags[item] || 0) + 1;
		} 
		
		var newArr = [];
		for (var x in tags) {
			newArr.push(
				{
					key : x, 
					value : tags[x]
				}
			);
		} 
		   
	    newArr.sort(function(t, e) {
	        return e.value - t.value
	    });


	    return newArr;
	};

	Meteor.methods({

		drug_label : function() {

			var api_key = "xEA2GiVgtrUzCbESm0JPHfG7QiVX7rUEG50hPOGa";
			var url = "https://api.fda.gov/drug/label.json?api_key=" + api_key + '&search=effective_time:[20090601+TO+20140731]+AND+_exists_:warnings&limit=100';
			//var require = __meteor_bootstrap__.require;
			//var asserts = getAssetsFolder();
			//var blacklistFile = asserts + '/blacklist.json';
			//makeBlackList(blacklistFile);
			var result = Meteor.http.get(url, {timeout:30000})
			if (result.statusCode == 200) {
				var res = JSON.parse(result.content);			
				var warnings = '';
				var words = [];
				for (var i = 0; i < res.results.length; i++) {
                    for( var j in res.results[i].warnings ) {
                        var data = res.results[i].warnings[j].match(/\w+/g);
                        for( var k in data ) {
                            var word = data[k].toLowerCase();
                            if( !word.match( blacklist ) ) {
                                words.push( word );
                            }
                        }
                    }
				}
                var counted_words = _.reduce(words,function(counts,key){ counts[key]++; return counts }, _.object( _.map( _.uniq(words), function(key) { return [key, 0] })));
                var counted_words_hash = _.map( counted_words, function( v, k ) { return {key: k, value: v} } );
                counted_words_hash = _.sortBy( counted_words_hash, function(el) { return -el.value } );
                counted_words_hash = _.first( counted_words_hash, 100 );
                console.log( "2>>>", counted_words_hash );
				//var uwords = uniqueArray(words);
				return counted_words_hash;
			} else {
				console.log('Response issue', result.statusCode);
				throw new Meteor.Error(result.statusCode, 'Error');
			}
			return {"result" : "ok"};
		}
	});

});

