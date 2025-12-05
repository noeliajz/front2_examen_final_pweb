// src/page/WhatsAppTestPage.jsx
import React, { useState } from "react";
import clienteAxios from "../utils/axiosClient";
import Swal from "sweetalert2";
import NavbarComponentsAdmin from "../components/NavbarComponentsAdmin";

const WhatsAppTestPage = () => {
  const [formData, setFormData] = useState({
    telefono: "",
    fecha: "",
    doctor: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.telefono || !formData.fecha || !formData.doctor) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "warning");
      return;
    }

    Swal.fire({
      title: "Enviando mensaje...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await clienteAxios.post("/whatsapp/send", formData);
      Swal.close();

      if (res.data.ok) {
        Swal.fire("✅ Éxito", "Mensaje enviado correctamente.", "success");
      } else {
        Swal.fire(
          "Error",
          res.data.msg || "Fallo al enviar el mensaje.",
          "error"
        );
      }
    } catch (error) {
      Swal.close();
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo enviar el mensaje.",
        "error"
      );
    }
  };

  return (
    <>
      <NavbarComponentsAdmin />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-5 rounded-2xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center ">
            Enviar WhatsApp (Servidor)
          </h2>

          <label className="block mb-2 font-semibold px-2">
            Número de WhatsApp:
          </label>
          <input
            type="text"
            name="telefono"
            placeholder="Ej: 5493816501006"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold px-3">Fecha del turno:</label>
          <input
            type="text"
            name="fecha"
            placeholder="Ej: 10/11/2025"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold px-5">Doctor/a:</label>
          <input
            type="text"
            name="doctor"
            placeholder="Ej: García"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className=" p-2 mx-3 btn "
            style={{
                  margin: "20px",
                  background: "#0E46A3",
                  color: "#E1F7F5",
                }}
          >
            Enviar WhatsApp 📲
          </button>
        </form>
      </div>
    </>
  );
};

export default WhatsAppTestPage;
