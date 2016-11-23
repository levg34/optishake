var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = JSON.parse(localStorage.list);

var svg = d3.select('p').append('svg')
	.attr('width', w)
	.attr('height', h);

svg.selectAll('rect')
	.data(list)
	.enter().append('rect')
	.attr('transform', translate)
	.attr('width', z)
	.attr('height', z)
	.style('fill', 'black')
	.on('click', mouseover);

function translate(d) {
	return 'translate(' + (d % x) * z + ',' + Math.floor(d / x) * z + ')';
}

function mouseover(d) {
	// the value 'd' is also d3.select(this).datum()
	/*if (addToList(d)) {
		d3.select(this).style('fill', 'black')
	}
}

function addToList(d) {
	var nexist = (list.indexOf(d)==-1)
	if (nexist) {
		list.push(d)
	}
	return nexist
}

function saveList() {
	list.sort()
	localStorage.list = JSON.stringify(list)
	// console.log(JSON.parse(localStorage.list))*/
}
