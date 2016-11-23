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
		
	if (localStorage.shakel==undefined) {
		svg.selectAll('rect')
			.data(list)
			.enter().append('rect')
			.attr('transform', translate)
			.attr('width', z)
			.attr('height', z)
			.style('fill', 'black')
			.on('click', mouseover);
	} else {
		shakel = JSON.parse(localStorage.shakel)
		var list_except = arr_diff(list, shakel)
		console.log(list_except)
		
		svg.selectAll('rect')
			.data(list_except)
			.enter().append('rect')
			.attr('transform', translate)
			.attr('width', z)
			.attr('height', z)
			.style('fill', 'black')
			.on('click', mouseover);
			
		svg.selectAll('rect')
			.data(shakel)
			.enter().append('rect')
			.attr('transform', translate)
			.attr('width', z)
			.attr('height', z)
			.style('fill', 'green')
			.on('click', mouseover);
	}

	function translate(d) {
		return 'translate(' + (d % x) * z + ',' + Math.floor(d / x) * z + ')';
	}

	function mouseover(d) {
		// the value 'd' is also d3.select(this).datum()
		if (addToList(d)) {
			d3.select(this).style('fill', 'green')
		} else {
			remFromList(d)
			d3.select(this).style('fill', 'black')
		}
	}

	function addToList(d) {
		var nexist = (shakel.indexOf(d)==-1)
		if (nexist) {
			shakel.push(d)
			saveList()
		}
		return nexist
	}
	
	function remFromList(d) {
		var index = shakel.indexOf(d);
		shakel.splice(index, 1);
	}

	function saveList() {
		shakel.sort()
		localStorage.shakel = JSON.stringify(shakel)
	}

} else {
	var p = d3.select('h1').append('p').text('No room has been created: ').append('a').attr('href', 'create_room.html').text('create room')
}
