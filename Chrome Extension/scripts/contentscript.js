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
			$(this).before('<span class="icon-key2 uniquify-btn"></span>');
			$(this).before('<a class="uniquify-click" rel="leanModal" name="uniquify-popup'+index+'" href="#uniquify-popup'+index+'" />');
			
			var paddingRight = parseInt($(this).css('padding-right'), 10);
			var pwheight = $(this).innerHeight();
			var pwWidth = $(this).innerWidth();

			$('.uniquify-btn', $(this).parent('.uniquify-wrapper:first')).css({
				top: (pwheight - 12) / 2,
				left: pwWidth - paddingRight - 12
			});
			$('body').append('<div id="uniquify-popup'+index+'" class="uniquify-popup" >'+
				'<span class="uniquify-h3">Generate Your Secure Password:</span>'+
				'<div class="uniquify-q">'+
					'<label for="ServiceName">Domain Name:</label>'+
					'<input id="uniquify-domain" name="domain" class="uniquify-domain" placeholder="eg. google.com" type="text">'+
				'</div>'+
				'<div class="uniquify-q">'+
					'<label for="Key">Key:</label>'+
					'<input id="uniquify-key" placeholder="Key" class="uniquify-key" name="key" type="text" value="">'+
					'<span class="uniquify-error"></span>'+
				'</div>'+
				'<div class="uniquify-q">'+
					'<label for="length">length:</label>'+
					'<input id="uniquify-length" placeholder="Length" class="uniquify-length" name="length" type="number" value="8">'+
					'<span class="uniquify-error"></span>'+
				'</div>'+
				'<div class="uniquify-actons">'+
					'<input type="submit" class="getuniquify" for="'+id+'" value="Get Secure Password" />'+
				'</div></div>');
		}
	});
	
	$("a[rel*=leanModal]").leanModal();
	chrome.extension.sendRequest({}, function(response) {});
} else {
}
$('#uniquify-domain').val(document.domain);
$('.uniquify-btn').click(function(event) {
	event.preventDefault();
	$('.uniquify-key', $(this).parents('.uniquify-wrapper:first')).val("");
	clickedPassID = $('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).attr('name');
	$('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).click();
});
var uniquify = new Uniquify();
$('.getuniquify').click(function () {
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