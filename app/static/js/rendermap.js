$(document).ready(function() {
  // Variable to keep track of currently selected state
  var currentlySelectedState = null;
  let additionalStateData = {};
  let sourceData = {};

  // Function to load additional data
  function loadAdditionalStateData() {
    return fetch('static/json/admin_data.json')
        .then(response => response.json())
        .then(data => {
          additionalStateData = data;
        })
        .catch(error => console.error('Error loading additional state data:', error));
      }

    // Function to load additional data
    function loadSourceData() {
      return fetch('static/json/sources.json')
          .then(response => response.json())
          .then(data => {
            sourceData = data;
          })
          .catch(error => console.error('Error loading source data:', error));
        }

      // Event handler for both arrows
        $('.scroll-down-arrow').on('click', function(e){
          e.preventDefault(); // Prevent the default anchor behavior
          e.stopPropagation(); // Stop the event from bubbling up the DOM tree
  
          // Only execute the scroll if this particular arrow is visible in the viewport
          if($(this).is(':visible')){
              const targetSection = $(this).attr('href'); // Get the section id to scroll to
  
              // Use jQuery's animate function to scroll to the target section
              $('html, body').animate({
                  scrollTop: $(targetSection).offset().top
              }, 1000); // Scroll speed in milliseconds
              return false; // Return false to prevent default anchor click behavior
          }
      })

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
  
      // JS for the pop-up explainer boxes -- set up each modal
      setupModal('Medicaid-modal-btn', 'Medicaid-modal');
      setupModal('TANF-modal-btn', 'TANF-modal');
      setupModal('SNAP-modal-btn', 'SNAP-modal');
      setupModal('data-modal-btn', 'data-modal');

  // Define the render function here
  function renderMap(usStatesData) {
      const container = $('#map-container');
      const width = container.width();
      const height = container.height();
      loadAdditionalStateData()
      loadSourceData()

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
            const stateSource = sourceData[stateId]

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
            $('#s-time').text(stateInfo.S["Time to complete"]);
            $('#s-online').text(stateInfo.S["Online application"]);
            $('#s-mobile').text(stateInfo.S["Mobile accessible"]);
            $('#s-integrated').text(stateInfo.S["Integration with other programs"]);

            //Data footnotes
            $('#stateID').text(stateId);
            $('#m-source').text(stateSource.M.source);
            $('#m-source').attr('href', stateSource.M.source);
            $('#t-source').text(stateSource.T.source);
            $('#t-source').attr('href', stateSource.T.source);
            $('#s-source').text(stateSource.S.source);
            $('#s-source').attr('href', stateSource.S.source);
            showSidebar();
        });
  }
  
  // Fetch the GeoJSON data and then call the render function
  $.getJSON("static/json/us_states.geojson", function(usStatesData) {
      renderMap(usStatesData);
  });


  // The function to show the sidebar
  function showSidebar() {
    var sidebar = $('#sidebar');
    sidebar.css('right', '0px'); // Show the sidebar
  }

});