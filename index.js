

const express = require("express");
const shortid = require("shortid");

const server = express();

//it teaches how to read JSON from req.body
server.use(express.json()) // it is used in line 29(const newUser = req.body)

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
]

server.get("/", (req, res) => {
    res.send("<h1>Hello !!! I am Prakash and This is My First BackEnd Project.</h1>")
})

server.post("/api/users", (req, res) => {
    const newUser = req.body // it needs express.json() middleware and stated in line 8(server.use(express.json()))
    newUser.id = shortid.generate();
    users.push(newUser);

    if(newUser){
           if(newUser.name && newUser.bio){
            res.status(201).json(newUser)
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } 
    } else {
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }
})

server.get("/api/users", (req, res) => {
    if (users){
        res.status(200).json(users)
    }else {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    const getById = users.find(user => user.id === id)
    if(getById){
        res.status(200).json(getById)
    } else {
        res.status(404).send({message: "The user with the specified ID does not exist."})
    }
})

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const deleted = users.find(user => user.id === id);
    users = users.filter(user => user.id !== id);
    
    if(deleted){
        res.status(200).json(deleted)
    } else if (!deleted){
        return res.status(404).json({message: "The user with the specified ID does not exist."})       
    } else {
        res.status(500).json({errorMessage: "The user could not be removed"})
    }


    // try{
    //     const id = req.params.id;
    //     const deleted = users.find(user => user.id === id);
    //     if(!deleted){
    //             return res.status(404).json({message: "The user with the specified ID does not exist."})
    //         }
    //     users = users.filter(user => user.id !== id);
    //     res.status(200).json(deleted)
    // }catch (err){
    //     res.status(500).json({errorMessage: "The user could not be removed"})
    // }
})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = users.find(user => user.id === id)

    if(found) {
        Object.assign(found, changes);
        res.status(200).json(found)
    } else if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    } else if (!changes) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else {
        res.status(500).json({errorMessage: "The user information could not be modified."})
    }
})






const PORT = 9000;// we visit http://localhost:9000/ to see the api
server.listen(PORT, () => console.log(`server running on port ${PORT}`));




// console.log("server running.....");