import React from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../store/userStore";
import axiosInstance from "../axios";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLogin, setUser, } = useUserStore();

  const onSubmit = async (data) => {
    // Aquí llamas a tu API y guardas la sesión
    try {
      const response = await axiosInstance.post("/auth/register", { ...data, role: "USER" });
      if( response.data.user){
        setUser(response.data.user);
        console.log("Usuario registrado");
      }

    } catch (error) {
      console.log( "error al crear usuario o iniciar sesión", error);
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card w-96 bg-base-100 shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h2>

      {/* Nombre solo si es un formulario de registro */}
      {!isLogin && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="input input-bordered w-full"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.userName && <span className="text-red-500 text-xs">{errors.userName.message}</span>}
        </div>
      )}

      {/* Correo */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Correo"
          className="input input-bordered w-full"
          {...register("email", { required: "El correo es obligatorio" })}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      {/* Contraseña */}
      <div className="mb-6">
        <input
          type="password"
          placeholder="Contraseña"
          className="input input-bordered w-full"
          {...register("password", { required: "La contraseña es obligatoria" })}
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {isLogin ? "Ingresar" : "Registrarse"}
      </button>
    </form>
  );
};

export default LoginForm;