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
	$(".area").focus(function (e){
		$(".area").val("");
	});
	$(".area").keypress(function(e) {
		if (e.which == 13) {
			area_convert();
		}
	});
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
	$("#sfathom").val(fix(sm/3.5966,3));
	$("#hectare").val(fix(sm/10000.0,3));
	$("#cacre").val(fix(sm/1600/3.5966,3));
	$("#acre").val(fix(sm/4046.873,3));
	$("#convertarea").focus();
}
