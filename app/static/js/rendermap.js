$(document).ready(function() {
  var currentlySelectedState = null;
  
  // Function to update the dimensions of the SVG map and redraw states
  function updateMapSize() {
    const width = $('#map-container').width();
    const height = $(window).height(); // Using the window height, but you can adjust as needed
    const svg = d3.select('#map');
    const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale([width]);
    const path = d3.geoPath().projection(projection);
    
    // Update SVG dimensions and path data
    svg.attr('width', width).attr('height', height);
    svg.selectAll('.state').attr('d', path);
  }

  // Map render function
  function renderMap(usStatesData) {
    const svg = d3.select('#map');
    const path = d3.geoPath(); // Projection will be set in updateMapSize()

    // Bind data and create one path per GeoJSON feature
    svg.selectAll('path')
      .data(usStatesData.features)
      .enter()
      .append('path')
      .attr('class', 'state')
      .on('click', function(d) {
        if (currentlySelectedState) {
          d3.select(currentlySelectedState).classed('state-selected', false);
        }
        currentlySelectedState = this;
        d3.select(this).classed('state-selected', true);
        
        $('#sidebar-title').text(d.properties.name);
        showSidebar(); // Call showSidebar to adjust map when opening
      });

    // Update map on initial render
    updateMapSize();
  }

  // Fetch GeoJSON and render the map
  $.getJSON("static/json/us_states.geojson", renderMap);

  // Event listeners for window resize and sidebar toggles
  $(window).resize(updateMapSize);

  // Close the sidebar to allow for map to use full container width
  function closeSidebar() {
    $('#sidebar').removeClass('show');
    updateMapSize(); // Update map size after closing
  }

  // Open the sidebar, which triggers an update to the map size
  function showSidebar() {
    $('#sidebar').addClass('show');
    updateMapSize(); // Update map size after showing
  }
  
  // Close the sidebar initially
  closeSidebar();
});