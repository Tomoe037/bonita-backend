import pool from "../config/database.js";

const getAllProducts = async () => {
  const [rows] = await pool.query(`
    SELECT
  p.id,
  p.category_id,
  c.name AS category_name,
  p.name,
  p.slug,
  p.description,
  p.price,
  p.original_price,
  p.stock,
  p.image_url,
  p.status,
  p.is_featured,
  p.created_at,
  p.updated_at
FROM products AS p
JOIN categories AS c
  ON p.category_id = c.id
ORDER BY p.id DESC
    `);
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
  p.id,
  p.category_id,
  c.name AS category_name,
  p.name,
  p.slug,
  p.description,
  p.price,
  p.original_price,
  p.stock,
  p.image_url,
  p.status,
  p.is_featured,
  p.created_at,
  p.updated_at
FROM products AS p
JOIN categories AS c
  ON p.category_id = c.id
WHERE p.id = ?
`,
    [id],
  );
  return rows[0];
};

const createProduct = async (productData) => {
  const {
    category_id,
    name,
    slug,
    description,
    price,
    original_price,
    stock,
    image_url,
    status,
    is_featured,
  } = productData;
  const [result] = await pool.query(`
    INSERT INTO products (
     category_id,
        name,
        slug,
        description,
        price,
        original_price,
        stock,
        image_url,
        status,
        is_featured
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
 [
      category_id,
      name,
      slug,
      description,
      price,
      original_price,
      stock,
      image_url,
      status,
      is_featured,
    ]
);
return {
    id: result.insertId,
  ...productData,
  };
};

const updateProduct = async (id, productData) =>{
    const {
    category_id,
    name,
    slug,
    description,
    price,
    original_price,
    stock,
    image_url,
    status,
    is_featured,
  } = productData;

     const [result] = await pool.query(
    `UPDATE products
    SET
      category_id = ?,
        name = ?,
        slug = ?,
        description = ?,
        price = ?,
        original_price = ?,
        stock = ?,
        image_url = ?,
        status = ?,
        is_featured = ?
        WHERE id = ?
        `,
     [
      category_id,
      name,
      slug,
      description,
      price,
      original_price,
      stock,
      image_url,
      status,
      is_featured,
      id,
    ],
  );
  return result.affectedRows;
};

const deleteProduct = async (id) =>{
    const [result] = await pool.query(
    `DELETE FROM products
     WHERE id = ?
    `,
    [id]
  );
  return result.affectedRows;

}

export { getAllProducts, getProductById ,createProduct, updateProduct, deleteProduct};
