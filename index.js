
// Importing dotenv to get URL & other app constants from .env file.
require('dotenv').config();

const { writeFile } = require('fs');
const { join } = require('path');
const request = require('request');

// Comment @mapbox/blend - It causing a package issue while installing through NPM. Can be uncomment if you've installed already
//const blend = require('@mapbox/blend');

// Import node's util utility to use promisify function
const util = require('util');

let argv = require('minimist')(process.argv.slice(2));

let {
    greeting = 'Hello', who = 'You',
    width = 400, height = 500, color = 'Pink', size = 100,
} = argv;


// Build/Define first request URL
const firstReqUrl = {
    // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
    url: process.env.BASE_API_URL + '/cat/says/'
        + greeting + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
    encoding: 'binary'
};

// Build/Define second request URL
const secondReqUrl = {
    url: process.env.BASE_API_URL + '/cat/says/'
        + who + '?width=' + width + '&height=' + height + '&color' + color + '&s=' + size,
    encoding: 'binary'
};

// Define first api request
const firstReq = () => {
    return request.get(firstReqUrl, (err, res, firstBody) => {
        if (err) {
            console.log('First request error--------------');
            console.log(err);
            return;
        }

        console.log('Received first response with status:' + res.statusCode);
    });
}

// Define second api request
const secondReq = () => {
    return request.get(secondReqUrl, (err, res, secondBody) => {
        if (err) {
            console.log('Second request error--------------');
            console.log(err);
            return;
        }

        console.log('Received second response with status:' + res.statusCode);
    });
}

// Blending function to merge 2 images which is revieving from seperate response from catass api.
const blendingImages = () => {
    blend([
        { buffer: new Buffer(firstBody, 'binary'), x: 0, y: 0 },
        { buffer: new Buffer(secondBody, 'binary'), x: width, y: 0 }
    ],
        { width: width * 2, height: height, format: 'jpeg', },
        (err, data) => {
            const fileOut = join(process.cwd(), `/cat-card.jpg`);

            writeFile(fileOut, data, 'binary', (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log("The file was saved!");
            });
        });
}


// Converting normal function to promise for make promise chain
const requestFirstPromise = util.promisify(firstReq);
const requestSecondPromise = util.promisify(secondReq);

// Calling promises to check whether it's resolving or rejecting can comment it
requestFirstPromise.call(firstReq).then((a) => console.log(a));
requestSecondPromise.call(secondReq).then((a) => console.log(a));

Promise.all([requestFirstPromise, requestSecondPromise]).then((response) => {
    console.log(response);
    console.log('All responses has been resolved. Blending process has been started...');

    // It will call blending function if all the promisses got resolved. If you already installed @mapbox/blend you can uncomment it.
    //blendingImages();

}).catch((err) => {
    console.log('Error while resolving request!');
    console.log(err);
});