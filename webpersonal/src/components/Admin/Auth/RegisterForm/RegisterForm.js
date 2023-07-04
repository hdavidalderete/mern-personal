import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";

const authController = new Auth();

export function RegisterForm({ openLogin }) {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        console.log(error);
        setError("Error en el servidor");
      }
    },
  });

  return (
    <div>
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          value={formik.values.email}
          placeholder="Correo electronico"
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="password"
          value={formik.values.password}
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Form.Input
          name="repeatPassword"
          type="password"
          value={formik.values.repeatPassword}
          placeholder="Repetir contraseña"
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword}
        />
        <Form.Checkbox
          name="conditionAccepted"
          label="Acepto las politicas"
          onChange={(_, { checked }) =>
            formik.setFieldValue("conditionAccepted", checked)
          }
          error={formik.errors.conditionAccepted}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Crear Cuenta
        </Form.Button>

        <p className="register-form__error">{error}</p>
      </Form>
    </div>
  );
}
