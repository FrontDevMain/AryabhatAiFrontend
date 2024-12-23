import { alpha, useTheme } from "@mui/material";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/reducers";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    position: "absolute",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  Text: {
    fontSize: 10,
  },
});

// Create PDF document
const GeneratePdfDocument = ({ data, llm, tag }: any) => {
  const theme = useTheme();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{ margin: 10, padding: 10, borderBottom: "1px solid #dadada" }}
        >
          <Image source="/logo/PdfLogo.png" style={{ width: 100 }} />
        </View>
        <View
          style={{
            margin: "0 20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.Text,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 20,
                padding: 10,
                color: theme.palette.primary.main,
              }}
            >
              {llm?.provider_name}
            </Text>
            <Text
              style={{
                ...styles.Text,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 20,
                padding: 10,
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              }}
            >
              {llm?.model_name}
            </Text>
          </View>

          <Text
            style={{
              ...styles.Text,
              border: `1px solid #dadada`,
              borderRadius: 20,
              padding: 10,
            }}
          >
            {tag?.tag_name}
          </Text>
        </View>

        <View style={{ margin: 10, padding: 10 }}>
          {data?.map((item: any) => {
            return (
              <View
                style={{
                  marginBottom: 20,
                  padding: 10,
                  borderRadius: 10,
                  border: "1px solid #F4F4F5",
                  backgroundColor:
                    item.type == "aryabhat"
                      ? "#F4F4F5"
                      : alpha(theme.palette.primary.main, 0.08),
                  alignSelf:
                    item.type == "aryabhat" ? "flex-start" : "flex-end",
                  maxWidth: "60%",
                }}
              >
                <Text
                  style={{
                    ...styles.Text,
                    alignSelf: "flex-end",
                    color: "#4A4A4A",
                  }}
                >
                  {item.context}
                </Text>
              </View>
            );
          })}
        </View>
        <Image source={"/logo/pdfBG.png"} style={{ width: "100%" }} />
      </Page>
    </Document>
  );
};

export default GeneratePdfDocument;
