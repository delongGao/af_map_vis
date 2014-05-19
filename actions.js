// UI elements
var DropDown = (function() {

    return {
        click: function() {
            var drop_content = $('.cus_drop_down').find('.dropdown');
            $('.cus_drop_down').click(function() {
                console.log("clicked");
                if (drop_content.css("opacity") == 0) {
                    DropDown.show();
                } else {
                    DropDown.hide();
                }
            })
        },
        show: function() {
            var drop_content = $('.cus_drop_down').find('.dropdown');
            drop_content.show(
                'slide',
                {
                    direction: "down"
                }, 250
            );
            drop_content.animate({
                "opacity": 1
            }, 0);
        },
        hide: function() {
            var drop_content = $('.cus_drop_down').find('.dropdown');
            drop_content.hide(
                'slide',
                {
                    direction: "up"
                }, 500
            );
            drop_content.css({
                "opacity": 0
            }, 500);
        },
        select: function() {
            var drop_content = $('.cus_drop_down').find('.dropdown');
            var cur_li = drop_content.find("li")
            cur_li.click(function() {
                $('.cus_drop_down').find("span").empty().html($(this).html());
            })
        }
    }
}())


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
            $('#abs_control').hide('slide', {direction: "down"}, 1000)
        }
    })

    // init dropdown
    DropDown.click();
    DropDown.select();
});