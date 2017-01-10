var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [];

var names
var selectedName = 'unnamed'
var namesOption
var selfdata
var namesData = []

var svg = d3.select('body').append('svg')
	.attr('width', w)
	.attr('height', h);

svg.selectAll('rect')
	.data(d3.range(x * y))
	.enter().append('rect')
	.attr('transform', translate)
	.attr('width', z)
	.attr('height', z)
	.style('fill', 'gray')
	.on('click', mouseover);

function translate(d) {
	return 'translate(' + (d % x) * z + ',' + Math.floor(d / x) * z + ')';
}

function mouseover(d) {
	// the value 'd' is also d3.select(this).datum()
	if (addToList(d)) {
		if (selectedName=='me') {
			d3.select(this).style('fill', 'red')
			selfdata = d
		} else {
			d3.select(this).style('fill', 'black')
			if (selectedName!='unnamed') {
				namesData[d]=names[namesOption.value]
			}
		}
		if (namesOption.value!=0) {
			for (var i=0; i<namesOption.length; ++i){
				if (namesOption.options[i].value == namesOption.value) {
					namesOption.remove(i)
				}
			}
			namesOption.selectedIndex = 0
			changeName()
		}
	} else {
		remFromList(d)
		d3.select(this).style('fill', 'gray')
	}
}

function addToList(d) {
	var nexist = (list.indexOf(d)==-1)
	if (nexist) {
		list.push(d)
	}
	return nexist
}

function remFromList(d) {
	var index = list.indexOf(d);
	list.splice(index, 1);
}

function saveList() {
	list.sort()
	localStorage.list = JSON.stringify(list)
	localStorage.selfdata = selfdata
	localStorage.namesData = JSON.stringify(namesData)
}

/*function loadNames() {
 loadJSON('./data/names.json', function(response) {
 names = JSON.parse(response)
 names.push({name:'me'})
 })
 }*/

function loadNames() {
	namesOption = document.getElementById('names')
	loadJSON('/data/names.json', function(response) {
		names = JSON.parse(response)
		names.sort()
		names.reverse()
		names.push('me')
		names.push('unnamed')
		names.reverse()
		for (var i in names) {
			var name = names[i]
			// add name to view
			addNameOption(i,name)
		}
	})
}

function changeName() {
	selectedName = names[namesOption.value]
}

function addNameOption(i,name) {
	var option = document.createElement('option')
	option.value = i
	option.text = name
	namesOption.add(option)
}
