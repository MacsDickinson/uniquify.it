var clickedPassID;

WebFont.load({
    google: {
      families: ['Open Sans Condensed:300,700']
    }
  });

if ($("input:password").length) {
	$("input:password").each(function(index) {
		if ($(this).attr('id') === undefined) {
			$(this).attr('id', 'securepass' + index);
		}
		var id = $(this).attr('id');
		
		$(this).wrap('<div class="securepass-wrapper"></div>');
		$(this).before('<span class="icon-key2 securepass-btn"></span>');
		$(this).before('<a class="securepass-click" rel="leanModal" name="securepass-popup'+index+'" href="#securepass-popup'+index+'" />');
		$(this).parent('.securepass-wrapper:first').css({
			width: $(this).width()
		});
		var pwWidth = $(this).parent('.securepass-wrapper:first').width();
		var pwheight = $(this).parent('.securepass-wrapper:first').height();
		$('.securepass-btn', $(this).parent('.securepass-wrapper:first')).css({
			top: 5,
			right: 5,
			width: pwheight
		});
		$('body').append('<div id="securepass-popup'+index+'" class="securepass-popup" >'+
			'<span class="securepass-h3">Generate Your Secure Password:</span>'+
			'<div class="securepass-q">'+
				'<label for="ServiceName">Domain Name:</label>'+
				'<input id="securepass-domain" name="ServiceName" placeholder="eg. google.com" type="text">'+
			'</div>'+
			'<div class="securepass-q">'+
				'<label for="SecretWord">Secret Word:</label>'+
				'<input id="securepass-secretword" placeholder="Secret Word..." class="securepass-secretword" name="SecretWord" type="text" value="">'+
				'<span class="securepass-error"></span>'+
			'</div>'+
			'<div class="securepass-actons">'+
				'<input type="submit" class="getSecurePass" for="'+id+'" value="Get Secure Password" />'+
			'</div></div>');
	});
	
	$("a[rel*=leanModal]").leanModal();
	chrome.extension.sendRequest({}, function(response) {});
} else {
}
$('#securepass-domain').val(document.domain);
$('.securepass-btn').click(function(event) {
	event.preventDefault();
	$('.securepass-secretword', $(this).parents('.securepass-wrapper:first')).val("");
	clickedPassID = $('.securepass-click', $(this).parents('.securepass-wrapper:first')).attr('name');
	$('.securepass-click', $(this).parents('.securepass-wrapper:first')).click();
});
var securePass = new SecureClass();
$('.getSecurePass').click(function () {
	var pass = $(this).attr('for');
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-popup:first')).val();
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
	$('.securepass-error').hide();
	if (key.length > 7) {
		var result = securePass.generateSecurePass(domain, key, 8, 1);
		return result;
	} else {
		$('.securepass-error').text('Secret word needs to be at least 8 characters');
		$('.securepass-error').show();
		return;
	}
};