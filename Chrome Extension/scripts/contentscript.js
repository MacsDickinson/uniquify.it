var clickedPassID;

if ($("input:password").length) {
	$("input:password").each(function(index) {
		if ($(this).attr('id') === undefined) {
			$(this).attr('id', 'securepass' + index);
		}
		var id = $(this).attr('id');
		
		$(this).wrap('<div class="securepass-wrapper"></div>');
		$(this).before('<input type="image" src="http://macsentom.co.uk/docs/securepass_48.png" class="securepass-btn"/>');
		$(this).before('<a class="securepass-click" rel="leanModal" name="securepass-popup'+index+'" href="#securepass-popup'+index+'" />');
		$(this).parent('.securepass-wrapper:first').css({
			width: $(this).width()
		});
		var pwWidth = $(this).parent('.securepass-wrapper:first').width();
		var pwheight = $(this).parent('.securepass-wrapper:first').height();
		$('.securepass-btn', $(this).parent('.securepass-wrapper:first')).css({
			top: 0,
			bottom: 0,
			right: 0,
			width: pwheight
		});
		$('body').append('<div id="securepass-popup'+index+'" class="securepass-popup" >'+
			'<h1>SecurePass</h1>'+
			'<h3>Enter your Secret Word:</h3>'+
			'<div class="securepass-q">'+
				'<input id="securepass-secretword" placeholder="Secret Word..." class="securepass-secretword" name="SecretWord" type="text" value="">'+
				'<span class="securepass-error"></span>'+
			'</div>'+
			'<div class="securepass-actons">'+
				'<input type="submit" class="getMemorable" for="'+id+'" value="Get Secure Password" />'+
				'<input type="submit" class="getSuper" for="'+id+'" value="Get Super Secure Password" />'+
			'</div></div>');
	});
	
	$("a[rel*=leanModal]").leanModal();
	chrome.extension.sendRequest({}, function(response) {});
} else {
}
$('.securepass-btn').click(function(event) {
	event.preventDefault();
	$('.securepass-secretword', $(this).parents('.securepass-wrapper:first')).val("");
	clickedPassID = $('.securepass-click', $(this).parents('.securepass-wrapper:first')).attr('name');
	$('.securepass-click', $(this).parents('.securepass-wrapper:first')).click();
});
var securePass = new SecureClass();
$('.getMemorable').click(function () {
	var pass = $(this).attr('for');
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-popup:first')).val();
	submitPass('memorable', document.domain, secretword, pass);
});
$('.getSuper').click(function () {
	var pass = $(this).attr('for');
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-popup:first')).val();
	submitPass('secure', document.domain, secretword, pass);
});
var submitPass = function (type, domain, key, input) {
	var result = generatePass(type, domain, key);
	if (result) {
		$('#'+input).val(result);
		$("#lean_overlay").click();
	}
}
var generatePass = function (type, domain, key) {
	$('.securepass-error').hide();
	if (key.length > 7) {
		var result;
		if (type === 'secure') {
			result = securePass.generateSecure(domain, key);
		} else {
			result = securePass.generateMemorable(domain, key);
		}
		return result;
	} else {
		$('.securepass-error').text('Secret word needs to be at least 8 characters');
		$('.securepass-error').show();
		return;
	}
};