import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/joy/Divider";
import Form from "./Form";
import Alert from "@mui/joy/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { columnBo, columnsStatic } from "../components/Columns";

export default function Home() {
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState("none");
  const [disabled, setDisabled] = React.useState(true);
  const [openForm, setOpenForm] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading2, setLoading2] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [quantityOrderedState, setQuantityOrderedState] = React.useState({});
  const [uomState, setUomState] = React.useState({});
  const [unitPriceState, setUnitPriceState] = React.useState({});
  const [totalPriceState, setTotalPriceState] = React.useState({});
  const [alertOn, setAlertOn] = React.useState("none");
  const [message, setMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState("success");
  const [prepare, setPrepare] = React.useState(true);

  const handleQuantityChange = (id, newValue) => {
    setQuantityOrderedState((prevState) => ({ ...prevState, [id]: newValue }));
  };

  const handleUomChange = (id, newValue) => {
    setUomState((prevState) => ({ ...prevState, [id]: newValue }));
  };

  const handleUnitPriceChange = (id, newValue) => {
    setUnitPriceState((prevState) => ({ ...prevState, [id]: newValue }));
  };

  const handleTotalPriceChange = (id, newValue) => {
    setTotalPriceState((prevState) => ({ ...prevState, [id]: newValue }));
  };

  const fetchData = async () => {
    setLoading2(true);
    const response = await fetch(
      "http://127.0.0.1:3000/bo_setup/" + encodeURIComponent(headers.PONumber)
    );
    if (response.ok) {
      const data = await response.json();
      setData(data);
      setOpened(true);
    }
    setLoading(false);
    setLoading2(false);
    console.log(data);
  };

  const columns3 = [
    { field: "ItemCode", headerName: "Item Code", width: 150 },
    {
      field: "ItemName",
      headerName: "Item",
      width: 550,
      renderCell: (params) => {
        return (
          <div
            className="item"
            style={{
              width: "100%",
              textOverflow: "ellipsis",
              overflow: "hidden",
              wordWrap: "break-word",
              whiteSpace: "normal",
              paddingRight: "20px",
            }}
          >
            {params.row.GeneralSpec
              ? params.row.ItemName + params.row.GeneralSpec
              : params.row.ItemName}
          </div>
        );
      },
    },
    {
      field: "QuantityOrdered",
      headerName: "Quantity Ordered",
      width: 180,
      renderCell: (params) => (
        <Input
          sx={{ "--Input-decoratorChildHeight": "55px" }}
          placeholder="Quantity Ordered"
          type="text"
          required
          value={
            quantityOrderedState[params.row.id] || params.row.QuantityOrdered
          }
          onChange={(e) => handleQuantityChange(params.row.id, e.target.value)}
        />
      ),
    },
    {
      field: "UOM",
      headerName: "Quantity Unit",
      width: 180,
      renderCell: (params) => (
        <Input
          sx={{ "--Input-decoratorChildHeight": "55px" }}
          placeholder="Ordered Unit"
          type="text"
          required
          value={uomState[params.row.id] || params.row.UOM}
          onChange={(e) => handleUomChange(params.row.id, e.target.value)}
        />
      ),
    },
    {
      field: "UnitPrice",
      headerName: "Unit Price",
      width: 180,
      renderCell: (params) => (
        <Input
          sx={{ "--Input-decoratorChildHeight": "55px" }}
          placeholder="Unit Price"
          type="text"
          required
          value={unitPriceState[params.row.id] || params.row.UnitPrice}
          onChange={(e) => handleUnitPriceChange(params.row.id, e.target.value)}
        />
      ),
    },
    {
      field: "TotalPrice",
      headerName: "Total Price",
      width: 180,
      renderCell: (params) => (
        <Input
          sx={{ "--Input-decoratorChildHeight": "55px" }}
          placeholder="Total Price"
          type="text"
          required
          value={totalPriceState[params.row.id] || params.row.TotalPrice}
          onChange={(e) =>
            handleTotalPriceChange(params.row.id, e.target.value)
          }
        />
      ),
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 150,
      renderCell: () => headers.Currency,
    },
  ];

  const fetchSOItems = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/so_items?po_login_code=${
          id || code
        }&user_full_name=maveko_plu_module}`,
        {
          method: "GET",
          headers: {
            HTTP_AUTHORIZATION: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const rowsWithId = data.details.map((row) => ({
        ...row,
        id: row.LineNumber,
      }));

      if (rowsWithId.length > 0) {
        setRows(rowsWithId);
        setHeaders(data.header.__values__);
        setVisible("block");
        setMessage(`Succesfully fetched data from login code ${code}`);
        setAlertOn("block");
        setAlertType("success");
        setTimeout(() => {
          setAlertOn("none");
        }, 3000);
      } else {
        setVisible("none");
        setMessage(`No data found from login code ${code}`);
        setAlertOn("block");
        setAlertType("warning");
        setTimeout(() => {
          setAlertOn("none");
        }, 3000);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
      setMessage(`Unable to fetch data from login code ${code}`);
      setAlertOn("block");
      setAlertType("danger");
      setTimeout(() => {
        setAlertOn("none");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    setLoading(true);
    try {
      const orderResponse = await fetch(`http://localhost:3000/orders`, {
        method: "POST",
        headers: {
          HTTP_AUTHORIZATION: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            order_number: headers.PONumber,
            delivery_date: headers.DeliveryDateToDestination,
            terms: "sample",
            delivery_address: headers.DeliveryAddress1,
            invoice_address: `${headers.SentInvoiceAddress5} | ${headers.SentInvoiceAddress4} | ${headers.SentInvoiceAddress6}`,
            status: "pending",
            remark: "no remark",
          },
        }),
      });
      const order = await orderResponse.json();

      if (!order.success) {
        throw new Error(`${headers.PONumber} already recorded!`);
      }

      const itemPromises = rows.map(async (row) => {
        const itemResponse = await fetch("http://0.0.0.0:3000/items", {
          method: "POST",
          headers: {
            HTTP_AUTHORIZATION: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              item_number: row.ItemCode,
              item_description: row.ItemName,
              quantity: row.QuantityOrdered,
              unit_of_measure: row.UOM,
              unit_price: row.UnitPrice,
              total_price: row.TotalPrice,
              supplier_purchase_price: row.UnitPrice + 100,
              supplier_purchase_price_valid_from: new Date(),
              supplier_purchase_price_valid_to: new Date() + 30,
            },
          }),
        });
        const item = await itemResponse.json();

        if (!item.success) {
          throw new Error("Error Occured");
        }

        const orderItemResponse = await fetch(
          "http://0.0.0.0:3000/order_items",
          {
            method: "POST",
            headers: {
              HTTP_AUTHORIZATION: localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_item: {
                order_id: order.data.id,
                item_id: item.data.id,
                supplier_quantity: row.QuantityOrdered,
                supplier_unit_price: row.UnitPrice,
                status: "pending",
                remark: "no remark",
              },
            }),
          }
        );
        const orderItem = await orderItemResponse.json();

        if (!orderItem.success) {
          throw new Error("Error Occured");
        }
      });

      await Promise.all(itemPromises);

      setLoading(false);
      setAlertOn("block");
      setMessage("Order Recorded Successfully!");
      setAlertType("success");
      setOpened(false);
      setPrepare(false);
      setTimeout(() => {
        setAlertOn("none");
      }, 3000);
    } catch (error) {
      setLoading(false);
      setAlertOn("block");
      setMessage(error.message);
      setAlertType("danger");
      setOpened(false);
      setPrepare(false);
      setTimeout(() => {
        setAlertOn("none");
      }, 3000);
    }
  };

  return (
    <Tabs defaultValue={1}>
      <Form
        loading={loading}
        headers={headers}
        openForm={openForm}
        setOpenForm={setOpenForm}
      ></Form>
      <Alert
        style={{
          display: alertOn,
          width: "fit-content",
          maxWidth: "300px",
          position: "absolute",
          top: 82,
          right: 10,
          zIndex: 9999,
        }}
        variant="soft"
        color={alertType}
      >
        {message}
      </Alert>
      <TabList
        style={{
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="tabs"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Tab
            style={{
              padding: "10px",
              paddingInline: "50px",
              alignItems: "left",
              paddingLeft: "10px",
            }}
            value={1}
          >
            Capture Order
          </Tab>
          <Tab
            disabled={prepare}
            style={{
              padding: "10px",
              paddingInline: "50px",
              alignItems: "left",
              paddingLeft: "10px",
            }}
            value={2}
          >
            Prepare Order
          </Tab>
        </div>
        <h1 style={{ lineHeight: 0 }}>MAVEKO</h1>
      </TabList>

      <TabPanel value={1}>
        <Input
          sx={{ "--Input-decoratorChildHeight": "55px", width: "650px" }}
          placeholder="PO LOGIN CODE"
          type="text"
          required
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            e.target.value.length >= 5 ? setDisabled(false) : setDisabled(true);
          }}
          endDecorator={
            <Button
              disabled={disabled}
              onClick={() => {
                setLoading(true);
                setTimeout(async () => {
                  await fetchSOItems(code);
                }, 50);
              }}
              size="sm"
              variant="solid"
              color="primary"
              loading={loading}
              sx={{
                background: "#04184B",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                paddingInline: "50px",
              }}
            >
              FETCH
            </Button>
          }
        />
        <h2 style={{ display: visible, lineHeight: 0, marginTop: "40px" }}>
          {headers.PONumber}
        </h2>
        <Divider style={{ display: visible, marginTop: "25px" }}></Divider>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#04184B",
              color: "white",
              cursor: "pointer",
              stroke: "white",
            },
          }}
          style={{
            display: visible,
            marginTop: "20px",
            width: "100%",
          }}
          rows={rows}
          columns={columnsStatic}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />

        <div
          className="actions"
          style={{
            display: visible == "block" ? "flex" : "none",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={() => {}}
            disabled={loading}
            style={{
              padding: "15px",
              paddingInline: "30px",
              marginLeft: "20px",
            }}
            variant="outlined"
            color="danger"
          >
            CANCEL
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              setOpenForm(true);
            }}
            style={{
              padding: "15px",
              paddingInline: "30px",
              marginLeft: "20px",
            }}
            color="warning"
          >
            INPUT ORDER DETAILS
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              createOrder();
              setOpened(true);
            }}
            style={{
              padding: "15px",
              paddingInline: "30px",
              marginLeft: "20px",
            }}
            color="success"
          >
            SAVE ORDER
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={2}>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>{"BACK ORDERS"}</DialogTitle>
          <DialogContent>
            {loading2 ? (
              <div>Loading...</div>
            ) : (
              <div style={{ height: "fit-content", width: "100%" }}>
                <h2>{data.bo ? data.bo.order_number + "#ONE" : ""}</h2>
                <DataGrid
                  rows={data.result ? data.result : []}
                  columns={columnBo}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSize={5}
                />
                <br />
                <br />
              </div>
            )}

            {loading2 ? (
              <div>Loading...</div>
            ) : (
              <div style={{ height: "fit-content", width: "100%" }}>
                <br />
                <h2>{data.bo1 ? data.bo1.order_number + "#TWO" : ""}</h2>
                <DataGrid
                  rows={data.result1 ? data.result1 : []}
                  columns={columnBo}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSize={5}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
        <h2 style={{ display: visible, lineHeight: 0 }}>{headers.PONumber}</h2>
        <Divider style={{ display: visible, marginTop: "25px" }}></Divider>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#04184B",
              color: "white",
              cursor: "pointer",
              stroke: "white",
            },
          }}
          style={{
            display: visible,
            marginTop: "20px",
            width: "100%",
          }}
          rows={rows}
          columns={columns3}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />

        <div
          className="actions"
          style={{
            display: visible == "block" ? "flex" : "none",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={() => {
              setVisible("none");
            }}
            style={{
              padding: "15px",
              paddingInline: "30px",
              marginLeft: "20px",
            }}
            variant="outlined"
            color="danger"
          >
            CANCEL
          </Button>
          {!opened ? (
            <Button
              onClick={async () => {
                setLoading2(true);
                setOpen(true);
                await fetchData();
              }}
              style={{
                padding: "15px",
                paddingInline: "30px",
                marginLeft: "20px",
              }}
              color="success"
            >
              GENERATE BACK ORDER
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setOpen(true);
              }}
              style={{
                padding: "15px",
                paddingInline: "30px",
                marginLeft: "20px",
              }}
              color="success"
            >
              VIEW BACK ORDER
            </Button>
          )}
        </div>
      </TabPanel>
    </Tabs>
  );
}