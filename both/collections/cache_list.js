CacheList = new Mongo.Collection('wordcloud_cache'); // yes, redis or memcached would work better here, but let's stick with MongoDB for PoC sake here
CacheList.before.insert(function (userId, doc) {
    doc.createdAt = moment().toDate();
});
