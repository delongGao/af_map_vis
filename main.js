// Create a new StyledMapType object, passing it the array of styles,
// as well as the name to be displayed on the map type control. Styles passed from map_styles.js

var styledMapMain = new google.maps.StyledMapType(cobalt,
    {name: "Styled Map"});
// Create a map object, and include the MapTypeId to add
// to the map type control.
var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(34.5333 - 0.6, 69.1667 - 1.4),
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.SATELLITE, 'map_style']
    }
};
// Create the Google Map…
var map = new google.maps.Map(d3.select("#map_main").node(), mapOptions);

//Associate the styled map with the MapTypeId and set it to display.
map.mapTypes.set('map_style', styledMapMain);
map.setMapTypeId('map_style');

// placeholder for map_sub
var map_sub = null;

// create d3 tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html(function(d) {
        return "<strong>" + d.properties.Prov34Na + "</strong>";
    })

// Load the station data. When the data comes back, create an overlay.
d3.json("af_map.json", function(data) {
    var overlay = new google.maps.OverlayView();
    // Add the container when the overlay is added to the map.
    overlay.onAdd = function() {
//                    var layer = d3.select(this.getPanes().overlayLayer).attr("class", "layer");
        var layer = d3.select(this.getPanes().overlayMouseTarget).attr("class", "layer");
        var map_container = layer.append("svg")
            .attr("class", "af_map");

        // Draw each marker as a separate SVG element.
        overlay.draw = function() {
            // initiate d3 tooltip
            map_container.call(tip);
            var path = GeoTransform.convert(this);

            map_container.selectAll("path")
                .data(data.features)
                .attr("d", path)
                .enter().append("path")
                .attr("d", path)
                .on("click", clickTrigger)
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide);

            // province click event handler
            function clickTrigger(d) {
                // empty lines
                $('.lines').remove();

                var coords = d.geometry.coordinates[0];
                var result = MidCalc.calc(coords);
                d3.select("path.selected")
                    .attr("class", "");
                d3.select(this)
                    .attr("class", "selected");
                // collapse the mid pane
                MidPane.collapse();

                setTimeout(function() {
                    // attach sub map
                    if (!map_sub) {
                        map_sub = create_sub_map();
                    }

                    map_sub.panTo(new google.maps.LatLng(result[0], result[1]));
                    setTimeout(function() {
                        map_sub.setZoom(7);
                    },150);

                    // high-light sub-map
                    var cur_province = d.properties.Prov34Na.split(" ").join("_")
                    d3.select(".af_map_sub path.selected").attr("class","");
                    d3.select("#map_sub_" + cur_province).attr("class","selected");
                    $("#tb_1 h1").html("").text(cur_province);
                },450);
                // slide the map to left
                map.panTo(new google.maps.LatLng(result[0], result[1]));

                // migration
                MigrationAnimation.init(map);
            }

            // create sub map
            function create_sub_map() {
                var styledMapSub = new google.maps.StyledMapType(just_places,
                    {name: "Styled Sub Map"});
                var mapSubOptions = {
                    zoom: 6,
                    center: new google.maps.LatLng(34.5333 - 0.6, 69.1667 - 1.4),
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.SATELLITE, 'map_sub_style']
                    }
                };
                var map_sub = new google.maps.Map(d3.select("#map_sub").node(), mapSubOptions);
                // sub map
                map_sub.mapTypes.set('map_sub_style', styledMapSub);
                map_sub.setMapTypeId('map_sub_style');

                // create provinces
                var overlay_sub = new google.maps.OverlayView();
                overlay_sub.onAdd = function() {
                    var layer_sub = d3.select(this.getPanes().overlayMouseTarget).attr("class", "layer_sub");
                    var map_sub_container = layer_sub.append("svg")
                        .attr("class", "af_map_sub");
                    // Draw each marker as a separate SVG element.
                    overlay_sub.draw = function() {
                        var path = GeoTransform.convert(this);

                        map_sub_container.selectAll("path")
                            .data(data.features)
                            .attr("d", path)
                            .enter().append("path")
                            .attr("d", path)
                            .attr("id", function(d) { return "map_sub_" + d.properties.Prov34Na.split(" ").join("_") });
                    }
                }
                overlay_sub.setMap(map_sub);

                // init hover click
                LeftPane.hover();
                LeftPane.click();
                // test
                AnimationHandler.init(map_sub);
                return map_sub;
            }
        }
    }

    // Bind our overlay to the map…
    overlay.setMap(map);
//    overlay.setMap(map_sub);
})