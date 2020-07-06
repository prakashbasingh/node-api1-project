

const express = require("express");
const shortid = require("shortid");

const server = express();

//it teaches how to read JSON from req.body
server.use(express.json()) // it is used in line 29(const newUser = req.body)

let users = [
    {
        id: shortid.generate(),
        name: "P Bahadur S",
        bio: "A Web Dev Student at Lambda School",
    },
    {
        id: shortid.generate(),
        name: "B Lama S",
        bio: "A Medical Billing and Coding Student at DeVry University"
    }
]


server.get("/", (req, res) => {
    res.send("<h1>Hello !!! I am Prakash and This is My First BackEnd Project.</h1>")
})



server.post("/api/users", (req, res) => {
    const newUser = req.body // it needs express.json() middleware and stated in line 8(server.use(express.json()))
    newUser.id = shortid.generate();
    users.push(newUser);
    res.status(400).json(newUser)
})

server.get("/api/users", (req, res) => {
    res.json(users)
})





const PORT = 9000;// we visit http://localhost:9000/ to see the api
server.listen(PORT, () => console.log(`server running on port ${PORT}`));




// console.log("server running.....");