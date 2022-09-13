import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import accommodationReadOneService from "../../services/accommodations/accommodationReadOne.service";

const accommodationReadOneController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const accommodationList = await accommodationReadOneService(id);

    return res.json({
      message: "Successful request",
      accommodation: accommodationList,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accommodationReadOneController;
