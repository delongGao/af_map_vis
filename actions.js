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
            }, 0, function() {
                $('.cus_drop_down').find("span.arrow").empty().html("<i class='fa fa-angle-double-up'></i>");
            });
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
            $('.cus_drop_down').find("span.arrow").empty().html("<i class='fa fa-angle-double-down'></i>");
        },
        select: function() {
            var drop_content = $('.cus_drop_down').find('.dropdown');
            var cur_li = drop_content.find("li")
            DropDown.hide();
            cur_li.click(function() {
                $('.cus_drop_down').find("span.title").empty().html($(this).html());
                drop_content.find("li.selected").removeClass("selected");
                $(this).addClass("selected");
            })
        }
    }
}());

var ProgressBar = (function() {

    return {
        toggle_prompt: function() {
            $('#abs_control').mouseenter(function() {
                $(this).find("#hover_prompt").animate({
                    opacity: 1,
                    height: "20px"
                }, 350)
            })
            $('#abs_control').mouseleave(function() {
                $(this).find("#hover_prompt").animate({
                    opacity: 0,
                    height: "10px"
                }, 350)
            })
        },
        info_show: function() {
            $('#info_bar').animate({
                opacity:1,
                height:"60px"
            }, 350, function() {
                $("#hover_prompt").empty().html("<i class='fa fa-angle-double-down'></i>")
            })
        },
        info_hide: function() {
            $('#info_bar').animate({
                opacity:0,
                height:"0px"
            }, 350, function() {
                $("#hover_prompt").empty().html("<i class='fa fa-angle-double-up'></i>")
            })
        },
        info_click: function() {
            $("#hover_prompt").click(function() {
                if ($('#info_bar').css("opacity") == 0) {
                    ProgressBar.info_show();
                } else {
                    ProgressBar.info_hide();
                }
            })
        }
    }
}());


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
    // init infobar
    ProgressBar.toggle_prompt();
    ProgressBar.info_click();
});