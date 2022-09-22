
# Cat Card Application - Gapstars Test 

This is a test project (Cat Card Application) for part of Gapstars technical assignment. It's based on javascript/node express technologies.
It uses Cat as a Service (https://cataas.com) and does the following:
1. Fetches an image of a cat with some custom text
2. Fetches an image of another cat with some more custom text 3. Binds these images together into one image
4. Saves the resulting image as a file





## API Reference

#### Base API Url
  https://cataas.com

#### Get first & second cat image using the catass web api service

```https
  GET /cat/says/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `text` | `string` | Hi there |
| `width` | `int`   | 800 |
| `height` | `int` | 600 |
| `color` | `string` | Cyan |



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BASE_API_URL='https://cataas.com'`


## Features

- Fetches an image of a cat with some custom text
- Fetches an image of another cat with some more custom text 3. Binds these images together into one image
- Saves the resulting image as a file
## Installation

Install Cat Card Application with npm

```bash
  cd Your cloned path/Gapstars_Shiyad
  npm install
  npm run dev
```
    
## Installed Packages/Prerequisites

- `"dotenv": "^16.0.2"`
- `"express": "^4.18.1"`
- `"minimist": "^1.2.6"`
- `"nodemon": "^2.0.19"`
- `"request": "^2.88.2"`


## NotInstalled/Failed Packages

- @mapbox/blend

## Issues / Challanges

mapbox/blend not installed because of the package issue which showed that in-built aws-s3 file storage permission got access denied.
node-pre-gyp ERR! install response status 403 Forbidden on https://mapbox-node-binary.s3.amazonaws.com/mapnik/v4.5.9/Release/win32-x64.tar.gz


## Github Clone Path

- https://github.com/shiyad/Gapstars_Shiyad.git

## Authors

- [@shiyad_ismail](https://github.com/shiyad)

