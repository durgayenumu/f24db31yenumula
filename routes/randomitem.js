var express = require('express');
var router = express.Router();

// List of image names (ensure these images exist in the public/images folder)
const image_names = ['image1.jpg','image2.jpg','image3.jpg','image4.jpg','image5.jpg'];

// Generate an array of random images
router.get('/randomitem', (req, res) => {
    let randomImages = [];
    for (let i = 0; i < 3; i++) {  // Show 3 random images
        // const randomIndex = i;
        const randomIndex = Math.floor(Math.random() * image_names.length); // Random index
        randomImages.push(image_names[randomIndex]); // Add random image to the array
    }
    
    res.render('randomitem', { title: 'Random Item', randomImages: randomImages });
});

module.exports = router;