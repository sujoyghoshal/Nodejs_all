const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const staticpath = path.join(__dirname, "./welcome.html");
app.use(express.urlencoded({ extended: true }))
app.use(express.static('.'));
const port = process.env.port || 3000;
app.get("/login", (req, res) => {
    //console.log(req.query);
    res.send(`<h3>Username</h3>${req.query.Name} <h3>password</h3>${req.query.Pass}`);
})
app.post("/login", (req, res) => {
    fs.readFile('./user.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            let objdata = JSON.parse(data);
            let newdata = objdata.filter((item) => {
                if (item.username == req.body.Name && item.password == req.body.Pass) {
                    return true;
                }
            })
            if (newdata.length == 0) {
                res.send("<h2>/inavlid username/password</h2>");
            }
            else {
                // res.send("Welcome correct");
                res.sendFile(staticpath);
            }
        }
    })
})
app.post('/singup', (req, res) => {
    fs.readFile('./user.txt', "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            //console.log(data);
            const x = JSON.parse(data);
            x.push(req.body);
            console.log(x);
            // dukabo user txt ta
            const datababu = JSON.stringify(x);
            fs.writeFileSync('./singup.txt', datababu);
            res.send('chake it singup.txt file ')
        }
    })
})
app.listen(port, (err) => {
    console.log(`Running the port ${port}`);
}) 