var baseUrl = 'https://levg34.github.io/optishake' // for local tests
// var baseUrl = '.' // on server

function loadJSON(file,callback) {
	var xobj = new XMLHttpRequest()
	xobj.overrideMimeType('application/json')
	xobj.open('GET', baseUrl+file, true)
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj.responseText)
		}
	}
	xobj.send(null);
}
