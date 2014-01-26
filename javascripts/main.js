blacki = window.blacki || {};

blacki.svgText = {};

blacki.svgText = (function() {
    var self = {},
        text = $('#displayText'),
        glyphs = $('#glyphs'),
        specialChar = ['*', '_'],
        cursor;

    self.init = function() {
        init();
    };

    function init() {
        initPaths();
        drawName();
        initKeys();
    }

    function initPaths() {
        $('path').each(function() {
            var path = $(this),
                length = Math.round(this.getTotalLength() * 100) / 100;
            path.attr('stroke', '#000');
            path.attr('stroke-width', '1');
            path.attr('fill', '#fff');
            path.attr('data-c', '238');
            path.attr('data-length', length);
            path.attr('stroke-dasharray', length + ' ' + length);
            path.attr('stroke-dashoffset', length);
        });
    }

    function drawName() {
        text.empty();
        var initialText = $(['h', 'a', 'v', 'e', 'f', 'u', 'n']);
        initialText.each(function(index) {
            key = glyphs.find('#' + this);

            text.append(key.clone().removeAttr('id').addClass(this));

            var svg = text.find('svg').last(),
                path = $(svg).find('path'),
                length = Math.round(path[0].getTotalLength() * 100) / 100;

            path.animate({
                "stroke-dashoffset": "0.00",
            }, {
                duration: 6000,
                specialEasing: 'easeInOutQuad'
            });
        });
    }

    function initKeys() {
        setTimeout(updateCursor, 2000);
        $(document).on('keydown', function(e) {
            var code = e.keyCode || e.which;
            if (e.keyCode == 8) {
                //backspace
                e.preventDefault();
                text.find('svg').last().remove();
            }
        });

        $(document).on('keypress', function(e) {
            var code = e.keyCode || e.which,
                text = $('#displayText'),
                key;

            if (/^[0a-zA-Z]+$/.test(String.fromCharCode(code)) || specialChar.indexOf(String.fromCharCode(code)) >= 0) {

                hasSpecialChar = specialChar.indexOf(String.fromCharCode(code));

                if (hasSpecialChar >= 0) {
                    c = specialChar[hasSpecialChar];
                    switch (c) {
                    case '*':
                        key = glyphs.find('#asterisk');
                        break;
                    case '_':
                        key = glyphs.find('#underscore');
                        break;
                    }

                } else {
                    key = glyphs.find('#' + String.fromCharCode(code).toLowerCase());
                }
                if (key.length > 0) {
                    text.append(key.clone().removeAttr('id').addClass(String.fromCharCode(code)));

                    var svg = text.find('svg').last(),
                        path = $(svg).find('path'),
                        length = Math.round(path[0].getTotalLength() * 100) / 100;

                    path.animate({
                        "stroke-dashoffset": "0.00",

                    }, {
                        duration: 6000,
                        specialEasing: 'easeInOutQuad'
                    });
                }
            } else if (e.keyCode == 32) {
                //space
                var el = text.find('svg').last().clone();
                el.find('path').remove();
                text.append(el);
            };
            updateCursor(text.find('svg').last());
            text.find('svg').last()[0].scrollIntoView(true);
        });
    }

    function updateCursor(el) {
        if (el == undefined) {
            el = $('#displayText').append($('<div></div>').addClass('cursor'));
        } else {
            $('.cursor').remove();
            clearInterval(cursor); // stop the interval
            el = el.after($('<div></div>').addClass('cursor'));
        };

        cursor = setInterval(function() {
            $('.cursor').animate({
                opacity: 1
            }, 'fast', 'swing').animate({
                opacity: 0
            }, 'fast', 'swing');
        }, 900);
    }
    return self;
}());

$(document).ready(function() {
    blacki.svgText.init();
});