var routeXL = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -10
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    }
];
var just_places = [{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#fffffa"}]},{"featureType":"water","stylers":[{"lightness":50}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"lightness":40}]}];
var cool_grey = [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}];
var light_blue_water = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#71d6ff"},{"saturation":100},{"lightness":-5},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":0},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#deecec"},{"saturation":-73},{"lightness":72},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"hue":"#bababa"},{"saturation":-100},{"lightness":25},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#e3e3e3"},{"saturation":-100},{"lightness":0},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"hue":"#59cfff"},{"saturation":100},{"lightness":34},{"visibility":"on"}]}];
var blue_water = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];
var subtle = [{"featureType":"poi","stylers":[{"visibility":"off"}]},{"stylers":[{"saturation":-70},{"lightness":37},{"gamma":1.15}]},{"elementType":"labels","stylers":[{"gamma":0.26},{"visibility":"off"}]},{"featureType":"road","stylers":[{"lightness":0},{"saturation":0},{"hue":"#ffffff"},{"gamma":0}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"lightness":50},{"saturation":0},{"hue":"#ffffff"}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"},{"lightness":-50}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":20}]}];
var subtle_grey = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
var simplified_gold = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#252525"},{"saturation":-100},{"lightness":-81},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#666666"},{"saturation":-100},{"lightness":-55},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#777777"},{"saturation":-100},{"lightness":-6},{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"all","stylers":[{"hue":"#cc9900"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"hue":"#dedede"},{"saturation":-100},{"lightness":-57},{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"hue":"#dedede"},{"saturation":-100},{"lightness":-57},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"hue":"#dedede"},{"saturation":-100},{"lightness":-57},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#444444"},{"saturation":0},{"lightness":-64},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"off"}]}];
var gold = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#252525"},{"saturation":-100},{"lightness":-81},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#666666"},{"saturation":-100},{"lightness":-55},{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#777777"},{"saturation":-100},{"lightness":-6},{"visibility":"on"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#cc9900"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#444444"},{"saturation":0},{"lightness":-64},{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"hue":"#555555"},{"saturation":-100},{"lightness":-57},{"visibility":"off"}]}];
