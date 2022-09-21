const static = require('node-static');
 
const fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
       const url = request.url;
       console.log(url);
            switch(url){
                case '/': 
                    fileServer.serve(request, response);
                break;
                case '/cari':
                    //specific html pages
                    fileServer.serveFile('search.html', 200, {}, request, response);
                    break;
                default:
                fileServer.serve(request, response, function (e, res) {
                    if (e && (e.status === 404)) { // If the file wasnt found, redirect.
                        fileServer.serveFile(      // Also load assets (js, css, img, etc.)
                            '/not-found.html', 404, {}, request, response
                        );
                    }
                });
            };
    }).resume();
}).listen(8080);
console.log(`Server listening on http://127.0.0.1:8080`)
