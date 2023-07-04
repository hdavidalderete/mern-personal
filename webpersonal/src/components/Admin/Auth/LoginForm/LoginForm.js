import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./LoginForm.form";

const authController = new Auth();

export function LoginForm({ openLogin }) {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { accessToken, refreshToken } = await authController.login(
          formValue
        );
        authController.setAccessToken(accessToken);
        authController.setRefreshsToken(refreshToken);
        login(accessToken);
        openLogin();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          value={formik.values.email}
          error={formik.errors.email}
          placeholder="Correo electronico"
          onChange={formik.handleChange}
        />
        <Form.Input
          name="password"
          value={formik.values.password}
          error={formik.errors.password}
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Entrar
        </Form.Button>
      </Form>
    </div>
  );
}
