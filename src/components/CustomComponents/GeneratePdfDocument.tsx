import { alpha, useTheme } from "@mui/material";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Font,
  Link,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useAuthContext } from "src/auth/useAuthContext";

Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v27/mem8YaGs126MiZpBA-UFVZ0b.woff2", // URL to the font file
});

// Define styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  },
  Text: {
    fontSize: 10,
    fontColor: "#494747",
  },
});

// Create PDF document
const GeneratePdfDocument = ({ data, llm, tag, userName }: any) => {
  const theme = useTheme();

  return (
    <Document>
      <Page size="A4" style={{ borderTop: "1px solid #dadada" }}>
        <View
          style={{
            padding: "30px 15px 10px",
            // borderBottom: "1px solid #dadada",
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Image src={"/logo/logo.png"} style={{ width: 30 }} />{" "}
          <Text style={{}}>Aryabhat</Text>
        </View>
        <View
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #dadada",
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
                padding: "5px 13px",
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
                padding: "5px 13px",
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
              }}
            >
              {llm?.model_name}
            </Text>
          </View>
          <View
            style={{
              border: `1px solid #dadada`,
              borderRadius: 20,
              padding: "5px 13px",
              display: "flex",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Text
              style={{
                height: 10,
                width: 10,
                backgroundColor: "#F5B700",
                borderRadius: "50%",
              }}
            ></Text>
            <Text
              style={{
                ...styles.Text,
              }}
            >
              {tag?.tag_name}
            </Text>
          </View>
        </View>

        <View style={{ margin: "30px 10px" }}>
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
                      : alpha(theme.palette.primary.main, 0.1),
                  alignSelf:
                    item.type == "aryabhat" ? "flex-start" : "flex-end",
                  maxWidth: "60%",
                }}
              >
                <Text style={styles.Text}>{item.context}</Text>
              </View>
            );
          })}
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            **** End of the Document ****
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image source={"/logo/link.png"} style={{ width: 10 }} />{" "}
              <Link href="https://www.Aryabhat.ai/" style={styles.Text}>
                https://www.Aryabhat.ai/
              </Link>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              {" "}
              <Image source={"/logo/mail.png"} style={{ width: 15 }} />{" "}
              <Text style={styles.Text}>
                Notebook Created by {userName} at{" "}
                {dayjs(new Date()).format("DD-MM-YYYY hh:mm")}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePdfDocument;
