import { Document, Page, View, StyleSheet, Font } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { generateQRCode } from "@/utils/generateQRCode";
import StudentCard from "./StudentCard";

Font.register({
  family: "Cairo",
  fonts: [
    {
      src: "/src/assets/fonts/Cairo-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/src/assets/fonts/Cairo-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#fff",
    flexDirection: "column",
    fontFamily: "Cairo",
    direction: "rtl",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%", // two per row
    marginBottom: 20,
  },
});

export default function StudentCardsPDF({
  enrollments = [],
  config,
  mode = "ID1",
}) {
  const [qrMap, setQrMap] = useState({});

  useEffect(() => {
    const loadQr = async () => {
      const qrEntries = await Promise.all(
        enrollments.map(async (en) => [en._id, await generateQRCode(en._id)])
      );
      setQrMap(Object.fromEntries(qrEntries));
    };
    loadQr();
  }, [enrollments]);

  if (mode === "ID1") {
    return (
      <Document>
        {enrollments.map((en) => (
          <Page
            key={en._id}
            size="ID1"
            orientation="landscape"
            style={{
              fontFamily: "Cairo",
            }}
          >
            <StudentCard en={en} qrMap={qrMap} config={config} />
          </Page>
        ))}
      </Document>
    );
  }

  // 🔹 Multiple cards on A4 pages (grid layout)
  const cardsPerPage = 8; // 2x2 layout on A4
  const chunks = [];
  for (let i = 0; i < enrollments.length; i += cardsPerPage) {
    chunks.push(enrollments.slice(i, i + cardsPerPage));
  }

  return (
    <Document>
      {chunks.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.grid}>
            {chunk.map((en) => (
              <View key={en._id} style={styles.cardWrapper}>
                <StudentCard en={en} qrMap={qrMap} config={config} />
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}
