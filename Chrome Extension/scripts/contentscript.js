var clickedPassID;

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700']
    }
  });

if ($("input:password").length) {
	$("input:password").each(function(index) {
		if(!$(this).hasClass('no-uniquify-overlay')) {
			if ($(this).attr('id') === undefined) {
				$(this).attr('id', 'uniquify' + index);
			}
			var id = $(this).attr('id');
			
			$(this).wrap('<div class="uniquify-wrapper"></div>');
			$(this).before('<span class="uniquify-icon-key2 uniquify-btn"></span>');
			$(this).before('<a class="uniquify-click" rel="leanModal" name="uniquify-popup'+index+'" href="#uniquify-popup'+index+'" />');
			
			var paddingRight = parseInt($(this).css('padding-right'), 10);
			var pwheight = $(this).innerHeight();
			var pwWidth = $(this).innerWidth();

			$('.uniquify-btn', $(this).parent('.uniquify-wrapper:first')).css({
				top: (pwheight - 12) / 2,
				left: pwWidth - paddingRight - 12
			});
			$('body').append('<div id="uniquify-popup'+index+'" class="uniquify-popup" >'+
				'<span class="uniquify-h3">Generate Your Secure Password:</span>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-domain">Domain Name:</label>' +
					'<input id="uniquify-domain" name="uniquify-domain" placeholder="eg. google.com" type="text" value="'+ document.domain +'">' +
				'</div>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-key0">Key:</label>' +
					'<input id="uniquify-key0" name="uniquify-key0" class="uniquify-key no-uniquify-overlay" type="password" value="" />' +
					'<a class="uniquify-show-key"><i class="uniquify-icon-eye"></i></a>' +
				'</div>' +
				'<span for="key0" class="uniquify-error" style="display: none;"></span>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-add-key"></label>' +
					'<a class="uniquify-add-key">Add Key<i class="uniquify-icon-plus2"></i></a>' +
				'</div>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-length">Password Length:</label>' +
					'<div id="uniquify-length-slider" class="fm-slider"></div>' +
					'<span id="uniquify-length" class="fm-slider-label"></span>' +
					'<input type="hidden" id="uniquify-length-value"/>' +
				'</div>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-special">Special Characters:</label>' +
					'<input id="uniquify-special" name="uniquify-special" type="checkbox" checked="checked">' +
				'</div>' +
				'<div class="uniquify-q" id="specialCharsContainer">' +
					'<label for="uniquify-special-chars"></label>' +
					'<input id="uniquify-special-chars" name="uniquify-special-chars" type="text" value="!£$%&*@~#.<>?;:_+">' +
				'</div>' +
				'<div class="uniquify-q">' +
					'<label for="uniquify-iterations">Iterations:</label>' +
					'<div id="uniquify-iterations-slider" class="fm-slider"></div>' +
					'<span id="uniquify-iterations" class="fm-slider-label"></span>' +
					'<input type="hidden" id="uniquify-iterations-value" />' +
				'</div>' +
				'<span for="uniquify-iterations" class="uniquify-warning" id="uniquify-iterations-error">We recommend you use a higher number of iterations</span>' +
				'<div class="uniquify-actons">' +
					'<input type="submit" class="uniquify-it" for="' + id + '" value="Generate Password" />' +
				'</div>' +
			'</div>');
		}
	});
	
	$("a[rel*=leanModal]").leanModal();
	chrome.extension.sendRequest({}, function(response) {});
} else {
}
$(document).on('mouseup', '.uniquify-show-key', function () {
    this.parentNode.getElementsByTagName('input')[0].type = 'password';
});
$(document).on('mousedown', '.uniquify-show-key', function () {
    this.parentNode.getElementsByTagName('input')[0].type = 'text';
});
$('.uniquify-btn').click(function(event) {
	event.preventDefault();
	$('.uniquify-key', $(this).parents('.uniquify-wrapper:first')).val("");
	clickedPassID = $('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).attr('name');
	$('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).click();
});
var uniquify = new Uniquify();
$('.uniquify-it').click(function () {
	var input = $(this).attr('for');
	var domain = $('.uniquify-domain', $(this).parents('.uniquify-popup:first')).val();
	var key = $('.uniquify-key', $(this).parents('.uniquify-popup:first')).val();
	var length = $('.uniquify-length', $(this).parents('.uniquify-popup:first')).val();
	submitPass(domain, key, length, input);
});
var submitPass = function (domain, key, length, input) {
	var result = generatePass(domain, key, length);
	if (result) {
		$('#'+input).val(result);
		$('#'+input).focus();
		$("#lean_overlay").click();
	}
}
var generatePass = function (domain, key, length) {
	$('.uniquify-error').hide();
	if (key.length > 7) {
		var result = uniquify.generatePassword(domain, key, length, true, 1);
		return result;
	} else {
		$('.uniquify-error').text('Secret word needs to be at least 8 characters');
		$('.uniquify-error').show();
		return;
	}
};