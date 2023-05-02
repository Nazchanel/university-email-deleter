function createLabel() {
    var label = {
        'name': 'University Test'
    };
    
    gapi.client.gmail.users.labels.create({
        'userId': 'me',
        'resource': label
    }).then(function(response) {
        console.log('Label created: ' + response.result.id);
        currentLabelID = response.result.id;
    }, function(error) {
        console.error(error);
    });
}


function listLabels() {
    gapi.client.gmail.users.labels.list({
        'userId': 'me'
    }).then(function(response) {
        var labels = response.result.labels;
        labels.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });
        console.log('Labels:');
        for (var i = 0; i < labels.length; i++) {
            console.log(labels[i].name + ' (' + labels[i].id + ')');
        }
    }, function(error) {
        console.error(error);
    });
}