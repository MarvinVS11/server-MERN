const express= require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
const {API_VERSION}= require("./constants");
const app= express();

//Importing Routing
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newsletter");
//Configure Body Parser
app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Congigure Header HTTP - CORS
app.use(cors());

//Configure routing
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);
app.use(`/api/${API_VERSION}`, newsletterRoutes);


module.exports= app;
