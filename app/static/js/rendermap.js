function render(usStatesData) {
  const width = document.getElementById('container').clientWidth;
  const height = document.getElementById('container').clientHeight;
  
  const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
  const path = d3.geoPath().projection(projection);
  
  const svg = d3.select('#map').attr('width', width).attr('height', height);
  
  svg.selectAll('path')
      .data(usStatesData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'state')
      .on('click', function(event, d) {
        updateSidebar(d.properties);
    });
}

function updateSidebar(properties) {
  // Update the sidebar content.
  document.getElementById('sidebar-title').textContent = properties.name;
  // Assume we have a property `info` in the properties object.
  document.getElementById('sidebar-content').innerHTML = properties.info;
  // Show the sidebar.
  document.getElementById('sidebar').style.display = 'block';
}

// Load the GeoJSON data and then call the render function
d3.json("static/json/us_states.geojson").then(render).catch(function(error) {
  console.log(error);
  alert("Failed to load map data");
});