$(document).ready(function(){
    // Fix IE console bug
    if (!window.console) console = {log: function() {}};

});

function refreshPage() {
    location.reload()
}

function getFbPageIdFromPostId(postId) {
    return postId.split("_")[0]
}

function dictionaryToArray(dictionary) {
    var arr = []
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key)) arr.push(dictionary[key])
    }
    return arr
}

function getDictionarySize(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function testUrl(url){
    return $.ajax({
        url:      url,
        dataType: 'text',
        type:     'GET'
    });
}

function getLocaleName(localeCode) {
    var text = localeCode
    switch(localeCode) {
        case 'en':
            text = 'English'
            break
        case 'zh':
            text = 'Chinese'
            break
        case 'id':
            text = 'Indonesian'
            break
        default:
            text = localeCode
    }
    return text
}

function isEmailValid(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email))
        return false;
    return true;
}

function getParams() {
      var prmstr = window.location.search.substr(1);
      return prmstr !== null && prmstr !== "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function time_m_to_s(minutes_string){
    var components = minutes_string.split(":");
    var min = parseInt(components[0].trim(), 10);
    var sec = parseInt(components[1].trim(), 10);
    var time = min * 60 + sec;

    return time;
}

function time_s_to_m(seconds){
    var time = {};
    time.min = Math.floor(seconds / 60);
    time.sec = seconds % 60;

    var time_string = time.min + ":" + time.sec;

    return time_string;
}

function time_s_to_hms(seconds) {
    var time = {};
    time.hr = Math.floor(seconds / 3600);
    if (time.hr < 10) {
        time.hr = "0" + time.hr;
    }
    time.min = Math.floor((seconds%3600) / 60);
    if (time.min < 10) {
        time.min = "0" + time.min;
    }
    time.sec = seconds % 60;
    if (time.sec < 10) {
        time.sec = "0" + time.sec;
    }

    var time_string = time.hr + ":" + time.min + ":" + time.sec;

    return time_string;
}

function time_hms_to_s(hms_string) {
    var components = hms_string.split(":");
    var h = parseInt(components[0]);
    var m = parseInt(components[1]);
    var s = parseInt(components[2]);
    var seconds = h*60*60 + m*60 + s;
    return seconds;
}

// This function only works in Chrome and Safari
// There is a workaround for Safari
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        if (msg === 'unsuccessful') {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        } else {
            jQuery.gritter.add({
                title: 'Copied to clipboard',
                class_name: 'growl-default'
            });
        }
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function XMLParser(txt, value) {
    var xmlDoc;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc.getElementsByTagName(value)[0].childNodes[0].nodeValue;
}
