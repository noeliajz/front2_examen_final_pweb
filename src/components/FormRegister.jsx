import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const [formInputs, setFormInputs] = useState({
    user: "",
    pass: "",
    repeatPass: "",
    obraSocial: ""
  });
  const navigate = useNavigate();

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formInputs.pass === formInputs.repeatPass) {
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: formInputs.user,
            pass: formInputs.pass,
            repeatPass: formInputs.repeatPass,
            obraSocial: formInputs.obraSocial
          }),
        });

        if (res.ok) {
          const data = await res.json();

          if (res.status === 201) {
            alert("Registro exitoso");
            setFormInputs({
              user: "",
              pass: "",
              repeatPass: "",
              obraSocial: ""
            });
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            alert("Error en el registro: " + (data.message || "Ocurrió un error inesperado"));
          }
        } else {
          const errorData = await res.json();
          alert("Error en el registro: " + (errorData.message || "Ocurrió un error inesperado"));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error en el registro");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="d-flex py-5 justify-content-center">
      <form className="w-50" onSubmit={handleSubmit}>
        <h2 className="form_tittle">Crea una Cuenta</h2>
        <div className="form_container">
          <div className="mb-3">
            <label htmlFor="exempleInputEmail" className="form-label">
              Ingresar email
            </label>
            <input
              type="email"
              name="user"
              onChange={handleChange}
              value={formInputs.user}
              className="form-control"
              id="exempleEmail"
              placeholder=" "
            />
          </div>
          <div className="mb-3">
            <label className="form_label" htmlFor="exemplepass">
              Ingresar contraseña
            </label>
            <input
              type="password"
              name="pass"
              onChange={handleChange}
              value={formInputs.pass}
              className="form-control"
              id="exemplepass"
              placeholder=" "
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exempleRepeatPass" className="form_label">
              Repetir Contraseña
            </label>
            <input
              type="password"
              name="repeatPass"
              onChange={handleChange}
              value={formInputs.repeatPass}
              className="form-control"
              id="exempleRepeatPass"
              placeholder=" "
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exempleInputObraSocial" className="form-label">
              Ingresar obra social
            </label>
            <input
              type="text"
              name="obraSocial"
              onChange={handleChange}
              value={formInputs.obraSocial}
              className="form-control"
              id="exempleobraSocial"
              placeholder=" "
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
