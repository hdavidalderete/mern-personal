import React from "react";
import "./MenuForm.scss";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api/menu";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";

const menuController = new Menu();

export function MenuForm({ close, onReload, menu }) {
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(menu),
    validationSchema: validationSchema(menu),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = { ...formValue };
        delete data.protocol;
        if (!menu) {
          data.path = `${formValue.protocol}${formValue.path}`;
          await menuController.createMenu(accessToken, data);
        } else {
          console.log("Edit menu", data);
          await menuController.updateMenu(accessToken, menu._id, data);
        }
        onReload();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="menu-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Titulo"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="order"
          placeholder="Orden"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.order}
          error={formik.errors.order}
        />
      </Form.Group>

      <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
          !menu ? (
            <Dropdown
              options={options}
              onChange={(_, { value }) =>
                formik.setFieldValue("protocol", value)
              }
              value={formik.values.protocol}
              error={formik.errors.protocol}
            />
          ) : null
        }
      />

      <Form.Group></Form.Group>
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {menu ? "Actualizar menu" : "Crear menu"}
      </Form.Button>
    </Form>
  );
}

const options = [
  {
    key: "https",
    text: "https://",
    value: "https://",
  },
  {
    key: "http",
    text: "http://",
    value: "http://",
  },
  {
    key: "/",
    text: "/",
    value: "/",
  },
];
