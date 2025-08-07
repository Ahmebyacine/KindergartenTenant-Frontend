import api from ".";

export const fetchStudents = async () => {
  const res = await api.get("/enrollments");
  return res.data;
};
