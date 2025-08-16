import { PDFDownloadLink } from "@react-pdf/renderer";
import StudentCardsPDF from "./StudentCardsPDF";
import { Button } from "@/components/ui/button";

export default function StudentCardsPDFButton({ enrollments, config }) {
  return (
    <PDFDownloadLink
      document={<StudentCardsPDF enrollments={enrollments} config={config} />}
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
