$(document).ready(function() {
  // Variable to keep track of currently selected state
  var currentlySelectedState = null;

  let additionalStateData = {};

  // Function to load additional data
  function loadAdditionalStateData() {
    return fetch('static/json/admin_data.json')
        .then(response => response.json())
        .then(data => {
          additionalStateData = data;
        })
        .catch(error => console.error('Error loading additional state data:', error));
      }


  // Function to update the map dimensions and redraw paths
  function updateMapSize() {
    const container = $('#map-container');
    const width = container.width();
    const height = container.height();
    const svg = d3.select('#map');
    const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(width*.75);
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
      loadAdditionalStateData()

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
            
            // update sidebar title
            $('#sidebar-title').text(d.properties.name);

            // get data on the state from JSON
            const stateId = d.properties.abbr
            const stateInfo = additionalStateData[stateId];

            console.log(additionalStateData[stateId])

            // update sidebar text

            // Medicaid
            $('#m-takeup-rate').text(stateInfo.M["Take up rate"]);
            $('#m-time').text(stateInfo.M["Time to complete"]);
            $('#m-online').text(stateInfo.M["Online application"]);
            $('#m-mobile').text(stateInfo.M["Mobile accessible"]);
            $('#m-integrated').text(stateInfo.M["Integration with other programs"]);

            // TANF
            $('#t-takeup-rate').text(stateInfo.T["Take up rate"]);
            $('#t-time').text(stateInfo.T["Time to complete"]);
            $('#t-online').text(stateInfo.T["Online application"]);
            $('#t-mobile').text(stateInfo.T["Mobile accessible"]);
            $('#t-integrated').text(stateInfo.T["Integration with other programs"]);

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