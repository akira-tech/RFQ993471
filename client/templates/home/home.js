var fill,
    orig_w = 960,
    orig_h = 600,
    orig_scale = orig_w / orig_h,
    w = orig_w,
    h = orig_h,
    words = [],
    max,
    scale = 1,
    tags,
    fontSize,
    layout,
    svg,
    background,
    vis,
    show_intro = false;

var generate = function (words) {
    tags = words;

    // render cloud
    var u, i, c, h = Math.PI / 180, d = d3.scale.linear();
    c = +d3.select("#angle-count").property("value");
    u = Math.max(-90, Math.min(90, +d3.select("#angle-from").property("value")));
    i = Math.max(-90, Math.min(90, +d3.select("#angle-to").property("value")));
    d.domain([0, c - 1]).range([u, i]);
    layout.rotate(function () {
        return d(~~(Math.random() * c))
    });
    layout
        .font(d3.select("#font").property("value"))
        .spiral(d3.select("input[name=spiral]:checked").property("value"));
    fontSize = d3.scale[d3.select("input[name=scale]:checked").property("value")]().range([13, 80]);
    tags.length && fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
    words = [];
    layout
        .stop()
        .words(tags.slice(0, max = Math.min(tags.length, 10000)))
        .start();

    // generate legend
    var legend = {};
    $('#legend_panel_contents').empty();
    for (var i in tags) {
        var category = tags[i].key.split('::')[0];
        if (!legend[category]) {
            $('#legend_panel_contents').append('<div class="row"><div class="col-md-2" style="background-color: ' + fill(category) + '">&nbsp;</div><div class="col-md-10">' + category + '</div></div>');
            legend[category] = true;
        }
    }
    $('#words-508').empty();
    $('#words-508').append('<tr><th>Word</th><th>Category</th><th>Rank</th></tr>');
    for (var i in tags) {
        var w = tags[i].key.split('::');
        $('#words-508').append('<tr><td>' + w[1] + '</td><td>' + w[0] + '</td><td>' + ( parseInt(i) + 1 ) + '</td></tr>');
    }
};

function draw(t, e) {
    scale = w / orig_w;
    words = t;
    var n = vis.selectAll("text").data(words);
    n.transition().duration(1e3).attr("transform",function (t) {
        return"translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
    }).style("font-size", function (t) {
            return t.size + "px"
        }), n.enter().append("text").attr("text-anchor", "middle").attr("transform",function (t) {
        return"translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
    }).style("font-size", "1px").transition().duration(1e3).style("font-size", function (t) {
            return t.size + "px"
        }), n.style("font-family",function (t) {
        return t.font
    }).style("fill",function (t, i) {
            return fill(tags[i].key.split('::')[0]);
        }).text(function (t) {
            return t.text
        });
    var a = background.append("g").attr("transform", vis.attr("transform")), r = a.node();
    n.exit().each(function () {
        r.appendChild(this)
    }), a.transition().duration(1e3).style("opacity", 1e-6).remove(), vis.transition().delay(1e3).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")")
}


Meteor.startup(function () {
    $('html').attr('lang', 'en');
    if (!document.cookie.match(/splash_4=/)) {
        show_intro = true;
        document.cookie = "splash_4=ack";
    }
});

Template.home.rendered = function () {
    $('#legend_tab').click();
    $('.loading').show();
    fill = d3
        .scale
        .category10();
    layout = d3
        .layout
        .cloud()
        .timeInterval(10)
        .size([w, h])
        .fontSize(function (t) {
            return fontSize(+t.value)
        })
        .text(function (t) {
            return t.key.split('::')[1]
        })
        .on("end", draw);
    svg = d3
        .select("#vis")
        .append("svg")
        .attr("id", "vis_svg")
        .attr("width", w)
        .attr("height", h)
        .attr("role", "img")
        .attr("aria-label", "Word cloud representing warning prevalence by route and product type");
    svg.append("title").text("Warning prevalence by route and product type");
    svg.append("desc").text("Word cloud representing warning prevalence by route and product type");
    background = svg
        .append("g");
    vis = svg
        .append("g")
        .attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
    $(window).on("resize", function () {
        var jq_svg = $('#vis_svg');
        var targetWidth = jq_svg.parent().width();
        jq_svg.attr("width", targetWidth);
        jq_svg.attr("height", targetWidth / orig_scale);
        jq_svg.parent().height(targetWidth / orig_scale);
        w = targetWidth;
        h = targetWidth / orig_scale;
        $('#update_btn').click();
    });
    $(window).resize();
};

Template.home.events({
    'click #update_btn': function (evt, template) {
        $('.loading').show();
        var count = 200;
        var cache_entry = CacheList.findOne({}, {sort: {createdAt: -1}});
        var data;
        if (cache_entry && cache_entry.data) {
            data = cache_entry.data;
            $('.loading').hide();
            generate(data);
        } else {
            Meteor.call('drug_label', count, function (error, res) {
                if (error) {
                    console.log(error);
                    data = [{key:'No data found', value: 50}];
                } else {
                    CacheList.insert({ // let's keep track of how it was changing, insert, not update
                        count: count,
                        data: res
                    }); // do not care about cache here
                    data = res;
                }
                $('.loading').hide();
                generate(data);
            });
        }
    },
    'click #download-png': function () {
        var t = document.createElement("canvas");
        var e = t.getContext("2d");
        t.width = w;
        t.height = h;
        e.translate(w >> 1, h >> 1);
        e.scale(scale, scale);
        words.forEach(function (t, i) {
            e.save();
            e.translate(t.x, t.y);
            e.rotate(t.rotate * Math.PI / 180);
            e.textAlign = "center";
            e.fillStyle = fill(tags[i].key.split('::')[0]);
            e.font = t.size + "px " + t.font;
            e.fillText(t.text, 0, 0);
            e.restore();
        });
        window.open(t.toDataURL("image/png"));
    },
    'click #download-svg': function () {
        window.open("data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(svg.attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").node().parentNode.innerHTML))));
    }
});

Tracker.autorun(function () {
    Meteor.subscribe("CacheList");
});
