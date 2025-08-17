import { View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import img from "@/assets/images/avatar.png";

// ID-1 card size = 153 x 243 points
const styles = StyleSheet.create({
  card: {
    width: 243,
    height: 153,
    flexDirection: "row-reverse",
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
  },
  left: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    color: "#fff",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    objectFit: "cover",
  },
  studentName: {
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  kindergarten: {
    fontSize: 8,
    marginTop: 2,
    textAlign: "center",
  },
  right: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 6,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row-reverse",
    width: "100%",
    textAlign: "right",
    fontSize: 8,
    marginTop: 2,
  },
  label: {
    width: "45%",
    color: "#6b7280",
  },
  value: {
    width: "55%",
  },
  qrContainer: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 4,
  },
  qr: {
    width: 40,
    height: 40,
  },
});

export default function StudentCard({ en, config, qrMap }) {
  return (
    <View style={styles.card}>
      {/* Left side: Photo + name */}
      <View style={styles.left}>
        <Image
          src={
            en?.student?.image
              ? import.meta.env.VITE_API_URL_PICTURE + en?.student?.image
              : img
          }
          style={styles.avatar}
        />
        <Text style={styles.studentName}>
          {`${en?.student?.firstName} ${en?.student?.lastName}`}
        </Text>
        <Text style={styles.kindergarten}>
          {config?.kindergraten || "Rawdatee"}
        </Text>
      </View>

      {/* Right side: Info + QR */}
      <View style={styles.right}>
        <View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>الزمرة</Text>
            <Text style={styles.value}>
              {en?.student?.bloodGroup || "غير محدد"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>الفصل</Text>
            <Text style={styles.value}>{en?.class?.className}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>السنة</Text>
            <Text style={styles.value}>{en?.academicYear}</Text>
          </View>
        </View>

        <View style={styles.qrContainer}>
          {qrMap[en._id] && <Image src={qrMap[en._id]} style={styles.qr} />}
        </View>
      </View>
    </View>
  );
}
