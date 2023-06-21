import { Button, Card, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditProduct(id) {
  let idn = id.location.pathname.split("/");
  const [dataProduct, setDataProduct] = useState([
    {
      id: " ",
      sku: " ",
      title: " ",
      image: " ",
      description: " ",
      price: " ",
      category: " ",
    },
  ]);
  const [form] = Form.useForm();
  const GetProduct = () => {
    axios
      .get(`http://localhost:3333/mongo/get/?id=${idn[2]}`)
      .then((res) => {
        let data = res.data[0];
        setDataProduct([
          {
            id: data.id,
            sku: data.sku,
            title: data.title,
            image: data.image,
            description: data.description,
            price: data.price,
            category: data.category,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  form.setFieldsValue(dataProduct[0]);
  const handleForm2Submit = (data2) => {
    axios
      .post("http://localhost:3333/mongo/update", data2)
      .then((res) => {
        alert("Product Updated");
      })
      .catch((err) => {
        alert("Error updating product");
      });
  };
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <div className="layout-content">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        <Col className="mb-24" xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            title="Update Product"
            bordered={false}
            className="criclebox cardbody"
          >
            <Form form={form} onFinish={handleForm2Submit}>
              <Form.Item name="id" label="ID" value={dataProduct[0].id}>
                <Input placeholder={dataProduct[0].id} />
              </Form.Item>
              <Form.Item name="sku" label="SKU" required>
                <Input placeholder={dataProduct[0].sku} />
              </Form.Item>
              <Form.Item name="title" label="Title" required>
                <Input placeholder={dataProduct[0].title} />
              </Form.Item>
              <Form.Item name="image" label="Image" required>
                <Input placeholder={dataProduct[0].image} />
              </Form.Item>
              <Form.Item name="description" label="Description" required>
                <Input placeholder={dataProduct[0].description} />
              </Form.Item>
              <Form.Item name="price" label="Price" required>
                <Input placeholder={dataProduct[0].price} />
              </Form.Item>
              <Form.Item name="category" label="Category" required>
                <Input placeholder={dataProduct[0].category} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
