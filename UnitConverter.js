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
	$("#feet").val(fix(m * 3.2808398950131234, 2));
	$("#yard").val(fix(m * 1.0936132983377078, 2));
	$("#mile").val(fix(m * 0.0006213711922373339, 5));
	$("#nautical").val(fix(m * 0.0005399568034557236, 5));
	$("#convert").focus();	// move focus to conveert button
}
