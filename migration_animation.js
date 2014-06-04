var MigrationAnimation = (function() {

	return {
        init: function(map_obj) {
            var url = "migration.json";
            var url_more = "data_more.json";
            var url_remote = "http://128.95.157.71/py/hello.py";
//            console.log(map_obj);
//            $.getJSON(url, function(data) {
            d3.json(url, function(data) {
//            d3.json(url_remote, function(data) {
//                data = JSON.parse(data);
//            d3.json(url, function(data) {
//                console.log(AnimationHandler.obj_to_hash(data));
//                var input = AnimationHandler.obj_to_hash(data);
                MigrationAnimation.draw(data, map_obj);
//                console.log(data);
            })
        },
        draw: function(data, map) {
            // this part only create the container
            var migrationOverlay = new google.maps.OverlayView();

            // Add the container when the overlay is added to the map.
            migrationOverlay.onAdd = function() {
                // tips
                var mig_tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-5, 0])
                    .html(function(d) {
                        return "<p></p>" + d[4] + "</p><p>" + d[3] + "</p>";
                    })

                // arch function
                var linkArc = function(d) {
                    var dx = d[1][0] - d[0][0],
                        dy = d[1][1] - d[0][1],
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d[0][0] + "," + d[0][1] + "A" + dr + "," + dr + " 0 0,1 " + d[1][0] + "," + d[1][1];
                }

                // data manipulation
                var mig_input = [];

                data = AnimationHandler.obj_to_hash(data);

                for (var i = 0; i < data.length; i++) {
                    if (typeof ProvinceDict[data[i].src] == "undefined" || typeof ProvinceDict[data[i].dest] == "undefined") continue;
                    var tem = [ProvinceDict[data[i].src], ProvinceDict[data[i].dest], data[i].freq, data[i].tip_in + ", " + data[i].tip_out, data[i].src + " - " + data[i].dest];
                    mig_input.push(tem);
                }

                var freq_arr = mig_input.map(function(item) { return parseInt(item[2]); });
                var minDataPoint = d3.min(freq_arr);
                var maxDataPoint = d3.max(freq_arr);
                var linearScale = d3.scale.linear()
                    .domain([minDataPoint,maxDataPoint])
                    .range([1,5]);

                mig_input = mig_input.map(function(item) { return [GeoTransform.convertPoints(item[0],migrationOverlay),GeoTransform.convertPoints(item[1], migrationOverlay), linearScale(item[2]), item[3], item[4]] });
                console.log(mig_input);

                var layer = d3.select(this.getPanes().overlayMouseTarget).attr("class", "migration_layer");

                // remove previous layers
                $('.af_map_migration_lines').remove();
                var line_svg = layer.append("svg")
                    .attr("class", "af_map_migration_lines");
                migrationOverlay.draw = function() {
                    // Draw each marker as a separate SVG element. no need to define right now
                    var mig_vis_group = line_svg
                        .append("g")
                        .attr("class","mig_vis_group");
                    mig_vis_group
                        .selectAll("path")
                        .data(mig_input)
                        .enter()
                        .append("path")
                        .attr("class","mig_lines")
                        .attr("d", linkArc)
                        .attr("stroke", "white")
                        .attr("stroke-width", function(d) { return parseInt(d[2]); })
                        .attr("fill", "none");

                    // tip test
                    mig_vis_group.call(mig_tip);

                    mig_vis_group
                        .selectAll("circle")
                        .data(mig_input)
                        .enter()
                        .append("circle")
                        .attr("class","mig_dest_circle")
                        .attr("cx", function(d) { return d[0][0]; })
                        .attr("cy", function(d) { return d[0][1]; })
                        .attr("r",5)
                        .on("click", function(d) {
                            $(".selected_circle").attr("class","mig_dest_circle");
                            d3.select(this).attr("class","selected_circle mig_dest_circle");
                            MigrationAnimation.action_box(d);
                        })
                        .on("mouseover", mig_tip.show)
                        .on("mouseout", mig_tip.hide);
                }
//
//                $('#play_trigger').click(function() {
//                    var st_date = 120104;
//                    var ed_date = 120114;
//                    var interval = 1900;
//                    AnimationHandler.update(data,st_date,ed_date,lineOverlay, interval, line_svg);
//                })
            }
            // Bind our overlay to the map…
            migrationOverlay.setMap(map);
        },
        action_box: function(data) {
            MigContent.show_mig_info(data);
        },
        auto_play: function() {

        },
        obj_to_hash: function (obj) {
            return Object.keys(obj).map(function (key) { return obj[key]; })
        }
    }
}());