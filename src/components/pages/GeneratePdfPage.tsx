import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MyDocument from "../MyDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface IMyForm {
  name: string;
  picture: string; // Хранит изображение в формате base64
}

const GeneratePdfPage: React.FC = () => {
  const [task, setTask] = useState<IMyForm | null>(null); // Убедитесь, что начальное значение — null

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const saveElement = (data: any) => {
    if (data.picture.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setTask({ ...data, picture: reader.result as string });
      };
      reader.readAsDataURL(data.picture[0]); // Получаем base64 строку
    } else {
      setTask({ ...data, picture: "" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveElement)}>
        <input
          {...register("name", {
            required: "Нужно больше символов",
            minLength: { value: 5, message: "Нужно больше символов" },
          })}
        />
        <input
          type="file"
          accept="image/*"
          {...register("picture", { required: "Required" })}
        />
        <div>{errors.name?.message}</div>
        <button type="submit">Сохранить</button>
      </form>
      {task && (
        <PDFDownloadLink
          document={<MyDocument name={task.name} picture={task.picture} />}
          fileName="file.pdf"
        >
          <button>Скачать PDF</button>
        </PDFDownloadLink>
      )}
    </>
  );
};

export default GeneratePdfPage;
