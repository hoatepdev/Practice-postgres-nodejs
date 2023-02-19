const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "hoatep",
  database: "firstapi",
  port: "5432",
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows[0]);
};

const createUsers = async (req, res) => {
  const { email, name } = req.body;

  const response = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );
  console.log(response);
  res.json({
    message: "User Added Succesfully",
    body: {
      user: { name, email },
    },
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);

  res.json(`User ${id} deteted succesfully`);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.query;

  const response = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id]
  );

  res.send("User Updated Succesfully");
};

module.exports = {
  getUsers,
  createUsers,
  getUserById,
  deleteUser,
  updateUser,
};
