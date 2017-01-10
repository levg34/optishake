var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [];

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
		d3.select(this).style('fill', 'black')
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
	saveList()
}

function saveList() {
	list.sort()
	localStorage.list = JSON.stringify(list)
}
