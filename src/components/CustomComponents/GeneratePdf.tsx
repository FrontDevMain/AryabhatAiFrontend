import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";
import { alpha, useTheme } from "@mui/material";
import dayjs from "dayjs";

Font.register({
  family: "Open Sans",
  src: "https://fonts.gstatic.com/s/opensans/v27/mem8YaGs126MiZpBA-UFVZ0b.woff2", // URL to the font file
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    borderBottom: "1px solid #dadada",
    gap: 5,
  },
  logo: {
    width: 40,
  },
  section: {
    marginTop: 30,
  },
  chatBubble: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  chatBubbleImage: {
    width: 50,
    marginRight: 10,
  },
  chatBubbleText: {
    fontSize: 12,
    color: "#494747",
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "1px solid #dadada",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerIcon: {
    width: 12,
    marginRight: 5,
  },
  mainText: {
    fontSize: 12,
    fontColor: "#494747",
  },
  footerText: {
    fontSize: 10,
    color: "#494747",
  },
  waveImage: {
    marginTop: 20,
    width: "100%",
  },
});
const GeneratePdf = ({ data, llm, tag, userName }: any) => {
  const theme = useTheme();
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={"/logo/logo.png"} style={styles.logo} />{" "}
          <Text>Aryabhat</Text>
        </View>

        {/* provider info */}
        <View
          style={{
            padding: 10,
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
                ...styles.mainText,
                border: `1px solid #dadada`,
                borderRadius: 20,
                padding: "5px 13px",
                color: theme.palette.primary.main,
              }}
            >
              {llm?.provider_name} &gt;
            </Text>
            {llm?.model?.map((item: any) => {
              return (
                <Text
                  style={{
                    ...styles.mainText,
                    border: `1px solid ${
                      item?.isSelected ? theme.palette.primary.main : "#dadada"
                    }`,
                    borderRadius: 20,
                    padding: "5px 13px",
                    backgroundColor: item?.isSelected
                      ? theme.palette.primary.main
                      : "transparent",
                    color: item?.isSelected ? "#ffffff" : "#494747",
                  }}
                >
                  {item.model_name}
                  {/* {llm?.model.find((item: any) => item?.isSelected)?.model_name} */}
                </Text>
              );
            })}
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
            <Text style={styles.mainText}>{tag?.tag_name}</Text>
          </View>
        </View>

        {/* Chat Section */}
        <View style={styles.section}>
          {data?.map((item: any) => {
            return (
              <View
                style={{
                  paddingBottom: 20,
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
                <Text style={{ fontSize: 10 }}>{item.context}</Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        {/* <Image src="/footer-wave.png" style={styles.waveImage} /> */}
        <View style={styles.footer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image source={"/logo/link.png"} style={{ width: 10 }} />{" "}
            <Link href="https://www.Aryabhat.ai/" style={styles.footerText}>
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
            <Text style={styles.footerText}>
              Notebook Created by {userName} at{" "}
              {dayjs(new Date()).format("DD-MM-YYYY hh:mm")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePdf;
