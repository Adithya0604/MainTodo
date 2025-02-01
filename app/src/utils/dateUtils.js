export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};
