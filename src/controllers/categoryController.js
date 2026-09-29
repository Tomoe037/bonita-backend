import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../models/categoryModel.js";

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Lỗi lấy danh mục:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể lấy danh sách danh mục",
    });
  }
};

const createCategoryController = async (req, res) => {
  try {
    const name = req.body.name;
    const slug = req.body.slug;
    // const {name, slug} = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ name và slug",
      });
    }

    const newCategory = await createCategory(name, slug);
    return res.status(201).json({
      success: true,
      message: "Tạo danh mục thành công",
      data: newCategory,
    });
  } catch (error) {
    console.error("Lỗi tạo danh mục:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể tạo danh mục",
    });
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      success: true,
      message: "đã tìm thấy danh mục",
      data: category,
    });
  } catch (error) {
    console.error("Lỗi lấy danh mục theo ID:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể lấy danh mục",
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const slug = req.body.slug;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ name và slug",
      });
    }
    const affectedRows = await updateCategory(id, name, slug);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục theo id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: {
        id: Number(id),
        name,
        slug,
      },
    });
  } catch (error) {
    console.error("Lỗi thay đổi danh mục theo ID:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể cập nhật danh mục",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const affectedRows = await deleteCategory(id);
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục theo id",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa danh mục theo ID:", error);
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(409).json({
        success: false,
        message:
          "Không thể xóa danh mục vì vẫn còn sản phẩm thuộc danh mục này",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Không thể xóa danh mục",
    });
  }
};

export {
  getAllCategoriesController,
  createCategoryController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
};
