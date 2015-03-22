(function textAreaInputSuspendedCustomEvent() {
	var timer;
	$('#textArea').on('keydown', function() {
		var that = $(this);
		
		function cancelTimeout() {
			clearTimeout(timer);
			timer = undefined;
		}
		if (timer) {
			cancelTimeout();
		}
		
		timer = setTimeout(function() {
			that.trigger('suspended:input');
			console.log('suspended.');
			cancelTimeout();
		}, 3000);
	});
}());