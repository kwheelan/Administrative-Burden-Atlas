function render(usStatesData) {
  const width = document.getElementById('container').clientWidth;
  const height = document.getElementById('container').clientHeight;

  // Projection and path generator
  const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
  const path = d3.geoPath().projection(projection);

  // Create SVG element
  const svg = d3.select('#map').attr('width', width).attr('height', height);

  // Bind data and create one path per GeoJSON feature
  svg.selectAll('path')
      .data(usStatesData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('class', 'state') // The 'state' class is assigned to each state path
      // .on('click', function(event, d) {
      //     // This function is called every time a state is clicked
      //     showSidebar(); // Open the sidebar
      //     var stateName = d.properties.name;
      //     // This line grabs the state name and updates the sidebar content
      //     document.getElementById('sidebar-title').textContent = stateName;
      // })
      ;
}

// Initial render function when GeoJSON data is loaded
d3.json("static/json/us_states.geojson").then(render).catch(function(error) {
  console.log(error);
  alert("Failed to load map data");
});

// Sidebar toggle function
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  if (sidebar.style.right === '0px') {
      sidebar.style.right = '-300px'; // Hide the sidebar
  } else {
      sidebar.style.right = '0px'; // Show the sidebar
  }
}

// Sidebar show function
function showSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.style.right = '0px'; // Show the sidebar
}