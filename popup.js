var button = document.getElementById('search_button');
var term = document.getElementById('search_term');
var result = document.getElementById('result');
var error_display = document.getElementById('error');

button.addEventListener('click', function(e) {
    result.innerHTML = term.value;
});
term.addEventListener('keyup', function(e) {
    // clear result block
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
    // add new ones
    for (var i = 0; i < colorkeys.length; i++) {
        if (colorkeys[i].indexOf(e.target.value) > -1 || colordata[colorkeys[i]].indexOf(e.target.value) > -1) {
            var l = document.createElement("DIV");
            var k = document.createElement("SPAN");
            k.className = "key";
            var v = document.createElement("SPAN");
            var s = document.createElement("SPAN");
            s.className = "swatch";

            // set current color
            if (colordata[colorkeys[i]].indexOf("#") === 0) {
                s.style.backgroundColor = colordata[colorkeys[i]];
            } else if (colordata[colordata[colorkeys[i]]] !== undefined && colordata[colordata[colorkeys[i]]].indexOf("#") === 0) {
                s.style.backgroundColor = colordata[colordata[colorkeys[i]]];
            }

            k.appendChild(document.createTextNode(colorkeys[i]));
            v.appendChild(document.createTextNode(colordata[colorkeys[i]]));
            l.appendChild(s);
            l.appendChild(k);
            l.appendChild(v);
            l.className += "color_result";
            result.appendChild(l);
        }
    }
});

// oad color data from local storage
getColorData().then(function(response) {
    if (response.color_data.length < 5) {
        while (result.firstChild) {
            result.removeChild(result.firstChild);
        }

        result.innerHTML = "You have no colors yet! Go to the preferences and paste in some SASS.";
        result.className += "error";
    }
    return cleanColorData(response.color_data);
}).then(function(ccd) {
    // process into arrays etc.
    processColorData(ccd);
});
