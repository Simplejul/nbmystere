const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

// Nombre mystere
var rand = _.random(0, 9);
var choice;
var essai=0;


app.get('/', (req, res) => res.render('template.pug', {
    chiffre: rand
}));
app.post('/retry', (req, res) => {
    res.redirect('/')
})

app.post('/result', (req, res) => {
    
        essai++;
        choice = req.body.entry;

        if ((rand > choice) && (essai<3)){
            res.render('less.pug', {
                choix: req.body.entry
                })                
        }
        
        if ((rand < choice) && (essai<3)){
            res.render('more.pug', {
                choix: req.body.entry
                })                
        }
        
        if (essai == 3){
            res.render('loose.pug'),
            rand = _.random(0, 9),
            essai = 0    
        }
        
        if (rand == choice){
            res.render('win.pug',{
                choix: req.body.entry,
                rand: rand
            }),
            rand = _.random(0, 9),
            essai = 0 
        }
    }
);


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
    });
app.listen(3000, () => console.log("Server Ready"));

