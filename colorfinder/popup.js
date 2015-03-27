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
        var term = e.target.value;
        var key;
        var val;
        if (colorkeys[i].indexOf(term) > -1 || colordata[colorkeys[i]].indexOf(term) > -1) {
            key = colorkeys[i];
            val = colordata[colorkeys[i]];
            createResultItem(key, val, term);            
        }
    }
});

function createResultItem(key, value, term) {
    var l = document.createElement("DIV");
    var k = document.createElement("SPAN");
    k.className = "key";
    var v = document.createElement("SPAN");
    v.className = "value";
    var s = document.createElement("SPAN");
    s.className = "swatch";

    var key_text = key;
    var val_text = value;


    // set current color
    if (value.indexOf("#") === 0) {
        s.style.backgroundColor = colordata[key];
    } else if (colordata[value] !== undefined && colordata[value].indexOf("#") === 0) {
        s.style.backgroundColor = colordata[value];
    }

    // add hex val title to values that are also variables
    if (val_text.indexOf("$") > -1 && colordata[val_text]) {
        v.setAttribute("title", colordata[val_text]);
        if (isHex(colordata[val_text])) {
            s.style.backgroundColor = colordata[val_text];
        } else if (isHex(colordata[colordata[val_text]])) {
            s.style.backgroundColor = colordata[colordata[val_text]];
        }
    }

    // highlight found substring in display text
    key_text = key_text.replace(term, "<b>" + term + "</b>");
    val_text = val_text.replace(term, "<b>" + term + "</b>");

    k.innerHTML = key_text;
    v.innerHTML = val_text;

    l.appendChild(s);
    l.appendChild(k);
    l.appendChild(v);
    l.className += "color_result";
    result.appendChild(l);

    console.log(result.getElementsByClassName('key'));

}

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
