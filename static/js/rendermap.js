$(document).ready(function() {
  // Variable to keep track of currently selected state
  var currentlySelectedState = null;
  let additionalStateData = {};
  let sourceData = {};
  let green = '#d7ffc3';
  let red = '#FFdCdB';
  let yellow = '#FFFab5';

  // Function to load additional data
  function loadAdditionalStateData() {
    return fetch('./static/json/admin_data.json')
        .then(response => response.json())
        .then(data => {
          additionalStateData = data;
        })
        .catch(error => console.error('Error loading additional state data:', error));
      }

    // Function to load additional data
    function loadSourceData() {
      return fetch('./static/json/sources.json')
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

  function toIntegerValue(str) {
      // Remove any non-digit characters (including asterisks and decimal points)
      let numericString = str.replace(/[^\d]/g, '');
      // Parse the filtered string into an integer
      let number = parseInt(numericString, 10);
      // Check if the conversion is successful
      return isNaN(number) ? null : number;
  }

  function colorcode_time(value, green_thresh, red_thresh, element_id) {
    value = toIntegerValue(value);
    if (value < green_thresh){
      $(element_id).css('background-color', green);
    } else if (value >= red_thresh) {
      $(element_id).css('background-color', red);
    } else {
      $(element_id).css('background-color', yellow);
    }
  }

  function colorcode_takeup(value, green_thresh, red_thresh, element_id) {
    console.log(value)
    if (value >= green_thresh){
      $(element_id).css('background-color', green);
    } else if (value < red_thresh) {
      $(element_id).css('background-color', red);
    } else {
      $(element_id).css('background-color', yellow);
    }
  }

  function colorcode_yn(value, element_id) {
    if (value == "No"){
      $(element_id).css('background-color', red);
    } else {
      // turn # green
      $(element_id).css('background-color', green);
      }  }

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

            // Hide welcome text and show report card
            $('#Welcome').css('display', 'none');
            $('#report-card').css('display', 'block');

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
            // color code
            colorcode_takeup(stateInfo.M["Take up rate"], 33, 67,'#M1');
            colorcode_time(stateInfo.M["Time to complete"], 30, 60,'#M2');
            colorcode_yn(stateInfo.M["Online application"], '#M3');
            colorcode_yn(stateInfo.M["Mobile accessible"], '#M4');
            colorcode_yn(stateInfo.M["Integration with other programs"], '#M5');

            // TANF
            $('#t-takeup-rate').text(stateInfo.T["Take up rate"]);
            $('#t-time').text(stateInfo.T["Time to complete"]);
            $('#t-online').text(stateInfo.T["Online application"]);
            $('#t-mobile').text(stateInfo.T["Mobile accessible"]);
            $('#t-integrated').text(stateInfo.T["Integration with other programs"]);
            // color code
            colorcode_time(stateInfo.T["Time to complete"], 30, 60,'#T1')
            colorcode_takeup(stateInfo.T["Take up rate"], 33, 67,'#T2');
            colorcode_yn(stateInfo.T["Online application"], '#T3');
            colorcode_yn(stateInfo.T["Mobile accessible"], '#T4');
            colorcode_yn(stateInfo.T["Integration with other programs"], '#T5');


            // SNAP 
            // $('#s-takeup-rate').text(stateInfo.S["Take up rate"]);
            $('#s-time').text(stateInfo.S["Time to complete"]);
            $('#s-online').text(stateInfo.S["Online application"]);
            $('#s-mobile').text(stateInfo.S["Mobile accessible"]);
            $('#s-integrated').text(stateInfo.S["Integration with other programs"]);
            // color code
            colorcode_time(stateInfo.S["Time to complete"], 30, 60,'#S2')
            colorcode_yn(stateInfo.S["Online application"], '#S3');
            colorcode_yn(stateInfo.S["Mobile accessible"], '#S4');
            colorcode_yn(stateInfo.S["Integration with other programs"], '#S5');

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
  $.getJSON("./static/json/us_states.geojson", function(usStatesData) {
      renderMap(usStatesData);
  });


  // The function to show the sidebar
  function showSidebar() {
    var sidebar = $('#sidebar');
    sidebar.css('right', '0px'); // Show the sidebar
  }

  $('[data-toggle="tooltip"]').tooltip();

});