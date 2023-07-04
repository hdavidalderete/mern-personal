import * as Yup from "yup";

export function initialValues(menu) {
  return {
    title: menu?.title ?? "",
    path: menu?.path ?? "",
    protocol: "https://",
    active: menu?.active ?? true,
    order: menu?.order ?? 0,
  };
}

export function validationSchema(menu) {
  return Yup.object({
    title: Yup.string().required(true),
    path: Yup.string().required(true),
    order: Yup.number().required(true),
  });
}
