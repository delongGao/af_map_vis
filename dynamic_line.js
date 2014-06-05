var DynamicLine = (function() {

    return {
        init: function() {
            //**************************************************** Constants ****************************************************
            var migText = "MIGRATED"
            var nonmigText = "NON-MIGRATED"

//**************************************************** Variables ****************************************************
            var TotalWidth=600;
            var TotalHeight=230;

            var margin = 20;
            var m = [margin, margin+20, margin, margin+40],// +60 to make sure that full text of Non-migrated is visible.
                w = TotalWidth - m[1] - m[3],  // 1 -> left , 3 -> right
                h = TotalHeight - m[0] - m[2];  // 0 -> top 2 -> bottom

            var activityData,x,y,duration = 0,delay = 100;
            var linEle,linCircle,overCircle ;
            var color = d3.scale.ordinal().range(["green", "red"]);

            var svg = d3.select("#tb_3").append("svg")
                .attr("width", w + m[1] + m[3])
                .attr("height",h + m[0] + m[2])
                .attr("class","dynamic_lines")
                .append("g")
                .attr("transform", "translate(" + m[3] + "," + m[0] + ")"); // translate to (20,20) so that everything starts runs with that point as origin

            var line = d3.svg.line()
                .interpolate("monotone")
                .x(function(d) { return x(d.date); })// d.Day
                .y(function(d) { return y(d.actValue); }); // d.Count

//d3.csv("2012-01-Kabul-CallActivityGraph.txt", function(data) {
            d3.json("2012-01-Kabul-CallActivityGraph.json", function(data) {
                var parseDate = d3.time.format("%Y%m%d").parse;
                activityData = d3.nest().key(function(d) { return d.type; }).entries(data); //.entries(stocks = data);

                activityData.forEach(function(s) {
                    s.values.forEach(function(d) { d.date = parseDate(d.date); d.actValue = d.actValue; });
                    s.maxPrice = d3.max(s.values, function(d) { return d.actValue; }); // console.log(s);
                });

// .attr("x1",w-502).attr("y1",180).attr("x2",w-50).attr("y2",180)

                svg.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", w-200).attr("y",150)
                    .text("Days of the Month").attr("fill","black");


                svg.append("text").attr("class", "y label").attr("text-anchor", "end").attr("x", 20).attr("dy", -20)
                    .attr("transform", "rotate(-90)").text("Number of Calls/Day").attr("fill","black");


                svg.append("line").attr("x1",w-500).attr("y1",-30).attr("x2",w-500).attr("y2",120).attr("stroke-width", 3).attr("stroke", "black");

                svg.append("line").attr("x1",w-502).attr("y1",120).attr("x2",w-50).attr("y2",120).attr("stroke-width", 3).attr("stroke", "black");


                var g = svg.selectAll("g").data(activityData).enter().append("g").attr("class", "symbol");


                setTimeout(lines, duration); // Duration = 1000

            });


            function lines() {
                x = d3.time.scale().range([0, w - 60]); console.log("X Range:  " + (w - 60))
//                y = d3.scale.linear().range([h / 4 - 20, 0]); console.log("Y Range: " + (h / 4 - 20))
                y = d3.scale.linear().range([h - 20, 0]); console.log("Y Range: " + (h - 20))

                var xMin = d3.min(activityData, function(d) { return d.values[0].date; });
                var xMax = d3.max(activityData, function(d) { return d.values[d.values.length - 1].date; })

                x.domain([ xMin,xMax]);

                var g = svg.selectAll(".symbol").attr("transform", function(d) {return "translate(0," + 0 + ")"; });  // ( h / 4 - 30) plots it higher

                var xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-h)
                var yAxis = d3.svg.axis().scale(y).ticks(30).orient("right"); // ticks has 30 - Needs to change wrt to the length of activityData

                //var textEle = svg.append("text").attr("x", 12).attr("y", 10).text("TEST").attr("fill","white");

                g.each(function(d) {
                    var e = d3.select(this); //console.log("this:");console.log(this);

                    e.append("path").attr("class", "call_line");

                    e.append("circle").attr("r", 4)
                        .style("fill", function(d) { if((d.key.toString()) == nonmigText) return d3.rgb("green"); else return d3.rgb("red")})
                        .style("stroke", "#fff")
                        .style("stroke-width", "1px");

// // Display your types(Migrated/Non-Migrated) besides the circle.
                    e.append("text") .attr("x", 12).attr("y", 10).attr("fill",function(d) { if((d.key.toString()) == nonmigText) return d3.rgb("green"); else return d3.rgb("red")}).text("");

                    linEle = e.append("line").attr("stroke-width", 3).attr("stroke", "blue").style("stroke-opacity",0.7);
                    // http://stackoverflow.com/questions/20837147/draw-a-d3-circle-with-gradient-colours
                    linCircle = e.append("circle");


                });

                function draw(k) {
                    g.each(function(d) {
                        var e = d3.select(this);
                        //console.log(this);
                        y.domain([0, d.maxPrice]);  // y.domain([0, function(d) { return d.maxPrice ; } ]); Didn't work

                        e.select("path").attr("stroke",function(d) {
                            if((d.key.toString()) == nonmigText)
                                return d3.rgb("green");
                            else
                                return d3.rgb("red")})
                            .attr("stroke-width", 2)
                            .attr("d", function(d) {return line(d.values.slice(0,k+1)); });


// Animating the circle - If this is commented the circle stays at one place.

                        e.selectAll("circle, text").data(function(d) { dummy = [d.values[k], d.values[k]]; //console.log(d.values[k]);
                            return [d.values[k], d.values[k]]; })
                            .attr("transform", function(d) {
                                //console.log("(x(d.date),y(d.price)) ==> "  + "translate(" + x(d.date) + "," + y(d.actValue) + ")" );
                                return "translate(" + x(d.date) + "," + y(d.actValue) + ")"; });
                    });
                }

                var k = 1, n = activityData[0].values.length;
                console.log("n Timer: " + n);
                d3.timer(function() {
                    //http://stackoverflow.com/posts/17936490/revisions
//                    sleepFor(200);
                    draw(k);
                    //setTimeout(draw(k),duration);
                    //setInterval(draw(k),10000);
                    if ((k += 2) >= n - 1) {
                        draw(n - 1);
                        //setTimeout(draw(n-1),duration)
                        //setTimeout(horizons, 500);
                        return true;
                    }

                });
            }
        },
        reset: function() {
            $('.dynamic_lines').remove();
        }
    }
}());