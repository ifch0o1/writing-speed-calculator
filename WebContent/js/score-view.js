var scoreView = (function() {
	var oldResultsCounter = 0;
	
	var writeResults = function(results, element) {
		var el = $(element);
		el.find('.chars-per-minute .val').text(results.charsPerMin);
		el.find('.words-per-minute .val').text(results.wordsPerMin);
		el.find('.total-score .val').text(results.score);
	};
	
	// Exposed functions
	function show(resultsObj) {
		if (resultsObj.charsPerMin && resultsObj.wordsPerMin && resultsObj.score) {
			writeResults(resultsObj, $('.current-results'));
		} else {
			writeResults({charsPerMin: 0, wordsPerMin: 0, score: 0}, $('.current-results'));
		}
	}
	
	function addResultField(resultsObj, inputElement, parentElement) {
		if (!resultsObj.charsPerMin && !resultsObj.wordsPerMin && !resultsObj.score) {
			throw new Error('Missing results. Cannot add new results field.');
		}
		if (!(inputElement instanceof jQuery)) {
			throw new TypeError('Expecting second argument as jQuery object. Instead' + typeof inputElement + ' given.');
		}
		
		$.get('templates/old-result.html', function(template) {
			var template = $(template);
			writeResults(resultsObj, template);
			template.find('.old-result-text').text(inputElement.val());
			template.find('.old-result-count').text('Result #' + ++oldResultsCounter);
			template.hide();
			parentElement.show().find('.panel-heading').after(template.fadeIn(500));
			$('.saving-note').fadeIn(500);
			
			inputElement.val('');
		});
	}

	return {
		show : show,
		addResultField: addResultField
	};

}());