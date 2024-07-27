import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        const res = await fetch("http://localhost:3000/api/users", {
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registro exitoso",
              showConfirmButton: false,
              timer: 1380,
            });
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
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error en la solicitud de login",
              text: "Error en el registro: " + data.message ,
              showConfirmButton: false,
              timer: 1380,
            });
          }
        } else {
          const errorData = await res.json();
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error en la solicitud de login",
            text: "Error en el registro: " + errorData.message ,
            showConfirmButton: false,
            timer: 1380,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Error en el registro: "  ,
          showConfirmButton: false,
          timer: 1380,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error en la solicitud de login",
        text: "Las contraseñas no coinciden" ,
        showConfirmButton: false,
        timer: 1380,
      });
    }
  };

  return (
    <div className="d-flex py-5 justify-content-center"  style={{ background: "#E1F7F5" }}>
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
          <button type="submit" className="btn" style={{background:"#0E46A3", color:"#E1F7F5"}} >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
