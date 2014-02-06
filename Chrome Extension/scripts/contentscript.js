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
			$(this).parent('.uniquify-wrapper:first').css({
				width: $(this).width()
			});
			var pwWidth = $(this).parent('.uniquify-wrapper:first').width();
			var pwheight = $(this).parent('.uniquify-wrapper:first').height();
			$('.uniquify-btn', $(this).parent('.uniquify-wrapper:first')).css({
				top: 5,
				right: 5,
				width: pwheight
			});
			$('body').append('<div id="uniquify-popup'+index+'" class="uniquify-popup" >'+
				'<span class="uniquify-h3">Generate Your Secure Password:</span>'+
				'<div class="uniquify-q">'+
					'<label for="ServiceName">Domain Name:</label>'+
					'<input id="uniquify-domain" name="ServiceName" placeholder="eg. google.com" type="text">'+
				'</div>'+
				'<div class="uniquify-q">'+
					'<label for="SecretWord">Secret Word:</label>'+
					'<input id="uniquify-secretword" placeholder="Secret Word..." class="uniquify-secretword" name="SecretWord" type="text" value="">'+
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
	$('.uniquify-secretword', $(this).parents('.uniquify-wrapper:first')).val("");
	clickedPassID = $('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).attr('name');
	$('.uniquify-click', $(this).parents('.uniquify-wrapper:first')).click();
});
var uniquify = new Uniquify();
$('.getuniquify').click(function () {
	var pass = $(this).attr('for');
	var secretword = $('.uniquify-secretword', $(this).parents('.uniquify-popup:first')).val();
	submitPass(document.domain, secretword, pass);
});
var submitPass = function (domain, key, input) {
	var result = generatePass(domain, key);
	if (result) {
		$('#'+input).val(result);
		$("#lean_overlay").click();
	}
}
var generatePass = function (domain, key) {
	$('.uniquify-error').hide();
	if (key.length > 7) {
		var result = uniquify.generatePassword(domain, key, 8, 1);
		return result;
	} else {
		$('.uniquify-error').text('Secret word needs to be at least 8 characters');
		$('.uniquify-error').show();
		return;
	}
};