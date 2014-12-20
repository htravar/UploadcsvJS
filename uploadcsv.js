//code reading and writing csv file to console.log from Mounir Messelmeni

//see http://mounirmesselmeni.github.io/2012/11/20/javascript-csv/ - source code not available however
var $ = function (id) { return document.getElementById(id); }

function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

//original author's code ends with the for loop in processData()
function processData(csv) {
    //csv here refers to the parameter for this method and csv is the whole thing
    var allTextLines = csv.split(",")//this stores all rows in the csv file
    var lines = [];//this will store each record of the csv file as an array element
  
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(/,/);
        var tempArr = [];
       
        for (var j = 0; j < data.length; j++) {
            tempArr.push(data[j]);
        }
        lines.push(tempArr);
    }
    //x can't handle lines array unless toString used
    var x = lines.toString();
    alert(x);
    //this creates the pattern for age(ex. 43) and replaces age with whitespace; use g to search each line
	var pattern = /[A-Za-z]+\s[A-Za-z]+,/g;//searches for firstname whitespace lastname comma
	var pattern2 = /\d{2}/g;//searches for 2 digits, i.e. age
    var newstr = "";//store new content in this string
	
    //this replaces Daryl Dixon's age with a blank space
    var newstr = x.replace(pattern, "I eat zombies").replace(pattern2, " for dinner.");
    
    $("list").value = newstr;
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Unable to read file!");
    }
}
