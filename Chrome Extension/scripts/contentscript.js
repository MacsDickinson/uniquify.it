var clickedPassID;

if ($("input:password").length) {
	$("input:password").each(function(index) {
		
		$(this).wrap('<div class="securepass-wrapper"></div>');
		$(this).before('<input type="image" src="https://dl.dropbox.com/u/10918652/icon2_128.png" class="securepass-btn"/>');
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
		$(this).after('<div id="securepass-popup'+index+'" class="securepass-popup" >'+
			'<h1>SecurePass</h1>'+
			'<h3>Enter your Secret Word:</h3>'+
			'<div class="fm-q">'+
				'<input id="securepass-secretword" placeholder="Secret Word..." class="securepass-secretword" name="SecretWord" type="text" value="">'+
				'<span class="securepass-error"></span>'+
			'</div>'+
			'<div class="fm-actons">'+
				'<input type="submit" id="getMemorable" value="Get Secure Password" />'+
				'<input type="submit" id="getSuper" value="Get Super Secure Password" />'+
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
$('#getMemorable').click(function () {
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-wrapper:first')).val();
	generatePass('memorable', document.domain, secretword);
});
$('#getSuper').click(function () {
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-wrapper:first')).val();
	generatePass('secure', document.domain, secretword);
});
var generatePass = function (type, domain, key) {
	$('.securepass-error').hide();
	if (key.length > 7) {
		var result;
		if (type === 'secure') {
			result = securePass.generateSecure(domain, key);
		} else {
			result = securePass.generateMemorable(domain, key);
		}
		$('input:password', $('#'+clickedPassID).parents('.securepass-wrapper:first')).val(result);
		$("#lean_overlay").click();
	} else {
		$('.securepass-error').text('Secret word needs to be at least 8 characters');
		$('.securepass-error').show();
		return;
	}
};