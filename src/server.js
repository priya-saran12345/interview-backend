const express = require("express");
const swaggerUi = require("swagger-ui-express");
const db = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const swaggerSpec = require("./config/swagger");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.get("/", async(req,res)=>{
    try{

        const result = await db.query(
            "SELECT NOW()"
        );
        res.json({
            time: result.rows[0]
        });
    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }
});
app.listen(5000,()=>{
console.log("Server running on 5000");
});
