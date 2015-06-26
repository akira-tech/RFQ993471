var generate;
Template.home.rendered = function () {
    $('#update').click();

    generate = function (words) {
        fontSize = d3.scale.linear().range([18, 100]),
            words.length && fontSize.domain([+words[words.length - 1].value || 1, +words[0].value]);
        layout.stop().words(words).start();
    }

    function draw(t, e) {

        words = t;
        var n = vis.selectAll("text").data(words, function (t) {
            return t.text.toLowerCase()
        });

        n.transition().duration(1e3).attr("transform",function (t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }).style("font-size", function (t) {
                return t.size + "px"
            }), n.enter().append("text").attr("text-anchor", "middle").attr("transform",function (t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }).style("font-size", "1px").transition().duration(1e3).style("font-size", function (t) {
                return t.size + "px"
            }), n.style("font-family",function (t) {
            return t.font
        }).style("fill",function (t) {
                return fill(t.text.toLowerCase())
            }).text(function (t) {
                return t.text
            });

        var a = background.append("g").attr("transform", vis.attr("transform")),
            r = a.node();
        n.exit().each(function () {
            r.appendChild(this)
        }), a.transition().duration(1e3).style("opacity", 1e-6).remove(), vis.transition().delay(1e3).duration(750).attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")")
    }


    var fill = d3.scale.category20b(),
        w = $('#words').width(),
        h = 430,
        words = [],
        max, scale = 1,
        fontSize,
        layout = d3.layout.cloud().timeInterval(10).size([w, h]).fontSize(function (t) {
            return fontSize(+t.value)
        }).text(function (t) {
                return t.key
            })
            .font("Impact").on("end", draw);

    var svg = d3.select("#words").append("svg").attr("width", w).attr("height", h),

        background = svg.append("g"),

        vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");


    var d = d3.scale.linear(),
        c = 420;

    layout.rotate(function () {
        return d(~~(Math.random() * c))
    });

    $('.loading').show();

};

Template.home.events({
    'click #update': function (evt, template) {
        $('.loading').show();
        Meteor.call('drug_label', function (error, res) {
            if ( error ) {
                console.log( error );
            } else {
                generate(res);
            }
            $('.loading').hide();
        });
    }
});
