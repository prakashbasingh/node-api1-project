const express = require("express");

const server = express();


server.get("/", (req, res) => {
    res.send("<h1>Hello !!! Thi is My First BackEnd Project</h1>")
})


const PORT = 7000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));