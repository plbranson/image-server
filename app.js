/**
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

// Allows access to .env file(s)
require('dotenv').config();

const app = express();

// Body-Parser configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cloudinary configurations
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', function (req, res, next) {
	res.json({ message: 'Hello, World!' });
	next();
});

app.post('/image-upload', function (req, res) {
	// Collected image from User
	const data = {
		image: req.body.image,
	};

	// Uploads the image
	cloudinary.uploader
		.upload(data.image)
		.then(function (result) {
			res.status(200).send({
				message: 'success',
				result,
			});
		})
		.catch(function (error) {
			res.status(500).send({
				message: 'failure',
				error,
			});
		});
});

module.exports = app;
