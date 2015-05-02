(function textAreaInputSuspendedCustomEvent() {
	var timer;
	$('#textArea').on('keyup.suspended-custom-event', function() {
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
			cancelTimeout();
		}, 3000);
	});
}());