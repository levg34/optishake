var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [],
	shakel = [],
	selfdata;

if (localStorage.list) {
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
		
	if (localStorage.shakel) {
		shakel = JSON.parse(localStorage.shakel)
		d3.selectAll("rect")
			.filter(function(d, i) { return shakel.indexOf(d3.select(this).datum())>-1 })
			.style('fill', 'green');
	}
	
	if (localStorage.selfdata && localStorage.selfdata!='undefined') {
		selfdata = JSON.parse(localStorage.selfdata)
		d3.selectAll("rect")
			.filter(function(d, i) { return d3.select(this).datum()==selfdata })
			.style('fill', 'red');
	}


	function translate(d) {
		return 'translate(' + (d % x) * z + ',' + Math.floor(d / x) * z + ')';
	}

	function mouseover(d) {
		// the value 'd' is also d3.select(this).datum()
		if (!selfdata||!(selfdata==d)) {
			if (addToList(d)) {
				d3.select(this).style('fill', 'green')
			} else {
				remFromList(d)
				d3.select(this).style('fill', 'black')
			}
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
		saveList()
	}

	function saveList() {
		localStorage.shakel = JSON.stringify(shakel)
	}
	
	function clearRoom() {
		shakel = []
		selfdata = 'undefined'
		delete localStorage.shakel
		delete localStorage.selfdata
	}

} else {
	var p = d3.select('h1').append('p').text('No room has been created: ').append('a').attr('href', 'create_room.html').text('create room')
}
