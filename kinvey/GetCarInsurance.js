function onRequest(request, response, modules) {

  var data = request.body;
  data.__metadata = {
        "#id": "Applicant_id_1",
        "#type": "Applicant"
  };
  var corticonData = {
      "Objects": [data]
  };
  
  //Change URI to your Corticon Endpoint
  var req = modules.request;
  req.post({uri: 'http://06145019.ngrok.io/axis/corticon/execute',
           	body: JSON.stringify(corticonData),
            headers: {"dsName":'CarFlow', "Content-Type":"application/json"}},
           function(error, res, body){
    if (error){
      response.body = {error: error.message};
      response.complete(434);
    } else {
      var respBody = JSON.parse(body);
      response.body = respBody.Objects[0];
      response.complete(res.status);
    }
});
}