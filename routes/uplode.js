const multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'front-end/src/images/avatars')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage })
module.exports = (app) => {
    app.post('/upload', upload.single('image'), (req, res) => {
 
        if (req.file){
          res.json({
            imageUrl: `${req.file.filename}`
          });
         
         res.set(req.file.filename);
        }
        else 
          res.status("409").json("No Files to Upload.")
        
      });    
}