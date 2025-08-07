import api from ".";

export const fetchTeachers = async () => {
  const res = await api.get("/users/teachers");
  return res.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};
