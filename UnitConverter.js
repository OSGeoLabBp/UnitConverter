var ang_pattern = /^[0-9]{1,3}-[0-9]{1,2}-[0-9]{1,2}$/;
var num_pattern = /^[0-9]+(\.[0-9]*)?$/;

$(document).ready(function () {
	//
	// Distances
	// reset fields if one gets focus
	//$(".dist").focus(function (e) {
		//$(".dist").val("");
		// $("#reset").trigger("click");
	//});
	// convert value if enter pressed in a field
	
	$(".dist").focus(function (e) {
   var van_erteke = 0;
   $('.dist').each(function(){
       if ($(this).val().length > 0)
           van_erteke++;
   });
   console.log(van_erteke);
   if (van_erteke > 1)
       $("#reset").trigger("click");
});

	$(".dist").keypress(function(e) {
		if (e.which == 13) {
			dist_convert();
		}
	});
	// convert value if convert button clicked
	$("#convert").click(dist_convert);
	//
	// Areas
	$(".area").focus(function (e){
		$(".area").val("");
	});
	$(".area").keypress(function(e) {
		if (e.which == 13) {
			area_convert();
		}
	});
	$("#convertarea").click(area_convert);
	$(".angle").focus(function(e){
		$(".angle").css('background-color', '');
		var w = '#' + e.target.id;
		var v = $(w).val();
		$(".angle").val("");
		$(w).val(v);
	});
	$(".angle").keypress(function(e) {
		if (e.which == 13) {
			angle_convert();
		}
	});
	$("#converta").click(angle_convert);
});

// distance conversion
function dist_convert() {
	var m;
	// convert input field to meter
	if ($("#fathom").val().length) {
		m = $("#fathom").val() * 1.89648384;
	} else if ($("#feet").val().length) {
		m = $("#feet").val() / 3.2808398950131234;
	} else if ($("#yard").val().length) {
		m = $("#yard").val() / 1.0936132983377078;
	} else if ($("#mile").val().length) {
		m = $("#mile").val() / 0.0006213711922373339;
	} else if ($("#nautical").val().length) {
		m = $("#nautical").val() / 0.0005399568034557236;
	} else if ($("#meter").val().length) {
		m = $("#meter").val() * 1.0;
	}
	$("#meter").val(m.toFixed(3));
	// change meter to all others
	$("#fathom").val((m * 0.527291601).toFixed(3));
	$("#feet").val((m * 3.2808398950131234).toFixed(3));
	$("#yard").val((m * 1.0936132983377078).toFixed(3));
	$("#mile").val((m * 0.0006213711922373339).toFixed(5));
	$("#nautical").val((m * 0.0005399568034557236).toFixed(5));
}

function area_convert(){
	//convert imput field to square meter
	var sm;
	if (
		$("#sfathom").val().length) {
			sm = $("#sfathom").val() * 3.5966;
		}
	else if (
		$("#hectare").val().length) {
			sm = $("#hectare").val() * 10000.0;
		}
	else if (
		$("#cacre").val().length) {
			sm = $("#cacre").val() * 1600.0 * 3.5966;
		}
	else if (
		$("#acre").val().length) {
			sm = $("#acre").val() * 4046.873;
		}
	else 
		sm = $("#smeter").val() * 1;
	
	$("#smeter").val(fix(sm,3));
	$("#sfathom").val((sm/3.5966).toFixed(5));
	$("#hectare").val((sm/10000.0).toFixed(5));
	$("#cacre").val((sm/1600/3.5966).toFixed(5));
	$("#acre").val((sm/4046.873).toFixed(5));
	$("#convertarea").focus();
}
 
 function angle_convert( ) {
	var v, w, w1;
	$(".angle").css('background-color', '');
	//convert input field to radian
	
	if ($("#degree").val().length) {
		v = $("#degree").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#degree").css('background-color', 'red');
			return;
		}
		w = v * 0.017453292519943295769236907684886;
	}
	else if ($("#radian").val().length){
		v = $("#radian").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#radian").css('background-color', 'red');
			return;
		}
		w = v * 1;
	}
	else if ($("#dms").val().length){
		if (! ang_pattern.test($("#dms").val())) {
			$("#dms").css('background-color', 'red');
			return;
		}
		w = ($("#dms").val().split) (new RegExp(/[- ]/));
		w1 = 0;
		if (w.length > 0) w1 = w[0] * 1;
		if (w.length > 1) w1 += w[1] / 60.0
		 if (w.length > 2) w1 += w[2] / 3600.0;
		w = w1 * 0.017453292519943295769236907684886;
	}
	else if ($("#grad").val().length){
		if (! num_pattern.test($("#grad").val())) {
			$("#grad").css('background-color', 'red');
			return;
		}
		w=$("#grad").val() * 0.015707963267948966192313216916398;
	}
	else if ($("#mills").val().length){
		if (! num_pattern.test($("#mills").val())) {
			$("#mills").css('background-color', 'red');
			return;
		}
		w=$("#mills").val() * 4.9087385212340519350978802863742e-4;
	}
	if (! w) return;
	//convert from radian
	$("#radian").val((w).toFixed(5));
	deg = w / 0.017453292519943295769236907684886;
	secall= (deg*3600).toFixed(0);
	sec=secall % 60 + '';
	minall=Math.floor(secall / 60);
	min = minall % 60 + '';
	deg =Math.floor(minall / 60);
	if (sec.length == 1) sec = '0' + sec;
	if (min.length == 1) min = '0' + min;
	dms=deg+'-'+min+'-'+sec;	
	$("#degree").val((w / 0.017453292519943295769236907684886).toFixed(6));
	$("#dms").val(dms);
	$("#grad").val((w / 0.015707963267948966192313216916398).toFixed(5));
	$("#mills").val((w / 4.9087385212340519350978802863742e-4).toFixed(0));
}
