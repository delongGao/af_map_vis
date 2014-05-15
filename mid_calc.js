var MidCalc = (function() {
    "use strict";

    return {
        convert: function(input) {
            var tem = []
            for (var i = 0; i < input.length; i++) {
                tem[i] = $.map(input[i], function(val) { return val * 180 / Math.PI })
            }
            return tem;
        },

        calc: function(input) {
            if (input.length <= 1) {
                return input[0];
            } else {
                // there is one province for which the coordinates array is not right, this is to correct that
                if (input[0].length != 2 ) {
                    var tem = [];
                    $.each(input, function() { tem = tem.concat(this) })
                    input = tem;
                }

                var lats = $.map(input, function(val) { return val[0] });
                var lons = $.map(input, function(val) { return val[1] });
                var aver_lat = 0, aver_lon = 0;
                $.each(lats, function() {aver_lat += parseFloat(this) || 0;});
                $.each(lons, function() {aver_lon += parseFloat(this) || 0;});
                aver_lat = aver_lat / lats.length;
                aver_lon = aver_lon / lons.length;
                return [aver_lon, aver_lat];
//                not correct
//                var x = $.map(input, function(val) {
//                    return Math.cos(val[0]) * Math.cos(val[1]);
//                })
//                var y = $.map(input, function(val) {
//                    return Math.cos(val[0]) * Math.sin(val[1]);
//                })
//                var z = $.map(input, function(val) {
//                    return Math.sin(val[0]);
//                })
//
//                var aver_x = 0, aver_y = 0, aver_z = 0;
//                $.each(x, function() {aver_x += parseFloat(this) || 0;});
//                $.each(y, function() {aver_y += parseFloat(this) || 0;});
//                $.each(z, function() {aver_z += parseFloat(this) || 0;});
//                aver_x = aver_x / x.length;
//                aver_y = aver_y / y.length;
//                aver_z = aver_z / z.length;
//                var mid_lon = Math.atan2(aver_y, aver_x);
//                var mid_hyp = Math.sqrt(Math.pow(aver_x, 2) + Math.pow(aver_y, 2));
//                var mid_lat = Math.atan2(aver_z, mid_hyp);
//                return [mid_lat * 180  / Math.PI, mid_lon * 180 / Math.PI];
            }
        }
    }
}());