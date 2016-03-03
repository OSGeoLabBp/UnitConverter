// round float number to given decimals
function fix(num, decimals)
{
	var w;
	w = Math.round(num *  Math.pow(10, decimals));
	w = w /  Math.pow(10, decimals);
	w = w + '';		// convert to string
	return w;
}

$(document).ready(function () {
	// reset fields if one gets focus
	$(".dist").focus(function (e) {
		$(".dist").val("");
		// $("#reset").trigger("click");
	});
	// convert value if enter pressed in a field
	$(".dist").keypress(function(e) {
		if (e.which == 13) {
			dist_convert();
		}
	});
	// convert value if convert button clicked
	$("#convert").click(dist_convert);
	$(".angle").focus(function(e){
		$(".angle").val("");
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
	$("#meter").val(fix(m, 3));
	// change meter to all others
	$("#fathom").val(fix(m * 0.527291601, 3));
	$("#feet").val(fix(m * 3.2808398950131234, 3));
	$("#yard").val(fix(m * 1.0936132983377078, 2));
	$("#mile").val(fix(m * 0.0006213711922373339, 5));
	$("#nautical").val(fix(m * 0.0005399568034557236, 5));
}

function angle_convert( ) {
	var w, w1;
	//convert input field to radian
	if ($("#degree").val().length)
		w=$("#degree").val() * 0.017453292519943295769236907684886;
	else if ($("#radian").val().length)
		w=$("#radian").val() * 1;
	else if ($("#dms").val().length){
		w = ($("#dms").val().split) (new RegExp(/[- ]/));
		w1 = 0;
		if (w.length > 0) w1 = w[0] * 1;
		if (w.length > 1) w1 += w[1] / 60.0
		 if (w.length > 2) w1 += w[2] / 3600.0;
		w = w1 * 0.017453292519943295769236907684886;
	}
	else if ($("#grad").val().length)
		w=$("#grad").val() * 0.015707963267948966192313216916398;
	else if ($("#mills").val().length)
		w=$("#mills").val() * 4.9087385212340519350978802863742e-4;
	//convert from radian
	$("#radian").val(fix(w, 5));
	deg = w / 0.017453292519943295769236907684886;
	$("#degree").val(fix(deg, 6));
	w1 = Math.floor(deg);		// degrees
	dms = w1 + '-';
	min  = (deg - w1) * 60;
	w1 = Math.floor(min) + '';		// minutes
	if (w1.length == 1) w1 = '0' + w1;
	dms += w1 + '-'
	sec  = (min - w1) * 60;		// masodpercek
	w1 = Math.round(sec) + '';
	if (w1.length == 1) w1 = '0' + w1;
	dms += w1;
	$("#dms").val(dms);
	$("#grad").val(fix(w / 0.015707963267948966192313216916398,5));
	$("#mills").val(fix(w / 4.9087385212340519350978802863742e-4,0));
}
