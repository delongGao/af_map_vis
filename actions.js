$(function() {
    // resume sidebar
    $("#resume").click(function() {
        if ($("#sidebar").css("display") != "none") {
            $("#sidebar").hide('slide', {direction: "right"}, 1000, function() {
                $("#intro").show('slide', {direction: "left"}, 1000);
            });

//            $("#sidebar").animate(
//                {
//                    width: 0
//                }, 1000
//            )
            $("#map").animate(
                {
                    opacity: 1
                }, 1000
            )
            d3.select("path.selected").attr("class", "");
            map.panTo(new google.maps.LatLng(34.5333, 69.1667));
        }
    })
});