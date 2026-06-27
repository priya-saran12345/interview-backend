const db = require("../config/db");
const createUser = async(userData)=>{
    const query = `
    INSERT INTO signup
    (
        full_name,
        email,
        phone_number,
        password_hash,
        college_name,
        course,
        branch,
        passing_year
    )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `;
    const result = await db.query(query,userData);
    return result.rows[0];
};
const findUserByEmail = async(email)=>{
    const result = await db.query(
        "SELECT * FROM signup WHERE email=$1",
        [email]
    );
    return result.rows[0];
};

module.exports = {

    createUser,
    findUserByEmail

};