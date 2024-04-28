$(document).ready(function() {
  // Variable to keep track of currently selected state
  var currentlySelectedState = null;

  // Define the render function here
  function renderMap(usStatesData) {
      const svg = d3.select('#map');
      const container = $('#map-container'); // Use the correct container ID
      const width = container.width();
      const height = container.height();

      const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(1000);
      const path = d3.geoPath().projection(projection);

      svg.attr('width', width).attr('height', height) // Set dimensions on the SVG element

      // Bind data and create one path per GeoJSON feature
      svg.selectAll('path')
          .data(usStatesData.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('class', 'state')
          .on('click', function(d) {
              // Remove selected class from previous state if it exists
              if (currentlySelectedState) {
                  d3.select(currentlySelectedState).classed('state-selected', false);
              }
              // Save the current state element
              currentlySelectedState = this;
              // Add the selected class to the current state
              d3.select(this).classed('state-selected', true);
              
              // Open the sidebar when a state path is clicked
              $('#sidebar-title').text(d.properties.name);  // Update the title to the state's name
              showSidebar();  // Toggle the sidebar visibility
          });

  }

  // Fetch the GeoJSON data and then call the render function
  $.getJSON("static/json/us_states.geojson", function(usStatesData) {
      renderMap(usStatesData);
  });

  // The function to toggle the sidebar's visibility
  window.closeSidebar = function() {
    var sidebar = $('#sidebar');
    var rightPos = sidebar.css('right') === '0px' ? '-300px' : '0px';
    sidebar.css('right', rightPos);
    $('#map-container').css('width', '100%'); 
  }

  // The function to toggle the sidebar's visibility
  function showSidebar() {
      var sidebar = document.getElementById('sidebar');
      sidebar.style.right = '0px';          // Show the sidebar
      $('#map-container').css('width', 'calc(100% - 300px)'); 
    }

});