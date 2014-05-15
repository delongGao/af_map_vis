var GeoTransform = (function() {
    "use strict";

    return {
        convert: function(container) {
            // container must be a Google map object
            var projection = container.getProjection();

            function projectPoint(x, y, container) {
                var point = new google.maps.LatLng(y, x);
                point = projection.fromLatLngToDivPixel(point);
                this.stream.point(point.x + 4000, point.y + 4000);
            }

            var transform = d3.geo.transform({point: projectPoint}),
                path = d3.geo.path().projection(transform);
            return path;
        },
        convertPoints: function(point, container) {
            // container must be a Google map object
            var projection = container.getProjection();
            var after_point = new google.maps.LatLng(point[1], point[0]);
            after_point = projection.fromLatLngToDivPixel(after_point);
            return [after_point.x + 4000, after_point.y + 4000];
//                this.stream.point(point.x + 4000, point.y + 4000);
        }
    }
}());