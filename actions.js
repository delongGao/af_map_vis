// UI elements
// === constants for playbar
var INTER_PIX = 4;
var INTER_TIME = 70;

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

var PlayBar = (function() {
    var cur_interval = null;

    return {
        init: function() {
            PlayBar.move_pointer(0);
            $('#play_trigger, #repeat_trigger').click(function() {
                PlayBar.auto_play();
            })
        },
        auto_play: function() {
            var bar_length = parseInt($('#progress_bar #line').css("width"));
            var pointer_width = parseInt($('#progress_bar #pointer').css("width"));
            var cur_loc = parseInt(PlayBar.get_pnt_loc());

            console.log("clicked");
            // hide autoplay button
            $('#play_trigger').css("display","none");
            $('#repeat_trigger').css("display","none");
            $('#pause_trigger').css("display","inline");
            cur_interval = setInterval(
                function() {
                    PlayBar.move_pointer((cur_loc + INTER_PIX) + "px");
                    cur_loc += INTER_PIX;
                    if ((cur_loc + pointer_width / 2) > bar_length) {
                        clearInterval(cur_interval);
                        PlayBar.move_pointer(0);
                        $('#repeat_trigger').css("display","inline");
                        $('#pause_trigger').css("display","none");
                    }
                },INTER_TIME
            );

        },
        stop: function() {
            if (cur_interval) {
                clearInterval(cur_interval);
            }
            PlayBar.move_pointer(0);
            $('#play_trigger').css("display","inline");
            $('#pause_trigger').css("display","none");
            $('#repeat_trigger').css("display","none");
        },
        pause: function() {
            if (cur_interval) {
                clearInterval(cur_interval);
            }
            $('#play_trigger').css("display","inline");
            $('#pause_trigger').css("display","none");
        },
        move_pointer: function(loc) {
            $('#progress_bar #pointer').animate({
                left:loc
            },50)
        },
        get_pnt_loc: function() {
            return $('#progress_bar #pointer').css("left");
        }
    }
}());

var MidPane = (function() {

    return {
        collapse: function() {
            $('#mid_pane').animate({
                left:"54%",
                width:"30px"
            }, function() {
                $('#mid_pane #expend').css("display","block");
                $('#intro').css("z-index",-1);
            })

        },
        expend: function() {
            $('#mid_pane #expend').css("display","none");
            $('#intro').css("z-index",1);
            $('#mid_pane').animate({
                left:"43%",
                width:"24%"
            })
        }
    }
}());

var LeftPane = (function() {

    return {
        hover:function() {
            $('.map_pane').mouseover(function() {
                $(this).find('.hover_wrapper').css({
                    display:"block"
                });
                $('#abs_control').css("display","block");
            })
            $('.map_pane').mouseout(function() {
                $(this).find('.hover_wrapper').css({
                    display:"none"
                });
                $('#abs_control').css("display","none");
            })
        },
        click: function() {
            $('.hover_wrapper').click(function() {
                var ensmall = $(this).find('.ensmall');
                var enlarge = $(this).find('.enlarge');
                // state: small
                if (ensmall.css("display") == "none") {
                    ensmall.css("display", "inline");
                    enlarge.css("display", "none");
                    $('#map_2').animate({
                        top:'35%',
                        height:'65%'
                    },600);
                }
                // state: large
                else {
                    ensmall.css("display", "none");
                    enlarge.css("display", "inline");
                    $('#map_2').animate({
                        top:'65%',
                        height:'35%'
                    },600);
                }
            })
        }
    }
}());

// main function
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
            $("#map_main").animate(
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
    // init playbar
    PlayBar.init();
    $('#stop_trigger').click(function() {
        PlayBar.stop();
    })
    $('#pause_trigger').click(function() {
        PlayBar.pause();
    })
    // init pane action
    $('#left_pane').click(function() {
        MidPane.collapse();
    })
    $('#mid_pane #expend').click(function() {
        MidPane.expend();
    })


});