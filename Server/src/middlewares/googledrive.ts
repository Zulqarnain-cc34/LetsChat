//import { google } from "googleapis";
////import fs from "fs";
//import { OAuth2Types } from "../types";
//import OAuth2Data from "../credentials.json";

////importing the credentials.json file to read the data and making it type safe
////OAuth2 the interface type safe check for OAuth2Data
//const GoogleAuthentication: OAuth2Types = OAuth2Data;

////Client id of google account to access te google drive
////Configuration
//const CLIENT_ID = GoogleAuthentication.web.client_id;

////Client secret of google account to access te google drive
//const CLIENT_SECRET = GoogleAuthentication.web.client_secret;

////Redirect uris of google account to access te google drive
//const REDIRECT_URI = GoogleAuthentication.web.redirect_uris[0];

////Making a client object to with given data
//export const OAuth2Client = new google.auth.OAuth2(
//    CLIENT_ID,
//    CLIENT_SECRET,
//    REDIRECT_URI
//);

//export const SCOPES =
//    "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";
