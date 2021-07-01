const express=require('express');
const path=require('path');
const app = express();
const port=80;


// importing mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dance_academy', {useNewUrlParser: true, useUnifiedTopology: true});


// // making connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // connected!
// });


// making schema
const myschema = new mongoose.Schema({
    name: String,
    email:String,
    number:String,
    add: String,
    concern: String
  });


// making model of our schema
const contact = mongoose.model('conatct_us_form', myschema);


// EXPRESS
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded({ extended: true }));


// PUG Configuration
app.set('view engine','pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //  set the views directory


// END pOINTS
app.get('/',(req, res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req, res)=>{
    res.status(200).render('contact.pug');
})


// post request form the contact form
app.post('/contact',(req, res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been send to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})





// START THE SERVER
app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`)
});


