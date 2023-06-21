import {
  Row,
  Col,
  Card,
  Form,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";
import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProduct, { Edit } from "./Edit";
import axios from "axios";

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
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

// project table start

function Products() {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    await axios.get("http://localhost:3333/mongo/product").then((res) => {
      res.data.forEach((element) => {
        element.actions = (
          <>
            <Button type="primary">
              <Link to={`/edit/${element.id}`}>Edit</Link>
            </Button>
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:3333/mongo/delete", {
                    id: element.id,
                  })
                  .then((res) => {
                    getData();
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }}
              type="primary"
              danger
            >
              Delete
            </Button>
          </>
        );
      });
      setProducts(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Products Table"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={products}
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

export default Products;
