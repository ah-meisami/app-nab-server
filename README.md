# app-nab-server
This is the server section of \"nab\" application.
Written using Nodejs.

CORS limitiations our app must be located insind an OBIEE server.it is not a good pattern. \\

So I started using CORS extension inside google chrome.\
It is useful only for external website, not API's located in my loacal network.\
So I decide to create an application to mimik the behavior of CORS extension in google chrome.\\

first of all I think to implement each server function and then I think it is better to implement only a general purpose function which accept an XML as request and then generate XML as respone.\