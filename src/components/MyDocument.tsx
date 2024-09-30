import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from "@react-pdf/renderer";
import React, { FC } from "react";

// Стили для PDF документа
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Типы для пропсов компонента
interface MyDocumentProps {
  name: string;
  picture: string; // URL или Base64 кодированное изображение
}

// Компонент документа PDF
const MyDocument: FC<MyDocumentProps> = ({ name, picture }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{name}</Text>
      </View>
      <View style={styles.section}>{picture && <Image src={picture} />}</View>
    </Page>
  </Document>
);

export default MyDocument;
