if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Inicializamos

const app = express();
require('./database');
 
//settings
app.set('port',3000);

//middkewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req,file,cb){
        cb(null, new Date().getTime()+ path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


//Routes

app.use('/api/books',require('./routes/books'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server

app.listen(app.get('port'), ()=>{
    console.log('server on port',app.get('port'));
})