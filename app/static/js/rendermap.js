$(document).ready(function() {
  // Variable to keep track of currently selected state
  var currentlySelectedState = null;

  // Function to update the map dimensions and redraw paths
  function updateMapSize() {
    const container = $('#map-container');
    const width = container.width();
    const height = container.height();
    const svg = d3.select('#map');
    const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
    const path = d3.geoPath().projection(projection);

    svg.attr('width', width).attr('height', height);

    svg.selectAll('path.state')
       .attr('d', path); // Update the paths with the new projection
  }

  // Function called to resize the map
  function resizeMap() {
    // Update the dimensions of the map since the sidebar can affect the container size
    updateMapSize();
  }

  // Define the render function here
  function renderMap(usStatesData) {
      const container = $('#map-container');
      const width = container.width();
      const height = container.height();
      updateMapSize(width, height); // Function to update map dimensions

      // Bind data and create one path per GeoJSON feature
      const svg = d3.select('#map');
      svg.selectAll('path')
        .data(usStatesData.features)
        .enter()
        .append('path')
        .attr('class', 'state')
        .attr('d', d3.geoPath().projection(d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000)))
        .on('click', function(d) {
            if (currentlySelectedState) {
                d3.select(currentlySelectedState).classed('state-selected', false);
            }
            currentlySelectedState = this;
            d3.select(this).classed('state-selected', true);
            
            $('#sidebar-title').text(d.properties.name);
            showSidebar();
        });
  }
  
  // Fetch the GeoJSON data and then call the render function
  $.getJSON("static/json/us_states.geojson", function(usStatesData) {
      renderMap(usStatesData);
  });

  // Add window resize event listener
  $(window).resize(resizeMap);

  // The function to show the sidebar and resize the map
  function showSidebar() {
    var sidebar = $('#sidebar');
    sidebar.css('right', '0px'); // Show the sidebar
    resizeMap(); // Resize the map as sidebar has changed the container width
  }

  // The function to close the sidebar and resize the map
  window.closeSidebar = function() {
    var sidebar = $('#sidebar');
    sidebar.css('right', sidebar.css('right') === '0px' ? '-300px' : '0px');
    resizeMap(); // Resize the map as sidebar has changed the container width
  }

});