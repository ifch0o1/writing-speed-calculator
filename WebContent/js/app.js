var app = (function() {
	var textField = $('#textArea');
	
	$(textField).on('keyup.esc-trigger-stop', function(e) {
		var code = e.which || e.keyCode;
		if (code === 27) {
			$('.m-btn-stop').trigger('click');
		}
	});
	$('.m-btn-stop').click(function() {
		textField.trigger('suspended:input');
	});

	// Exposed interface
	function run() {
		typingCalculator.watch(textField);
		var resultWritter = function() {
			scoreView.show(typingCalculator.getScores());
		};
		var resultWritterInterval = setInterval(resultWritter, 300);
		
		$('#textArea').on('suspended:input', function() {
			scoreView.addResultField(typingCalculator.getScores(), textField, $('.old-results-panel'));
			typingCalculator.stopWatch();
			typingCalculator.watch(textField);
		});
	}

	return {
		run : run
	};
}());

app.run();