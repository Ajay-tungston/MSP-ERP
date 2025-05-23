const Item = require("../../../models/Item");
const validator=require("validator")

const itemNameRegex = /^[a-zA-Z0-9\s]+$/;

const addItem = async (req, res) => {
  try {
    const { itemCode, itemName,conversionRatio } = req.body;
    if (!itemCode || !itemName) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingItem = await Item.findOne({
      $or: [{ itemCode }, { itemName }],
    });

    if (existingItem) {
      return res.status(400).json({
        message: "An item with the same code or name already exists",
      });
    }
    if (
      !validator.isAlphanumeric(itemCode) ||
      itemCode.length < 3 ||
      itemCode.length > 10
    ) {
      return res.status(400).json({
        message:
          "item code must be alphanumeric and between 3 and 10 characters long",
      });
    }
    if (!itemNameRegex.test(itemName)) {
      return res.status(400).json({
        message: "Item name must contain only letters, numbers, and spaces",
      });
    }
    
    if (conversionRatio && (isNaN(conversionRatio) || conversionRatio <= 0)) {
      return res.status(400).json({
        message: "Conversion ratio must be a positive number",
      });
    }

    const item = await Item.create({ itemCode, itemName, conversionRatio });
    res.status(201).json({ item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add item" });
  }
};

const getAllItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const searchQuery = {
        $or: [
          { itemName: { $regex: search, $options: "i" } },
          { itemCode: { $regex: search, $options: "i" } }
        ]
      };

    const totalItems = await Item.countDocuments(searchQuery);

    if (totalItems === 0) {
      return res.status(200).json({
        currentPage: page,
        totalPages: 0,
        totalItems: 0,
        items: [],
      });
    }

    const items = await Item.find(searchQuery).skip(skip).limit(limit);

    return res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting items" });
  }
};

const deleteItems = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!Array.isArray(itemId) || itemId.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid list of item IDs." });
    }
    const result = await Item.deleteMany({ _id: { $in: itemId } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "item not found" });
    }

    return res.status(200).json({
      message: `${result.deletedCount} items deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting items" });
  }
};

//select item in transaction bill
const getItemList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? {
          $or: [
            { itemName: { $regex: search, $options: "i" } },
            { itemCode: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const items = await Item.find(query).select(
      "itemName itemCode "
    );
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting suppliers" });
  }
};



module.exports={
  addItem,
  getAllItems,
  deleteItems,
  getItemList,
  
  
}
  