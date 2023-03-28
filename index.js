const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

//Conexión a la base de datos
connection();

//Creando servidor en Node
const app = express();
const port = 3001;

//Configurando servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", routes);

app.listen(port,()=>{
    console.log("Servidor en el puerto "+ port);
});

