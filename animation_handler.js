var AnimationHandler = (function() {
    "use strict";

    return {
        init: function(map_obj) {
            var url = "data_new.json";
            var url_more = "data_more.json";
            var url_remote = "http://128.95.157.71/py/hello.py";
//            console.log(map_obj);
//            $.getJSON(url, function(data) {
            d3.json(url_more, function(data) {
//            d3.json(url_remote, function(data) {
//                data = JSON.parse(data);
//            d3.json(url, function(data) {
//                console.log(AnimationHandler.obj_to_hash(data));
//                var input = AnimationHandler.obj_to_hash(data);
                AnimationHandler.draw(data, map_obj);
            })
        },
        draw: function(data, map) {
            // this part only create the container
            var lineOverlay = new google.maps.OverlayView();

            // Add the container when the overlay is added to the map.
            lineOverlay.onAdd = function() {
                var layer = d3.select(this.getPanes().overlayMouseTarget).attr("class", "line_layer");
                var line_svg = layer.append("svg")
                    .attr("class", "af_map_lines");

                // Draw each marker as a separate SVG element. no need to define right now
                lineOverlay.draw = function() {
                }

                $('#play_trigger').click(function() {
                    var st_date = 120104;
                    var ed_date = 120114;
                    var interval = 1900;
                    AnimationHandler.update(data,st_date,ed_date,lineOverlay, interval, line_svg);
                })
            }
            // Bind our overlay to the map…
            lineOverlay.setMap(map);
        },
        update: function(input, st_date, ed_date, layerContainer, time_interval, line_svg) {
            // geo converter
//            var path = GeoTransform.convert(layerContainer);
            var currentTime = st_date;
            var input = input;
            var ed_date = ed_date;
            var totalLength = 0;

            var dest_hash = {}
            var interval = window.setInterval(repeat_block, time_interval);

            function repeat_block() {
                console.log("current time: " + currentTime);
                var tem = {};
                if (typeof input[currentTime] == "undefined") { // no data for this date
                    console.log("no data for: " + currentTime);
                } else {
//                    var duration = (ed_date - currentTime) * time_interval;
                    var duration = time_interval;
                    var linkArc = function(d) {
                        var dx = d[1][0] - d[0][0],
                            dy = d[1][1] - d[0][1],
                            dr = Math.sqrt(dx * dx + dy * dy);
                        return "M" + d[0][0] + "," + d[0][1] + "A" + dr + "," + dr + " 0 0,1 " + d[1][0] + "," + d[1][1];
                    }

                    var colors = d3.scale.category10();
                    var tem = []
                    $.each(input[currentTime], function(index, value) {
                        tem = tem.concat(value);
                    })
                    tem = tem.map(function(item) { return [GeoTransform.convertPoints(item[0],layerContainer),GeoTransform.convertPoints(item[1], layerContainer)] });
//                    console.log(tem);
//                    generate lines

                    // build dest_hash
                    $.each(tem, function(key,item) {
                        if (typeof dest_hash[item[1].join("_")] == "undefined") {
                            dest_hash[item[1].join("_")] = {"coords":item[1], "freq":1};
                        } else {
                            dest_hash[item[1].join("_")].freq += 1;
                        }
                    })

//                    console.log(dest_hash);

                    var lines = line_svg
                        .selectAll("path")
                        .data(tem)
                        .enter()
                        .append("path")
                        .attr("class", "lines")
                        .attr("d", linkArc)
                        .attr("stroke", colors)
                        .attr("stroke-width", 1)
                        .attr("fill", "none");

                    if (typeof lines.node() != "undefined") {
                        totalLength = totalLength > 0 ? totalLength : lines.node().getTotalLength();
                    }
//                    var totalLength = lines.length;
                    lines.attr("stroke-dasharray", totalLength *2 + " " + totalLength * 2)
                        .attr("stroke-dashoffset", totalLength*2)
                        .transition()
                        .duration(duration)
                        .ease("linear")
//                        .attr("stroke-dashoffset", -(totalLength * 2))
                        .attr("stroke-dashoffset", (totalLength * 2))
                        .remove();

                    // draw lines
                    $('.dest_circles').remove();

                    var dest_circles = line_svg
                        .selectAll("circle")
                        .data(AnimationHandler.obj_to_hash(dest_hash))
                        .enter()
                        .append("svg:circle")
                        .transition()
                        .duration(duration)
                        .attr("cx", function(d) { return d.coords[0]; })
                        .attr("cy", function(d) { return d.coords[1]; })
                        .attr("r", function(d) { return d.freq + 2 })
                        .attr("class", "dest_circles")
                        .attr("fill", "blue");
                    //
                }
//                })
                currentTime++;
                if (currentTime > ed_date) {
                    window.clearInterval(interval);
                    console.log("interval cleared");
                }
            }
        },
        auto_play: function() {

        },
        obj_to_hash: function (obj) {
            return Object.keys(obj).map(function (key) { return obj[key]; })
        }
    }
}());