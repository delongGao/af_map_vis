// Create a new StyledMapType object, passing it the array of styles,
// as well as the name to be displayed on the map type control. Styles passed from map_styles.js

var styledMap = new google.maps.StyledMapType(cool_grey,
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
map.mapTypes.set('map_style', styledMap);
map.setMapTypeId('map_style');

// create d3 tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-5, 0])
    .html(function(d) {
        return "<strong>" + d.properties.Prov34Na + "</strong>";
    })

// Load the station data. When the data comes back, create an overlay.
d3.json("af_map.json", function(data) {
//            d3.json("af_map_zipped.json", function(data) {
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

//                        var projection = this.getProjection();
//
//                        function projectPoint(x, y) {
////                            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
//                            var point = new google.maps.LatLng(y, x);
//                            point = projection.fromLatLngToDivPixel(point);
//                            this.stream.point(point.x + 4000, point.y + 4000);
////                            this.stream.point(point.x + 4000, point.y);
//                        }
//
//                        var transform = d3.geo.transform({point: projectPoint}),
//                                path = d3.geo.path().projection(transform);
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
//                            map.setZoom(7);
                $("#title").html("").text(d.properties.Prov34Na);
                // slide the map to left
                if ($("#sidebar").css("display") == "none") {
                    map.panTo(new google.maps.LatLng(result[0], result[1] + 2));
                    setTimeout(function() {
                        map.setZoom(8);
                    }, 600)
                    setTimeout(function() {
                        $("#intro").hide('slide', { direction: 'right' }, 1000, function() {
                            $("#sidebar").show('slide', { direction: 'left' }, 1000, function() {
                                $('#abs_control').show('slide', {direction: "up"}, 1000);
                            });
                        });
                    }, 2100)
                } else {
                    map.panTo(new google.maps.LatLng(result[0], result[1]));
                    DropDown.hide();
                }
            }
        }
    }

    // Bind our overlay to the map…
    overlay.setMap(map);
})

AnimationHandler.init(map);