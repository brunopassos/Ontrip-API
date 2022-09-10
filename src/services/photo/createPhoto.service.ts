import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Photo } from "../../entities/photo.entity";
import { AppError } from "../../errors/AppError";
import { IPhotoRequest } from "../../interfaces/photos";
import { v2 as cloudinary } from "cloudinary";

export const createPhotoService = async ({
  content,
  accommodationId,
}: IPhotoRequest) => {
  const photoRepository = AppDataSource.getRepository(Photo);
  const accommodationRepository = AppDataSource.getRepository(Accommodation);
  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });

  if (!accommodation) {
    throw new AppError(404, "Accomodation not found");
  }

  // Opcão de já salvar no DB a url da imagem em vez da referência.

  const img = cloudinary.url(content);

  const photo = photoRepository.create({
    content: img,
    accommodation,
  });

  /* const photo = photoRepository.create({
    content,
    accommodation,
  }); */

  await photoRepository.save(photo);

  /* const image = cloudinary.url(photo.content);

  photo.content = image; */

  return photo;
};
