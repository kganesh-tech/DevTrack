const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/problems" , (req,res) => {
    const problemName = req.body.problemName;
    const platform = req.body.platform;
    const difficulty = req.body.difficulty;
    const topic = req.body.topic;
    const status = req.body.status;
    const date = req.body.date;

fs.readFile("problems.json" , "utf-8" , (err,data) => {
    if(err) {
        return res.status(400).json({
            message : "error in reading file"
        })
    }

    const problems = JSON.parse(data);
  problems.push({
    problemName : problemName,
    platform : platform,
    difficulty : difficulty,
    topic : topic,
    status : status,
    date : date
  });

fs.writeFile("problems.json" , JSON.stringify(problems , null , 2) , (err) => {
    if(err) {
        return res.status(400).json({
            message : "error in writing file"
    
           
        })
    }
    return res.status(200).json({
        message : "problems stored successfully"
    });
});
});
});

app.get("/problems" , (req,res) => {

fs.readFile("problems.json" , "utf-8" , (err,data) => {
    if(err) {
        return res.status(400).json({
              message : "error in reading file"
        }) 

        
    }
    const problems = JSON.parse(data);
    console.log(problems);
    res.json(problems);
    
});
});

app.delete("/problems/:index" , (req,res) => {
    const index = Number(req.params.index);

    fs.readFile("problems.json" , "utf-8" , (err,data) => {
        if(err) {
            return res.status(400).json({
                message : "error in reading file"
            })
        }
        const problems = JSON.parse(data);

        if(index  < 0 || index >= problems.length) {
            return 
            res.status(400).json({
                message : "Problem not found"
            })
        }

        problems.splice(index, 1);

        fs.writeFile("problems.json" , JSON.stringify(problems , null , 2) , (err) => {
            if(err) {
                return res.status(400).json({
                    message : "error in writing file"
                })
            }
            return res.status(200).json({
                message : "Problem deleted successfully"
            })
        });
    });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});