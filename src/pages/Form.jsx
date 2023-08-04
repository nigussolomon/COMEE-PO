/* eslint-disable react/prop-types */
import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SalesOrder({ headers, openForm, setOpenForm }) {
  const [rp, setRp] = React.useState("p1");
  const [cp, setCp] = React.useState("p1");

  const renderTextField = (
    label,
    value,
    onChange,
    isSelect = false,
    options = [],
    dsabled = false
  ) => (
    <TextField
      style={{ width: "580px", marginBottom: "20px", marginRight: "20px" }}
      focused={value ? true : false}
      disabled={dsabled}
      value={value}
      variant="outlined"
      label={label}
      onChange={onChange}
      select={isSelect}
    >
      {isSelect &&
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
    </TextField>
  );

  const renderDatePicker = (defaultValue, label) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          defaultValue={defaultValue}
          sx={{ width: "480px", marginRight: "20px" }}
          label={label}
        />
      </DemoContainer>
    </LocalizationProvider>
  );

  return (
    <>
      <Dialog
        scroll="body"
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        sx={{
          width: "100%",
          minWidth: "100vh",
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div
            className="titleHead"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="title">
              <h1 style={{ lineHeight: 0.5 }}>Order Information</h1>
            </div>
            <div className="action">
              {renderTextField(
                "Recipient Type",
                "type1",
                () => {},
                true,
                [{ label: "Customer", value: "type1" }],
                true
              )}
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Tabs defaultValue={1}>
            <TabList>
              <Tab value={1}>MAVEKO DETAILS</Tab>
              <Tab value={2}>DOC HEADERS</Tab>
              <Tab value={3}>AES - CUSTOMS</Tab>
            </TabList>
            <TabPanel value={1}>
              <h2 style={{ lineHeight: 0.5 }}>Maveko Information</h2>
              <Divider></Divider>
              <br />
              <div
                className="customerInfo"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {renderTextField("PO-No", headers.PONumber, () => {})}
                {renderTextField(
                  "Name of Ship",
                  headers.PODestinationName,
                  () => {}
                )}
                {renderTextField("Ship Number", "", () => {})}
                {renderTextField(
                  "Delivery Address",
                  headers.DeliveryAddress1,
                  () => {}
                )}
                {renderTextField(
                  "Final Delivery",
                  `${headers.DeliveryDateToDestination} | ${headers.DestinationDeliveryPlace}`,
                  () => {}
                )}
                {renderTextField("Voyage Number", "", () => {})}
                {renderTextField("Backorder Text", "t1", () => {}, true, [
                  { label: "BACKORDER", value: "t1" },
                ])}
              </div>
              <br />
            </TabPanel>
            <TabPanel value={2}>
              <div className="headersInfo">
                <h2 style={{ lineHeight: 0.5 }}>Customer Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {renderTextField(
                    "Customer",
                    headers.POSentByPersonCompany,
                    () => {},
                    false
                  )}
                  {
                    (renderTextField("Title", headers.PODescription, () => {}),
                    false)
                  }
                  {renderTextField(
                    "Name",
                    headers.POSentByPersonCompany,
                    () => {},
                    false
                  )}
                  {renderTextField(
                    "Contact Person",
                    cp,
                    (e) => setCp(e.target.value),
                    true,
                    [
                      { label: "Hana Gebeyehu", value: "p1" },
                      { label: "Nigus Solomon", value: "p2" },
                      { label: "Eyosias Mekbib", value: "p3" },
                    ]
                  )}
                  {renderTextField(
                    "Street",
                    headers.SentInvoiceAddress3,
                    () => {},
                    false
                  )}
                  {renderTextField(
                    "City",
                    headers.SentInvoiceAddress2,
                    () => {},
                    false
                  )}
                  {renderTextField(
                    "Address",
                    headers.SentInvoiceAddress5 +
                      " | " +
                      headers.SentInvoiceAddress4 +
                      " | " +
                      headers.SentInvoiceAddress6,
                    () => {},
                    false
                  )}
                </div>
                <br />

                <h2 style={{ lineHeight: 0.5 }}>Document Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {renderTextField(
                    "Recipient Person",
                    rp,
                    (e) => setRp(e.target.value),
                    true,
                    [{ label: "Hana Gebeyehu", value: "p1" }]
                  )}
                  {renderTextField("Terms", headers.PaymentTerms, () => {})}
                  {renderTextField(
                    "Process Matchcode",
                    headers.PONumber,
                    () => {}
                  )}
                  {renderDatePicker(
                    dayjs(headers.POSentDate),
                    "Reference Date"
                  )}
                  <div className="space" style={{ width: "20px" }}></div>
                  {renderDatePicker(
                    dayjs(headers.DeliveryDateToDestination),
                    "Delivery Date"
                  )}
                  <div className="space" style={{ width: "20px" }}></div>
                  {renderDatePicker(dayjs(headers.POSentDate), "Curr Value")}
                </div>

                <br />

                <h2 style={{ lineHeight: 0.5 }}>Delivery Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {renderTextField(
                    "Delivery Address",
                    headers.DeliveryAddress1,
                    () => {}
                  )}
                  {renderTextField("Title", headers.PODescription, () => {})}
                  {renderTextField(
                    "Name",
                    headers.POSentByPersonCompany,
                    () => {}
                  )}
                  {renderTextField(
                    "Contact Person",
                    cp,
                    (e) => setCp(e.target.value),
                    true,
                    [
                      { label: "Hana Gebeyehu", value: "p1" },
                      { label: "Nigus Solomon", value: "p2" },
                      { label: "Eyosias Mekbib", value: "p3" },
                    ]
                  )}
                  {renderTextField(
                    "City",
                    headers.SentInvoiceAddress2,
                    () => {}
                  )}
                  {renderTextField(
                    "Address",
                    `${headers.SentInvoiceAddress5} | ${headers.SentInvoiceAddress4} | ${headers.SentInvoiceAddress6}`,
                    () => {}
                  )}
                </div>

                <br />
                <h2 style={{ lineHeight: 0.5 }}>Invoice Information</h2>
                <Divider></Divider>
                <br />
                <div
                  className="customerInfo"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {renderTextField(
                    "Invoice Address",
                    headers.POSentByPersonCompany,
                    () => {}
                  )}
                  {renderTextField("Title", headers.PODescription, () => {})}
                  {renderTextField(
                    "Name",
                    headers.POSentByPersonCompany,
                    () => {}
                  )}
                  {renderTextField(
                    "Contact Person",
                    cp,
                    (e) => setCp(e.target.value),
                    true,
                    [
                      { label: "Hana Gebeyehu", value: "p1" },
                      { label: "Nigus Solomon", value: "p2" },
                      { label: "Eyosias Mekbib", value: "p3" },
                    ]
                  )}
                  {renderTextField(
                    "City",
                    headers.SentInvoiceAddress2,
                    () => {}
                  )}
                  {renderTextField(
                    "Address",
                    `${headers.SentInvoiceAddress5} | ${headers.SentInvoiceAddress4} | ${headers.SentInvoiceAddress6}`,
                    () => {}
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={3}>
              <h2 style={{ lineHeight: 0.5 }}>AES - Customs Information</h2>
              <Divider></Divider>
              <br />
              <div
                className="customerInfo"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {renderTextField("Designated Eyes", "c1", () => {}, true, [
                  { label: "Zollamt Rotterdam", value: "c1" },
                  { label: "Zollamt Venedig", value: "c2" },
                ])}
                {renderTextField(
                  "Involved Parties",
                  "0000 / Anmelder ist Ausführer",
                  () => {}
                )}
                {renderTextField("Destination Country", "d1", () => {}, true, [
                  { label: "QQ – Schiffs-und Luftfahrzeugbedarf", value: "d1" },
                  { label: "QS – Schiffs-und Luftfahrzeugbedarf", value: "d2" },
                  { label: "QR – Schiffs-und Luftfahrzeugbedarf", value: "d3" },
                ])}
                {renderTextField(
                  "Transportation Mode I",
                  "3 / Strabenverkehr",
                  () => {}
                )}
                {renderTextField(
                  "Transportation Mode A",
                  "1 / Seeverkehr",
                  () => {}
                )}
                {renderTextField(
                  "Delivery Condition Code",
                  "EXW / Ab Werk",
                  () => {}
                )}
                {renderTextField(
                  "Transportation to Border Point",
                  "10 see Schiff",
                  () => {}
                )}
                {renderTextField("Registration Number", "UNBEKANNT", () => {})}
                {renderTextField(
                  "Type",
                  "30 / Registration Number of the road vehicle",
                  () => {}
                )}
              </div>
              <br />
              <h2 style={{ lineHeight: 0.5, marginTop: 0, marginBottom: 20 }}>
                Transport Route
              </h2>
              <Divider></Divider>
              <br />
              <div className="fields" style={{ display: "flex" }}>
                {renderTextField("Origin", "dod1", () => {}, true, [
                  { label: "DE | Deutschland", value: "dod1" },
                ])}
                {renderTextField("Transit", "de1", () => {}, true, [
                  { label: "NO | Norwegen", value: "de1" },
                ])}
                {renderTextField("Destination", "dd1", () => {}, true, [
                  { label: "CA | Kanada", value: "dd1" },
                ])}
              </div>
            </TabPanel>
          </Tabs>
          <Divider></Divider>
          <div
            className="actions"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={() => {
                setOpenForm(!openForm);
              }}
              variant="outlined"
              color="warning"
              style={{
                marginRight: "20px",
                padding: "10px",
                paddingInline: "50px",
              }}
            >
              HIDE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}