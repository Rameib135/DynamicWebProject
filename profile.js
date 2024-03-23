// Student names: RAME IBRAHEM, ALI KHATIB, RAHAF ABABSI
// Date: 29/02/2024
// Description: NodeJS code for generating a profile website.

// Importing required modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Creating an Express application
const app = express();

// Setting the view engine to EJS
app.set('view engine', 'ejs');
// Setting the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Setting up the public directory to serve static files
app.use('/profile', express.static(path.join(__dirname, 'public')));



// Handling requests to the /profile route
app.get('/profile', function(req, res) {
    // Extracting the id parameter from the query string
    let id = req.query.id;

    // Checking if the id parameter is present
    if (id) {
        // Constructing the paths for public and private directories
        let publicPath = path.join(__dirname, 'public', id);
        let privatePath = path.join(__dirname, 'private', id);
   

        // Reading profile information from files
        let bio = fs.readFileSync(path.join(privatePath, 'bio.txt'), 'utf8');
        let title = fs.readFileSync(path.join(privatePath, 'title.txt'), 'utf8');


            // Extracting each line of bio and title
            let bioLines = bio.split('\n');
            let titleLines = title.split('\n');

        
        let texts = [];
        let authors = [];

        let files = fs.readdirSync(privatePath);



        for (let file of files) {
            if (file.startsWith('text')) {
                let textContent = fs.readFileSync(path.join(privatePath, file), 'utf8');
                

                // Extracting only the first line from the text content
                let lines = textContent.split('\n');
                let firstLine = lines[0];
                texts.push(firstLine);
        
                // Extracting author name from the last line of text content
                //let lines = textContent.split('\n');
                let author = lines[lines.length - 1];
                authors.push(author);
            }
        }
        
                // Sending the HTML response with the profile information
                res.render('profile', { id: id, bioLines: bioLines, titleLines: titleLines, texts: texts, authors: authors});


                  


    } else {
        // If id parameter is not present, send an error response
        res.status(400).send('Bad Request: Profile id is missing');
    }
});

// Listening on port 4006
app.listen(4009, function() {
    console.log('Server is running on port 4009');
});