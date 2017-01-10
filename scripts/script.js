var names
var selectedName = 'unnamed'
var namesOption

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
	namesOption = document.getElementById('names')
	loadJSON('https://levg34.github.io/optishake/data/names.json', function(response) {
		names = JSON.parse(response)
		names.reverse()
		names.push({name:'me'})
		names.push({name:'unnamed'})
		names.reverse()
		for (var i in names) {
			var name = names[i]
			// add name to view
			addNameOption(i,name.name)
		}
	})
}

function changeName() {
	selectedName = names[namesOption.value].name
}

function addNameOption(i,name) {
	var option = document.createElement('option')
	option.value = i
	option.text = name
	namesOption.add(option)
}