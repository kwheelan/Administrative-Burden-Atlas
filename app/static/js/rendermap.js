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

            // SNAP 
            // $('#s-takeup-rate').text(stateInfo.S["Take up rate"]);
            console.log(additionalStateData[stateId].S)            
            $('#s-time').text(stateInfo.S["Time to complete"]);
            $('#s-online').text(stateInfo.S["Online application"]);
            $('#s-mobile').text(stateInfo.S["Mobile accessible"]);
            $('#s-integrated').text(stateInfo.S["Integration with other programs"]);

            //Data footnotes
            $('#stateID').text(stateId);
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

  // JS for the pop-up explainer boxes

  // Function to initialize a modal with its corresponding button and close event.
  function setupModal(buttonId, modalId) {
    // Get the modal
    var modal = document.getElementById(modalId);

    // Get the button that opens the modal
    var btn = document.getElementById(buttonId);

    // Get the <span> element that closes the modal
    var span = modal.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // Set up each modal with corresponding button
  setupModal('Medicaid-modal-btn', 'Medicaid-modal');
  setupModal('TANF-modal-btn', 'TANF-modal');
  setupModal('SNAP-modal-btn', 'SNAP-modal');
  setupModal('data-modal-btn', 'data-modal');

});