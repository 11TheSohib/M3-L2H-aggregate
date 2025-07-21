import { errorHelper } from "./send_error.helper.js";

export class PUDcontroller {
  constructor(model, keyWord) {
    this.model = model;
    this.keyWord = keyWord;
  }

  create = async (req, res) => {
    try {
      const newItem = await this.model.create(req.body);

      res.status(201).json({
        success: true,
        message: `Yangi ${this.keyWord} muvaffaqiyatli yaratildi`,
        data: newItem,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }

  getAll = async (_, res) => {
    try {
      const data = await this.model.find();
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: data,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }

  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await this.model.findById(id);
      if (!data) {
        return errorHelper(
          new Error(`${id} I couldn't find the id.`),
          res,
          404
        );
      }
      return res.status(200).json({
        statusCode: 200,
        message: "success",
        data: data,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }

  update = async (req, res) => {
    try {
      const id = req.params?.id;
      const updateData = req.body;

      const updatedItem = await this.model.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedItem) {
        return errorHelper(
          new Error(`${id} I couldn't find the id.`),
          res,
          404
        );
      }

      res.json({
        success: true,
        message: `${this.keyWord} muvaffaqiyatli yangilandi`,
        data: updatedItem,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await this.model.findByIdAndDelete(id);

      if (!deletedItem) {
        return errorHelper(
          new Error(`${id} I couldn't find the id.`),
          res,
          404
        );
      }

      res.json({
        success: true,
        message: `${this.keyWord} muvaffaqiyatli o'chirildi`,
        data: deletedItem,
      });
    } catch (error) {
      return errorHelper(error, res, 500);
    }
  }
}
