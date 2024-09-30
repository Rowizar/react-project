import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

//Лаба 5 - форма

interface IMyForm {
  name: string;
  age: number;
}

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IMyForm>({
    mode: "onBlur",
  });

  const [tasks, setTasks] = useState<IMyForm[]>([]);

  const saveElement: SubmitHandler<IMyForm> = (data) => {
    setTasks((prev) => [...prev, data]);
    reset();
  };

  return (
    <div>
      <h1>Посетители сайта</h1>
      <p>Пожалуйста укажите имя и возраст !</p>

      <form onSubmit={handleSubmit(saveElement)}>
        <input
          {...register("name", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 5,
              message: "Нужно больше символов",
            },
          })}
        />
        <div>{errors.name?.message}</div>

        <input
          {...register("age", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 1, // Установите минимальное значение, подходящее для вашего поля
              message: "Введите корректный возраст",
            },
          })}
          type="number" // Указываем тип, чтобы обеспечить ввод чисел
        />
        <div>{errors.age?.message}</div>

        <button type="submit">Сохранить</button>
      </form>

      {tasks.map((task, index) => (
        <p key={index}>
          {task.name} - {task.age}
        </p>
      ))}
    </div>
  );
};

export default ContactPage;
