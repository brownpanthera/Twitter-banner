const {generateImage} = require('./lib/canvas');
const {uploadImage} = require('./lib/upload');


generateImage(128).then(()=>{
    uploadImage();
})
