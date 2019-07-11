var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    console.log(req.url);
    var body = '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.on('data', function (chunk) {
        console.log(chunk);
        body += chunk;
    })
    req.on('end', function () {

        console.log('on end', body);
        //    ------------create--------------
        if (req.url == '/create') {
            console.log('------------create------------')

            fs.readFile('../test.json', 'utf8', function (err, chunk) {
                let currentData = JSON.parse(body)
                currentData['id'] = Date.now()

                temp = []
                if (chunk)
                    temp = JSON.parse(chunk);

                temp.push(currentData);


                fs.writeFile("../test.json", JSON.stringify(temp),
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');

                        }
                        // res.write('create');
                        res.end('created')

                    })


            })

        }
        // -------------create end---------------
        // ------------update start------------
        else if (req.url == '/update') {

            console.log('---------update---------')

            let bodyJson = JSON.parse(body);

            fs.readFile('../test.json', 'utf8', function (err, chunk) {

                let temp = JSON.parse(chunk);
                for (i = 0; i < temp.length; i++) {
                    if (temp[i].id == bodyJson.id) {
                        console.log('inside if', temp[i], bodyJson)
                        temp[i].name = bodyJson['name']
                        temp[i].age = bodyJson['age']
                        temp[i].email= bodyJson['email']
                        break;
                    }
                }
                fs.writeFile("../test.json", JSON.stringify(temp),
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');
                        }
                        res.end('updated')
                    })
            })
        }
        // ----------Update end----------
        // ----------delete start--------
        else if (req.url == '/delete') {


            console.log('---------delete----------')

            fs.readFile('../test.json', 'utf8', function (err, chunk) {
                let temp = JSON.parse(chunk);
                let bodyJson = JSON.parse(body);
                let deleted = [];
                for (i = 0; i < temp.length; i++) {
                    if (temp[i].id == bodyJson.id)
                       
                            deleted = temp.splice(i,1);
                }

                fs.writeFile("../test.json", JSON.stringify(temp),
                    function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('saved success');
                        }
                        res.end(deleted.toString())
                    })




            })
        }
        // -------------delete end------------
        // read 
        else {

            console.log('-----------Read------------')
            //res.write('Read');

            fs.readFile('../test.json', 'utf8', function (err, chunk) {
                console.log('inside read', chunk)
                res.end(chunk)
            })



        }



    })
})
server.listen(4040)
console.log('server started')
