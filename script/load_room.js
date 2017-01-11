var w = 960,
	h = 500,
	z = 20,
	x = w / z,
	y = h / z,
	list = [],
	shakel = [],
	selfdata,
	namesData;

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
	delete localStorage.shakel
}

function deleteRoom() {
	localStorage.clear()
}

function loadData() {
	loadJSON('/data/room.json', function(response) {
		list = JSON.parse(response)
		localStorage.list = response
	})
	loadJSON('/data/data.json', function(response) {
		namesData = JSON.parse(response)
		localStorage.namesData = response
	})
	loadJSON('/data/self.json', function(response) {
		selfdata = JSON.parse(response)
		localStorage.selfdata = response
	})
}

if (localStorage.list) {
	document.getElementById('nodata').setAttribute('hidden','')
	document.getElementById('withdata').removeAttribute('hidden')
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

	if (localStorage.namesData) {
		var res = ''
		namesData = JSON.parse(localStorage.namesData)
		// TODO: implement
		console.log(namesData)
		for (var i in list) {
			var data = list[i]
			if ((!selfdata || data!=selfdata)&&shakel.indexOf(data)>-1) {
				if (namesData[data]) {
					res += namesData[data] + '<br>'
				} else {
					res += 'Unknown '+data + '<br>'
				}
			}
		}
		document.querySelector('#listshakes').innerHTML = res
	}
}
