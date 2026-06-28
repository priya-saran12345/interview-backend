const express = require("express");

const router = express.Router();


const {
signup

}=require("../controllers/authController");
const {
login
}=require("../controllers/authController");

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new student account
 *     description: Student signup API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Priya Saran
 *               email:
 *                 type: string
 *                 example: priya@gmail.com
 *               phone_number:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               college_name:
 *                 type: string
 *                 example: ABC College
 *               course:
 *                 type: string
 *                 example: B.Tech
 *               branch:
 *                 type: string
 *                 example: CSE
 *               passing_year:
 *                 type: integer
 *                 example: 2026
 *
 *     responses:
 *       201:
 *         description: Signup successful
 *
 *       400:
 *         description: Email already exists
 *
 */


router.post(
"/signup",
signup
);
router.post("/login", login);



module.exports=router;