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
			'<input type="text" placeholder="Secret Word..." class="securepass-secretword" id="securepass-secretword" />'+
			'<input type="submit" text="Submit" class="securepass-submit" /></div>');
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
$('.securepass-submit').click(function(event) {
	event.preventDefault();
	
	var secretword = $('.securepass-secretword', $(this).parents('.securepass-wrapper:first')).val();
	var url = 'http://localhost:57181/Get';
	/*
	$.post(url, { key:secretword, value:document.domain }, function(password) {			
		$('input:password', $(this).parents('.securepass-wrapper:first')).val(password);
		$("#lean_overlay").click();
	})
	.error(function() { 
		alert("Service Offline");
		$("#lean_overlay").click();
	});
	*/
	$.ajax({
		url: url,
		data: '{ key: "' + secretword + '", value : "' + document.domain + '" }',
		success: function(password) {			
			$('input:password', $('#'+clickedPassID).parents('.securepass-wrapper:first')).val(password);
			$("#lean_overlay").click();
		},
		failure: function(error) {
			alert('oh Shit: ' + error.d);
			$("#lean_overlay").click();
		},
		404: function() {
			alert("Service Offline");
			$("#lean_overlay").click();
		}
	});
	
});