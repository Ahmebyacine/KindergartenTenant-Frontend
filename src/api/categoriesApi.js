import api from "@/api";

// Fetch Functions
export const fetchTabs = async () => {
  const response = await api.get("/categories");
  return response.data.map((category) => ({
    id: category._id,
    label: category.name,
    name: category.name,
  }));
};

export const fetchCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};
