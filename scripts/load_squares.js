var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [];

var selfdata

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
				names[namesOption.value].index = d
			}
		}
		if (namesOption.value!=0) {
			namesOption.remove(namesOption.value)
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
	localStorage.names = names
}
