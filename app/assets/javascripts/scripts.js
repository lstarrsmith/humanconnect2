console.log("loaded")

window.onload = function() {
            
            // for all data just sent from server
           
            // var humanapi_data = <%=raw(humanapi_data.to_json)%>
            var connectBtn = document.getElementById('connect-health-data-btn');
            
        
            connectBtn.addEventListener('click', function(e) {
             
              var option1 = {
                      clientId: humanapi_data[3].clientId,
                      // can be email or any other internal id of the user in your system
                      clientUserId: humanapi_data[5].email,
                      finish: function(err, sessionTokenObject) {
                      	console.log(sessionTokenObject)
                  
                          	$.ajax({
                          		url: '/apis/query',
                          		method: 'POST',
                          		data: {sessionTokenObject: sessionTokenObject, client_secret: humanapi_data[4].client_secret, user_id: humanapi_data[2].user_id}
                          	}).done(function(data){})
                      },
                      close: function() {
                        // do something here when user just closed popup
                        // `close` callback function is optional
                      }
              };

              var option2 = {
                    publicToken: humanapi_data[0].publicToken, 
                    clientUserId: encodeURIComponent(humanapi_data[5].email), 
                    close: function() {
                      // optional callback that will be called if the user closes the popup 
                      // without connecting any data sources.
                    },
                    error: function(err) {
                      // optional callback that will be called if an error occurs while 
                      // loading the popup.
                      
                      // `err` is an object with the fields: `code`, `message`, `detailedMessage`
                     } 
              }

              if (humanapi_data[0].publicToken == null) {
                    HumanConnect.open(option1);
              } else {
                HumanConnect.open(option2);
             }
          
            });


          $('.display_data').on('click', function() {
              $.ajax({
                url: '/users/' + humanapi_data[2].user_id + '/step',
                method: 'GET'
              }).done(function(data){
                  var i;
                  $('body').append("<ul class='step_data'></ul>")
                        for (i=0; i<data.length; i++) {
                          $('ul').append("<li>" + data[i].distance + ", " + data[i].startTime + ", " + data[i].endTime + '</li>')
                        }   
              })
          })

          $('.location').on('click', function() {
            $.ajax({
              url: '/users/' + humanapi_data[2].user_id + '/location',
              method: 'GET'
            }).done(function(data){
              $('.step_data').remove()
                  var i;
                  $('body').append("<ul class='location_data'></ul>")
                  
                  for (i=0; i<data.length; i++) {
                      $('ul').append("<li>" + data[i].name + ", " + data[i].startTime + ", " + data[i].endTime + '</li>')
                  }   
            })
          })

          
 }