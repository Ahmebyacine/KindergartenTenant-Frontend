import api from "@/api";

export const fetchClasses = async () => {
  const response = await api.get("/classes");
  return response.data;
};
