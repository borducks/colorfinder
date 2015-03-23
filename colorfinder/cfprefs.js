// CF Prefs script

var ls = chrome.storage.local;
var coloreditor = document.getElementById("color_data_editor");
var savebutton = document.getElementById("save_color_data_button");

savebutton.addEventListener('click', function(e){
    console.log("save color data!");
    var new_color_data = coloreditor.value;
    ls.set({color_data: new_color_data}, function(){
        console.log("new data saved");
        alert ("Color data updated!");
    });
});

getColorData().then(function(response) {
    var color_data_text = response.color_data;
    return color_data_text;
}).then(function(val){
    coloreditor.value = val;
    console.log("set editor value:\n" + val);
});
