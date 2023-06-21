import React, { useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row } from "antd";
import axios from "axios";

export default function Create() {
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

  const handleFormSearchSubmit = (data) => {
    if (data.id === " " || data.id === undefined) {
      return alert("ID is required");
    } else {
      axios
        .get(`https://api.mercadolibre.com/items/${data.id}`)
        .then((prod) => {
          axios
            .get(`https://api.mercadolibre.com/items/${data.id}/description`)
            .then((res) => {
              setDataProduct([
                {
                  id: prod.data.id,
                  sku: prod.data.id,
                  title: prod.data.title,
                  image: prod.data.pictures[0].url,
                  description: res.data.plain_text,
                  price: prod.data.price,
                  category: prod.data.category_id,
                },
              ]);
              form.setFieldsValue(dataProduct[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleForm2Submit = (data2) => {
    console.log(data2);
    axios
      .post("http://localhost:3333/mongo/create", data2)
      .then((res) => {
        alert("Product created");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col className="mb-24" xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              title="Search By ID"
              bordered={false}
              className="criclebox cardbody"
            >
              <Form onFinish={handleFormSearchSubmit}>
                <Form.Item name="id" label="ID" required>
                  <Input placeholder="Search by ID" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Divider />
          </Col>
        </Row>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col className="mb-24" xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              title="Create New Product"
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
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
