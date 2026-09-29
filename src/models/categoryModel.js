import pool from "../config/database.js";

const getAllCategories = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, slug
         FROM categories
         ORDER BY id ASC`,
  );
  return rows;
};

const createCategory = async (name, slug) => {
  //tao danh muc, them vao mysql
  const [result] = await pool.query(
    `INSERT INTO categories(name, slug)
        VALUES (?,?)
        `,
    [name, slug],
  );
  return {
    id: result.insertId,
    name,
    slug,
  };
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug
        FROM categories
        WHERE id = ?
        `,
    [id],
  );
  return rows[0];
};

const updateCategory = async (id, name, slug) => {
  const [result] = await pool.query(
    `UPDATE categories
        SET name =?, slug = ?
        WHERE id = ?
        `,
    [name, slug, id],
  );
  return result.affectedRows;
};

const deleteCategory = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM categories
     WHERE id = ?
    `,
    [id],
  );
  return result.affectedRows;
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
