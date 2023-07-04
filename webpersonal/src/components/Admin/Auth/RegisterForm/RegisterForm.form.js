import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
    repeatPassword: Yup.string()
      .required("Campo requerido")
      .oneOf([Yup.ref("password")], "Las contraseñar tienen que ser iguales"),
      conditionAccepted: Yup.bool().isTrue(true),
  });
}
