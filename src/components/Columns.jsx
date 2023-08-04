export const columnBo = [
  { field: "product_code", headerName: "Code", width: 150 },
  { field: "product_name", headerName: "Name", width: 300 },
  { field: "requested_quantity", headerName: "Quantity Ordered", width: 120 },
  {
    field: "requested_unit_price",
    headerName: "Requested Price",
    width: 150,
  },
  {
    field: "supplier_unit_price",
    headerName: "Supplier Unit Price",
    width: 150,
  },
];

export const columnsStatic = [
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
  { field: "QuantityOrdered", headerName: "Quantity Ordered", width: 180 },
  { field: "UOM", headerName: "Ordered Unit", width: 180 },
  { field: "UnitPrice", headerName: "Unit Price", width: 150 },
  { field: "TotalPrice", headerName: "Total Price", width: 150 },
];
