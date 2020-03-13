# app-nab-server
This is the server section of \"nab\" application.  <br/>
Written using Nodejs.

CORS limitiations forces our application must be located insind an OBIEE server.it is not a good pattern.  <br/>  <br/>

So I started using CORS extension inside google chrome.  <br/>
But it is useful only for calling external API's in the net, not API's located in my loacal network.  <br/>
So I decide to create an application to mimic the behavior of CORS extension in google chrome.  <br/>  <br/>

first of all I think to implement each server function and then I think it is better to implement only a general purpose function which accept an XML as request and then generate XML as respone.  <br/>