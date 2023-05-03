let sendersList = [];
let gmailClient;
let keepList = [];
let deleteList = [];
let currentIndex = 0;
let collegeNameElement = document.getElementById("college_name");
let yesButtonElement = document.getElementById("yes_button");
let noButtonElement = document.getElementById("no_button");

let API_KEY;
let CLIENT_ID;

fetch('/api-key')
.then(response => response.text())
.then(apiKey => {
  API_KEY = apiKey;
})
.catch(error => console.error(error));

fetch('/client-id')
.then(response => response.text())
.then(clientID => {
  CLIENT_ID = clientID;
})
.catch(error => console.error(error));


const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', "https://mail.google.com/", "https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.settings.basic"];

let tokenClient;
let gapiInited = false;
let gisInited = false;


// document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

var currentLabelID = "Label_1";
const labelName = 'University Test';


/**
* Callback after api.js is loaded.
*/
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
  
  
  // Get the Gmail API client object
}

/**
* Callback after the API client is loaded. Loads the
* discovery doc to initialize the API.
*/
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  gmailClient = gapi.client.gmail;
  
  maybeEnableButtons();
}


/**
* Callback after Google Identity Services are loaded.
*/
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}


/**
* Enables user interaction after all libraries are loaded.
*/
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}


/**
*  Sign in the user upon button click.
*/
async function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    
    listSenders();
    setTimeout(() => { displayCollegeName(); }, 5000);
    
    
  };
  
  
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
  
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
  reloadPage()
}


function listSenders() {
  // Load the Gmail API
  gapi.client.load('gmail', 'v1', function() {
    // Use the "University" label as an example
    var labelName = "Career/University";
    
    // Get the label ID for the given label name
    var request = gapi.client.gmail.users.labels.list({
      userId: 'me'
    });
    request.execute(function(response) {
      var labels = response.labels;
      for (var i = 0; i < labels.length; i++) {
        if (labels[i].name == labelName) {
          var labelId = labels[i].id;
          break;
        }
      }
      
      // Get the messages with the given label ID
      var request = gapi.client.gmail.users.messages.list({
        userId: 'me',
        labelIds: labelId
      });
      request.execute(function(response) {
        var messages = response.messages;
        for (var i = 0; i < messages.length; i++) {
          var request = gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: messages[i].id
          });
          request.execute(function(response) {
            var headers = response.payload.headers;
            for (var j = 0; j < headers.length; j++) {
              if (headers[j].name == "From") {
                
                sendersList.push(headers[j].value)
                console.log(headers[j].value);
                
                sendersList = [...new Set(sendersList)];
                
                break;
              }
            }
          });
        }
      });
    });
  });
}


function displayCollegeName() {
  console.log(currentIndex);
  if (currentIndex < sendersList.length) {
    collegeNameElement.innerText = sendersList[currentIndex];
  } else {
    collegeNameElement.innerText = "No more colleges!";
    yesButtonElement.disabled = true;
    noButtonElement.disabled = true;
  }
}


function addToKeepList() {
  keepList.push(sendersList[currentIndex]);
  currentIndex++;
  displayCollegeName(); 
}


function addToDeleteList() {
  deleteList.push(sendersList[currentIndex]);
  currentIndex++;
  displayCollegeName();
}


function deleteEmails() {
  gapi.client.load('gmail', 'v1', function() {
    const label = 'Career/University';
    const query = `label:${label}`;
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'q': query
    }).then(function(response) {
      const messages = response.result.messages;
      const idMap = {};
      messages.forEach(function(message) {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': message.id
        }).then(function(messageResponse) {
          const headers = messageResponse.result.payload.headers;
          headers.forEach(function(header) {
            if (header.name === 'From') {
              deleteList.forEach(function(email) {
                if (header.value.indexOf(email) !== -1) {
                  idMap[message.id] = true;
                }
              });
            }
          });
          const ids = Object.keys(idMap);
          console.log(ids);
          console.log(messages);
          
          const batch = gapi.client.newBatch();
          ids.forEach(function(id) {
            batch.add(gapi.client.gmail.users.messages.batchDelete({
              'userId': 'me',
              'ids': [id]
            }));
          });
          batch.execute(function() {
            console.log(`All messages from ${deleteList} have been deleted.`);
          });
          
        });
      });
    });
  });
}
gapiLoaded()
initializeGapiClient()
gisLoaded()

yesButtonElement.addEventListener("click", addToKeepList);
noButtonElement.addEventListener("click", addToDeleteList);

