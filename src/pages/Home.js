import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Input,
  Form,
  Divider,
  Table,
} from "antd";

import Paragraph from "antd/lib/typography/Paragraph";

import axios from "axios";

function Home() {
  const [producto, setProducto] = useState([
    {
      title: "0",
      price: "0",
      category: "0",
      description: "0",
      url: "0",
    },
  ]);
  function FindProducto(id) {
    axios
      .get(`https://api.mercadolibre.com/items/${id}`)
      .then((product) => {
        axios
          .get(`https://api.mercadolibre.com/items/${id}/description`)
          .then((res) => {
            setProducto([
              {
                title: product.data.title,
                price: product.data.price,
                category: product.data.category_id,
                description: res.data.plain_text,
                url: product.data.pictures[0].url,
              },
            ]);
          });
      })
      .catch((err) => {
        alert("Producto no encontrado");
      });
  }

  const { Title, Text } = Typography;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "category",
      key: "category",
      dataIndex: "category",
      width: "10%",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Image",
      key: "url",
      dataIndex: "url",
      width: "10%",
    },
  ];

  const handleSubmit = (e) => {
    if (e.id !== "" || e.id !== undefined) {
      FindProducto(`${e.id}`);
    } else {
      alert("Please, Enter ID");
    }
  };

  useEffect(() => {
    FindProducto("MCO546138353");
  }, []);

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
              <Form onFinish={handleSubmit}>
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
            <Card bordered={false} className="criclebox cardbody">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={producto}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
