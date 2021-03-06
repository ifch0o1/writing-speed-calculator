(function () {
    // Extend Array.prototype.
    // Including average numeric function.
    Array.prototype.average = function () {
        var sum = 0;
        this.forEach(function (val) {
            if (isNaN(val)) {
                return;
            }
            sum += val;
        });
        return sum / this.length;
    };
} ());

var typingCalculator = (function () {
    var times = [];
    var watchingEl;

    function registerTime() {
        times.push(new Date().getTime());
    }

    function clearScores() {
        times = [];
    }

    // Exposed function
    function watch(el) {
        if (!el || !(el instanceof jQuery)) {
            throw new TypeError(
					'function watch require first arguments as jQuery object.');
        }

        watchingEl = el;
        $(document).ready(function () {
            watchingEl.on('keyup.chechcar', function (e) {
                var code = e.which || e.keyCode;
                if ((code >= 65 && code <= 90)
                || (code >= 97 && code <= 122)
                || (code >= 48 && code <= 57)) {
                    registerTime();
                }
            });
        });
    }

    function stopWatch() {
        if (watchingEl) {
            watchingEl.unbind('keyup.chechcar');
            watchingEl = undefined;
            clearScores();
        }
    }

    function getScores() {
        timeDiffs = [];
        // Skipping index 0. The first calculation including it.
        for (var i = 1; i < times.length; i++) {
            timeDiffs.push(times[i] - times[i - 1]);
        }
        var averageMs = timeDiffs.average();
        var charsPM = (1000 / averageMs) * 60;
        var wordsPM = charsPM / 5.1;
        var score = 1000 - (averageMs / 3);
        return {
            charsPerMin: Math.floor(charsPM),
            wordsPerMin: Math.floor(wordsPM),
            score: Math.floor(score)
        };
    }

    return {
        watch: watch,
        stopWatch: stopWatch,
        getScores: getScores
    };

} ());