// Importing dotenv to get URL & other app constants from .env file.
require("dotenv").config();

const { writeFile } = require("fs");
const { join } = require("path");
const request = require("request");

// Comment @mapbox/blend - It causing a package issue while installing through NPM. Can be uncomment if you've installed already
//const blend = require('@mapbox/blend');

// Import node's util utility to use promisify function
const util = require("util");

let argv = require("minimist")(process.argv.slice(2));

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

// Build/Define first request URL
const firstReqUrl = {
  // https://cataas.com/cat/says/Hi%20There?width=500&amp;height=800&amp;c=Cyan&amp;s=150
  url:
    process.env.BASE_API_URL +
    "/cat/says/" +
    greeting +
    "?width=" +
    width +
    "&height=" +
    height +
    "&color" +
    color +
    "&s=" +
    size,
  encoding: "binary",
};

// Build/Define second request URL
const secondReqUrl = {
  url:
    process.env.BASE_API_URL +
    "/cat/says/" +
    who +
    "?width=" +
    width +
    "&height=" +
    height +
    "&color" +
    color +
    "&s=" +
    size,
  encoding: "binary",
};

// Define first api request wrap with promise object
firstReq = new Promise(function (resolve, reject) {
  request(firstReqUrl, (err, res, firstBody) => {
    // in addition to parsing the value, deal with possible errors
    if (err) return reject(err);
    try {
      // JSON.parse() can throw an exception if not valid JSON
      resolve(firstBody);
    } catch (e) {
      reject(e);
    }
  });
});

// Define second api request wrap with promise object
secondReq = new Promise(function (resolve, reject) {
  request(secondReqUrl, (err, res, secondBody) => {
    // in addition to parsing the value, deal with possible errors
    if (err) return reject(err);
    try {
      // JSON.parse() can throw an exception if not valid JSON
      resolve(secondBody);
    } catch (e) {
      reject(e);
    }
  });
});

// Blending function to merge 2 images which is revieving from seperate response from catass api.
const blendingImages = (firstBody, secondBody) => {
  blend(
    [
      { buffer: new Buffer(firstBody, "binary"), x: 0, y: 0 },
      { buffer: new Buffer(secondBody, "binary"), x: width, y: 0 },
    ],
    { width: width * 2, height: height, format: "jpeg" },
    (err, data) => {
      const fileOut = join(process.cwd(), `/cat-card.jpg`);

      writeFile(fileOut, data, "binary", (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log("The file was saved!");
      });
    }
  );
};

// Waiting for the first & second promisses to resolve before calling the Blending image function
Promise.all([firstReq, secondReq])
  .then((values) => {
    console.log(
      "All promisses has been resolved. Blending process has been started..."
    );
    console.log(
      "It will call blending function if all the promisses got resolved. If you already installed @mapbox/blend you can uncomment the blendingImages() function to see the result!"
    );
    // It will call blending function if all the promisses got resolved. If you already installed @mapbox/blend you can uncomment it.
    //blendingImages();
  })
  .catch((err) => {
    console.log("Error while resolving request!");
    console.log(err);
  });
