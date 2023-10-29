const path = require('path')
const express = require('express')
const multer = require('multer')
const cors = require('cors')

const app = express()
const PORT = 8000;

//const upload = multer({ dest:"uploads/" })
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads')
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
})
const upload = multer({storage})

app.set('view engine', 'ejs')
//app.set('views', path.resolve('./views'))

app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res)=> {
    return res.render("homepage")
})

app.post('/upload', upload.single('profileImage'), (req, res)=> {
    try {
        console.log(req.body)
        //Store the path to the database
        console.log(req.file)

        return res.redirect("/")
    } catch (error) {
        console.log(error);
        return res.redirect("/")
    }
})

app.listen(PORT, () => console.log(`Server started at port`, PORT))