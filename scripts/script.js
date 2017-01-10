var names

function deleteList() {
	delete localStorage.list
}

function arr_diff (a1, a2) {

	var a = [], diff = [];

	for (var i = 0; i < a1.length; i++) {
		a[a1[i]] = true;
	}

	for (var i = 0; i < a2.length; i++) {
		if (a[a2[i]]) {
			delete a[a2[i]];
		} else {
			a[a2[i]] = true;
		}
	}

	for (var k in a) {
		diff.push(k);
	}

	return diff;
}

function loadJSON(file,callback) {	 
	var xobj = new XMLHttpRequest()
	xobj.overrideMimeType('application/json')
	xobj.open('GET', file, true)
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText)
		}
	}
	xobj.send(null);  
}
 

/*function loadNames() {
	loadJSON('./data/names.json', function(response) {
		names = JSON.parse(response)
		names.push({name:'me'})
	})
}*/

function loadNames() {
	loadJSON('https://levg34.github.io/optishake/data/names.json', function(response) {
		names = JSON.parse(response)
		names.push({name:'me'})
	})
}
