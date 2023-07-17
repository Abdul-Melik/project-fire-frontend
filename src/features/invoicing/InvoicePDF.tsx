import { Font, Document, Page, View, Text, Image } from "@react-pdf/renderer";

import { Invoice } from "src/types";
import { getInvoiceColorAndStatus } from "src/helpers";
import { pdfBackground, pdfLogo } from "assets/media";
import GilroySemiBold from "assets/fonts/GilroySemiBold.ttf";

Font.register({
  family: "GilroySemiBold",
  src: GilroySemiBold,
});

type Props = {
  invoice: Invoice;
};

const InvoicePDF = ({ invoice }: Props) => {
  const { client, industry, totalHoursBilled, amountBilledBAM, invoiceStatus } =
    invoice;

  return (
    <Document>
      <Page size="A4" style={{ fontFamily: "GilroySemiBold" }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Image
            src={pdfBackground}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#23232b",
            paddingRight: 30,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image src={pdfLogo} style={{ width: 100, height: 100 }} />
            <Text style={{ color: "white" }}>INVOICE</Text>
          </View>
          <Text style={{ color: "white" }}>
            Date: {new Date().toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            zIndex: -1,
            marginHorizontal: "auto",
            color: "black",
            width: "80%",
            fontSize: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Text>Client:</Text>
              <Text>Industry:</Text>
              <Text>Total Hours Billed:</Text>
              <Text>Amount Billed (BAM):</Text>
              <Text>Invoice Status:</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 20,
              }}
            >
              <Text>{client}</Text>
              <Text>{industry}</Text>
              <Text>{totalHoursBilled.toLocaleString("en-US")}</Text>
              <Text>
                {amountBilledBAM.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text>{getInvoiceColorAndStatus(invoiceStatus)?.status}</Text>
            </View>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              marginTop: 100,
              paddingTop: 10,
              width: "50%",
              borderTop: "1px solid black",
            }}
          >
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Signature
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#63c089",
            color: "black",
            width: "100%",
            padding: 25,
            fontSize: 15,
            textAlign: "center",
            letterSpacing: 1.2,
          }}
        >
          <Text>Kolodvorska bb, 71000 Sarajevo BiH</Text>
          <Text style={{ marginTop: 10 }}>E-mail: info@antcolony.io</Text>
          <Text style={{ marginTop: 10 }}>Call: +38762439597</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
