import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../models/productModel.js";

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách sản phẩm",
    });
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      success: true,
      message: "đã tìm thấy sản phẩm",
      data: product,
    });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể lấy sản phẩm",
    });
  }
};

const createProductController = async (req, res) => {
  try {
    const category_id = req.body.category_id;
    const name = req.body.name;
    const slug = req.body.slug;
    const price = req.body.price;

    const description = req.body.description ?? null;
    const original_price = req.body.original_price ?? null;
    const stock = req.body.stock ?? 0;
    const image_url = req.body.image_url ?? null;
    const status = req.body.status ?? "ACTIVE";
    const is_featured = req.body.is_featured ?? false;
    //     const {
    //   category_id,
    //   name,
    //   slug,
    //   description = null,
    //   price,
    //   original_price = null,
    //   stock = 0,
    //   image_url = null,
    //   status = "ACTIVE",
    //   is_featured = false,
    // } = req.body;

    if (!category_id || !name || !slug || price == null) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập category_id, name, slug và price",
      });
    }
    const productData = {
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
    };
    const newProduct = await createProduct(productData);
    return res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Slug sản phẩm đã tồn tại",
      });
    }
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Không thể tạo sản phẩm",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const category_id = req.body.category_id;
    const name = req.body.name;
    const slug = req.body.slug;
    const price = req.body.price;

    const description = req.body.description ?? null;
    const original_price = req.body.original_price ?? null;
    const stock = req.body.stock ?? 0;
    const image_url = req.body.image_url ?? null;
    const status = req.body.status ?? "ACTIVE";
    const is_featured = req.body.is_featured ?? false;
    if (!category_id || !name || !slug || price == null) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập category_id, name, slug và price",
      });
    }
    const productData = {
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
    };

    const affectedRows = await updateProduct(id, productData);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm theo id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: {
        id: Number(id),
        ...productData,
      },
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Slug sản phẩm đã tồn tại",
      });
    }
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Không thể Cập nhật sản phẩm",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const affectedRows = await deleteProduct(id);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm theo id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);

    // nếu sản phẩm đã xuất hiện trong đơn hàng
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        success: false,
        message: "Không thể xóa sản phẩm vì sản phẩm đã có trong đơn hàng",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Không thể xóa sản phẩm",
    });
  }
};

export {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
};
