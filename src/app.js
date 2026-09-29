import express from "express";
import cors from "cors";
import pool from "./config/database.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

// const testDB = async ()=>{
//   try {
//     await pool.query("SELECT 1");
//     console.log("Kết nối MySQL thành công");
// } catch (error) {
//     console.error("Kết nối MySQL thất bại:", error.message);
// }
// }
// testDB();
app.use("/api/categories", categoryRoutes)
app.use("/api/products", productRoutes)



app.listen(PORT, ()=>{
    console.log(`Bonita Shop API đang chạy tại http://localhost: ${PORT}`)
})
// Khởi động server