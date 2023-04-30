
    // Define the search query to find the emails you want to move
    const searchQuery1 = 'label:career-university from:University';
    const searchQuery2 = 'label:career-university from:Admission';
    const searchQuery3 = 'label:career-university from:Admissions';

    // Define a function to move the matching emails to the label
    function moveEmailsToLabel1() {
        // Search for the matching emails
        const request = gmailClient.users.messages.list({
          'userId': 'me',
          'q': searchQuery1
        });
      
        request.execute(function(response) {
          // Check if any matching emails were found
          if (response.resultSizeEstimate > 0) {
            // Get the ID of the label to move the emails to
            const labelRequest = gmailClient.users.labels.list({
              'userId': 'me'
            });
      
            labelRequest.execute(function(labelResponse) {
              const labels = labelResponse.labels;
              let labelId = null;
      
              // Find the ID of the label with the given name
              for (let i = 0; i < labels.length; i++) {
                if (labels[i].name === labelName) {
                  labelId = labels[i].id;
                  break;
                }
              }
      
              // Move the matching emails to the label with a delay
              for (let i = 0; i < response.messages.length; i++) {
                const message = response.messages[i];
                setTimeout(function() {
                  const request = gmailClient.users.messages.modify({
                    'userId': 'me',
                    'id': message.id,
                    'addLabelIds': [labelId],
                    'removeLabelIds': ['INBOX']
                  });
      
                  request.execute(function() {
                    console.log('Email moved to label: ' + labelName);
                  });
                }, i * 500); // Add a delay of 1 second for each email
              }
            });
          } else {
            console.log('No matching emails found');
          }
        });
      }
      
      function moveEmailsToLabel2() {
        // Search for the matching emails
        const request = gmailClient.users.messages.list({
          'userId': 'me',
          'q': searchQuery2
        });
      
        request.execute(function(response) {
          // Check if any matching emails were found
          if (response.resultSizeEstimate > 0) {
            // Get the ID of the label to move the emails to
            const labelRequest = gmailClient.users.labels.list({
              'userId': 'me'
            });
      
            labelRequest.execute(function(labelResponse) {
              const labels = labelResponse.labels;
              let labelId = null;
      
              // Find the ID of the label with the given name
              for (let i = 0; i < labels.length; i++) {
                if (labels[i].name === labelName) {
                  labelId = labels[i].id;
                  break;
                }
              }
      
              // Move the matching emails to the label with a delay
              for (let i = 0; i < response.messages.length; i++) {
                const message = response.messages[i];
                setTimeout(function() {
                  const request = gmailClient.users.messages.modify({
                    'userId': 'me',
                    'id': message.id,
                    'addLabelIds': [labelId],
                    'removeLabelIds': ['INBOX']
                  });
      
                  request.execute(function() {
                    console.log('Email moved to label: ' + labelName);
                  });
                }, i * 500); // Add a delay of 1 second for each email
              }
            });
          } else {
            console.log('No matching emails found');
          }
        });
      }
      
      function moveEmailsToLabel3() {
        // Search for the matching emails
        const request = gmailClient.users.messages.list({
          'userId': 'me',
          'q': searchQuery3
        });
      
        request.execute(function(response) {
          // Check if any matching emails were found
          if (response.resultSizeEstimate > 0) {
            // Get the ID of the label to move the emails to
            const labelRequest = gmailClient.users.labels.list({
              'userId': 'me'
            });
      
            labelRequest.execute(function(labelResponse) {
              const labels = labelResponse.labels;
              let labelId = null;
      
              // Find the ID of the label with the given name
              for (let i = 0; i < labels.length; i++) {
                if (labels[i].name === labelName) {
                  labelId = labels[i].id;
                  break;
                }
              }
      
              // Move the matching emails to the label with a delay
              for (let i = 0; i < response.messages.length; i++) {
                const message = response.messages[i];
                setTimeout(function() {
                  const request = gmailClient.users.messages.modify({
                    'userId': 'me',
                    'id': message.id,
                    'addLabelIds': [labelId],
                    'removeLabelIds': ['INBOX']
                  });
      
                  request.execute(function() {
                    console.log('Email moved to label: ' + labelName);
                  });
                }, i * 500); // Add a delay of 1 second for each email
              }
            });
          } else {
            console.log('No matching emails found');
          }
        });
      }
      