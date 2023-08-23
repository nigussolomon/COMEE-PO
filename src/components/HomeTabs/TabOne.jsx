/* eslint-disable react/prop-types */
import TabPanel from "@mui/joy/TabPanel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/joy/Divider";
import { columnsStatic } from "../Columns";

export default function TabOne({
  code,
  setCode,
  setDisabled,
  disabled,
  setLoading,
  fetchSOItems,
  loading,
  visible,
  headers,
  rows,
  setOpenForm,
  createOrder,
  setOpened,
}) {
  return (
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
        {headers ? headers.PONumber : ""}
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
        rows={rows ? rows : []}
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
  );
}
