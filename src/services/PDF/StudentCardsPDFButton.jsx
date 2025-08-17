import { PDFDownloadLink } from "@react-pdf/renderer";
import StudentCardsPDF from "./StudentCardsPDF";
import { Button } from "@/components/ui/button";

export default function StudentCardsPDFButton({ enrollments, config, mode }) {
  return (
    <PDFDownloadLink
      document={<StudentCardsPDF enrollments={enrollments} config={config} mode={mode} />}
      fileName="student-cards.pdf"
    >
      {({ loading }) =>
        loading ? (
          <Button variant="ghost">جاري التحضير...</Button>
        ) : (
          <Button>طباعة</Button>
        )
      }
    </PDFDownloadLink>
  );
}
