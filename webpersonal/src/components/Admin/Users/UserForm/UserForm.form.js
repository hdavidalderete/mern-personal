import * as Yup from "yup";

export function initialValues(user) {
  return {
    avatar: user?.avatar ?? "",
    fileAvatar: null,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "",
    password: "",
  };
}

export function validationSchema(user) {
  return Yup.object({
    firstName: Yup.string().required("Campo requerido"),
    lastName: Yup.string().required("Campo requerido"),
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo requerido"),
    role: Yup.string().required("Campo requerido"),
    password: user ? Yup.string() : Yup.string().required("Campo requerido"),
  });
}
