var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [],
	shakel = [];

if (localStorage.list!=undefined) {
	list = JSON.parse(localStorage.list)

	var svg = d3.select('h1').append('svg')
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
		if (addToList(d)) {
			d3.select(this).style('fill', 'green')
		}
	}

	function addToList(d) {
		var nexist = (shakel.indexOf(d)==-1)
		if (nexist) {
			shakel.push(d)
		}
		return nexist
	}

	function saveList() {
		shakel.sort()
		localStorage.shakel = JSON.stringify(shakel)
		// console.log(JSON.parse(localStorage.shakel))
	}

} else {
	var p = d3.select('h1').append('p').text('No room has been created: ').append('a').attr('href', 'create_room.html').text('create room')
}
