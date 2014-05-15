var Map = (function() {
	


	return {
		init: function() {
			var fillArray = ['red', 'blue', 'yellow', 'green'];

			var mapOptions = {
			    zoom: 7,
			    center: new google.maps.LatLng(34.5333, 69.1667),
			    // mapTypeId: google.maps.MapTypeId.TERRAIN
			    // mapTypeId: google.maps.MapTypeId.SATELLITE
			    // mapTypeId: google.maps.MapTypeId.HYBRID
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			};

		  	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

		  	var layer = new google.maps.visualization.DynamicMapsEngineLayer({
			    layerId: '06673056454046135537-08896501997766553811',
			    map: map,
			    suppressInfoWindows: true,
			    clickable: true
			});

		  	google.maps.event.addListener(layer, 'mouseover', function(event) {
			    var style = layer.getFeatureStyle(event.featureId);
			    style.fillColor = fillArray[event.featureId - 1];
			    style.fillOpacity = '0.8';
		  	});

			google.maps.event.addListener(layer, 'mouseout', function(event) {
			    var style = layer.getFeatureStyle(event.featureId).resetAll();
			});
		}
	}
})();