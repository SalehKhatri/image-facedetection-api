/* 
post--->Post aur insert a data
put---->Updates an existing data
get---->fetch a data from database or server
delete->Delete a data

/--->This is working
/signin---->post = Success/fail
/register--->Post = user
/profile/:user---> Get = user
/image---->put--->
*/
const express = require('express');
const bodyParser = require('body-parser') //use to read json files
const bcrypt = require('bcrypt');
const saltRounds = 10;//required to use bcrypt
const cors = require('cors');//if we don't include this in our server chrome gives security error
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app=express();
app.use(bodyParser.json());
app.use(cors());


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '29january',
    database : 'face_recognition'
  }
});
  

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req, res)=>{register.handleRegister(req, res,db,bcrypt,saltRounds)})

app.post('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})


app.listen(3000,()=>{
  console.log("App is running.....");
})