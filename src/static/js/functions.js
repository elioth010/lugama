/**
 * MAPS
 */
var map;
var infoWindow;
var service;
var geocoder;
var marker;
var searchBox;
var input;
function initialize() {
	geocoder = new google.maps.Geocoder();
	if($("[id$='latitude-map']").val()==="" || $("[id$='latitude-map']").val()==="0"){
		$("[id$='latitude-map']").val(14.542342);
		$("[id$='longitude-map']").val(-90.447541);
	}
	var mapOptions = {
		zoom : 15,
		center : new google.maps.LatLng($("[id$='latitude-map']").val(),$("[id$='longitude-map']").val())
	};
	map = new google.maps.Map(document.getElementById('map-croquis'),mapOptions);
	infoWindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);

	/** @type {HTMLInputElement} */
	input = $('[id$="pac-input"]').get(0);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	/** @type {HTMLInputElement} */
	searchBox = new google.maps.places.SearchBox((input));

	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			alert("No places Found!");
			return;
		}

		// For each place, get the icon, place name, and location.
		for (var i = 0, place; place = places[i]; i++) {
			reload(place);
			createMarker(place);
			break;
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

function performSearch(direction) {
	/*
	 * var request = { bounds : map.getBounds(), query : direction };
	 * service.textSearch(request, callback);
	 */
	geocoder.geocode({
		'address' : direction
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(16);
			createGeoMarker(results[0]);
		} else {
			alert('Geocode was not successful for the following reason: '+ status);
		}
	});
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			reload(place);
			createMarker(place);
			break;
		}
	}
}

function reload(place) {
	map.setCenter(place.geometry.location);
	map.setZoom(16);
}

/*
 * function reloadGeolocation(location) {
 * 
 * var mapOptions = { zoom : 16, center : new
 * google.maps.LatLng(place.geometry.location.A, place.geometry.location.F) };
 * map = new google.maps.Map(document.getElementById('map-croquis'),
 * mapOptions);
 * 
 * infoWindow = new google.maps.InfoWindow(); service = new
 * google.maps.places.PlacesService(map);
 *  // google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch); }
 */

var animationInterval = null;
function createMarker(place) {
	if (marker != null) {
		marker.setMap(null);
	}
	marker = new google.maps.Marker({
		map : map,
		position : place.geometry.location,
		// icon : {
		// // Star
		// path : 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7
		// z',
		// fillColor : '#ffff00',
		// fillOpacity : 1,
		// scale : 1,
		// strokeColor : '#bd8d2c',
		// strokeWeight : 1
		// },
		draggable : true,
		animation : google.maps.Animation.DROP,
		title : place.name+", "+place.formatted_address
	});
	
	$("[id$='latitude-map']").val(place.geometry.location.A);
	$("[id$='longitude-map']").val(place.geometry.location.F);

	google.maps.event.addListener(marker, 'click', function() {
		service.getDetails(place, function(result, status) {
			if (status != google.maps.places.PlacesServiceStatus.OK) {
				alert(status);
				return;
			}
			infoWindow.setContent(place.name + ", " + place.formatted_address + " " + place.geometry.location);
			$("[id$='latitude-map']").val(place.geometry.location.A);
			$("[id$='longitude-map']").val(place.geometry.location.F);
			infoWindow.open(map, marker);

			if (marker.getAnimation() != null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
				animationInterval = setInterval(function() {
					marker.setAnimation(null);
					stopInterval();
				}, 2000);
			}
		});
	});

	google.maps.event.addListener(marker, 'dragend', function(ev) {
		geocoder.geocode( { 'location': marker.getPosition()}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		        // map.setCenter(results[0].geometry.location);
		        /*
				 * var marker = new google.maps.Marker({ map: map, position:
				 * results[0].geometry.location });
				 */
		    	infoWindow.setContent(results[0].formatted_address + " "+ marker.getPosition());
		    	$("[id$='latitude-map']").val(results[0].geometry.location.A);
		    	$("[id$='longitude-map']").val(results[0].geometry.location.F);
		      } else {
		        alert("Geocode was not successful for the following reason: " + status);
		      }
		 });
	});

	google.maps.event.addListener(marker, 'rightclick', function(ev) {
		marker.setMap(null);
	});
}

function createGeoMarker(position) {
	if (marker != null) {
		marker.setMap(null);
	}
	marker = new google.maps.Marker({
		map : map,
		position : position.geometry.location,
		// icon : {
		// // Star
		// path : 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7
		// z',
		// fillColor : '#ffff00',
		// fillOpacity : 1,
		// scale : 1,
		// strokeColor : '#bd8d2c',
		// strokeWeight : 1
		// },
		draggable : true,
		animation : google.maps.Animation.DROP,
		title : place.name+", "+place.formatted_address
	});
	
	$("[id$='latitude-map']").val(place.geometry.location.A);
	$("[id$='longitude-map']").val(place.geometry.location.F);

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(place.name + ", " + place.formatted_address + " " + place.geometry.location);
		infoWindow.open(map, marker);
		$("[id$='latitude-map']").val(place.geometry.location.A);
		$("[id$='longitude-map']").val(place.geometry.location.F);
		if (marker.getAnimation() != null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
			animationInterval = setInterval(function() {
				marker.setAnimation(null);
				stopInterval();
			}, 2000);
		}
	});

	google.maps.event.addListener(marker, 'dragend', function(ev) {
		
		 geocoder.geocode( { 'location': marker.getPosition()}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		        // map.setCenter(results[0].geometry.location);
		        /*
				 * var marker = new google.maps.Marker({ map: map, position:
				 * results[0].geometry.location });
				 */
		    	  infoWindow.setContent(results[0].formatted_address + " "+ marker.getPosition());
		    	  $("[id$='latitude-map']").val(results[0].geometry.location.A);
		    	  $("[id$='longitude-map']").val(results[0].geometry.location.F);
		      } else {
		        alert("Geocode was not successful for the following reason: " + status);
		      }
		 });
	});

	google.maps.event.addListener(marker, 'rightclick', function(ev) {
		marker.setMap(null);
	});
}

function stopInterval() {
	window.clearInterval(animationInterval);
}

// FEATURES

function applyNitFormat(id) {
	if ($('[id$="' + id + '"]').val().length == 8) {
		$('[id$="' + id + '"]').val().replace("-", "");
		var newNitString = "";
		for (var i = 0; i < $('[id$="' + id + '"]').val().length; i++) {
			if (i == ($('[id$="' + id + '"]').val().length - 1)) {
				var temp = $('[id$="' + id + '"]').val();
				newNitString += '-' + temp.charAt(i);
			} else {
				var temp = $('[id$="' + id + '"]').val();
				newNitString += temp.charAt(i);
			}
		}
		$('[id$="' + id + '"]').val(newNitString);
	}
}

function changeStateStep(step, status, active) {
	$("#" + step).removeClass();
	$("#" + step).addClass('cd-timeline-img');
	if (active) {
		$("#" + step).addClass('active');
	}
	$("#" + step).addClass(status);
}

function renderTimeLine(){
	//$("[id$='render-timeline']").trigger("click");
	resizeWrapper();
	$(document).ready(function (){
		$("[id$='cliente-bean-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-negocio']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-empresa']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-empresa-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='numero-telefono-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-negocio-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia1-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia2-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia3-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono1']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono2']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono3']").keydown(function(event){
			numbersOnly(event);
		});
	});
}

/**
 * Numeric
 */
function setDefaultValue(objc){
	if ($(objc).val()=="") {
		$(objc).val('0.00');
	} else {
		console.log('isANumber');
	}
}

function numbersOnly(event) {
	// Allow special chars + arrows 
	if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 
	    || event.keyCode == 27 || event.keyCode == 13 
	    || (event.keyCode == 65 && event.ctrlKey === true) 
	    || (event.keyCode >= 35 && event.keyCode <= 39)){
	        return;
	}else {
	    // If it's not a number stop the keypress
	    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
	        event.preventDefault(); 
	    }   
	}
}


