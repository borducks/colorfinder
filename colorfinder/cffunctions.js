// CF common functions 

var ls = chrome.storage.local;

var colordata = {};
var colorkeys = [];


function cleanColorData(data) {
    data = data.replace(/(\/\/.+)|\s+/g, '');
    return data;
}

function processColorData(data) {
    console.log(data);

    var clist = data.split(";");
    for (var i = 0; i < clist.length; i++) {
        if (clist[i].length > 2) {
            var bits = clist[i].split(":");
            colordata[bits[0]] = bits[1];
        }
    }
    console.dir(colordata);
    colorkeys = Object.keys(colordata);

    return colordata;
}

function displayError(str) {
    error_display.innerHTML = str;
}

function getColorData() {
    return new Promise(function(resolve, reject) {
        ls.get('color_data', function(obj) {
            if (obj) {
                resolve(obj);
            } else {
                reject(displayError("data get failed."));
            }
        });
    });
}

function isHex(val) {
    return (val.indexOf("#") === 0);
}
