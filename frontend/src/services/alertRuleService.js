import api from "./api";

export const getAlertRules = () =>
    api.get("/alert-rules");

export const getAlertRuleById = (id) =>
    api.get(`/alert-rules/${id}`);

export const createAlertRule = (data) =>
    api.post("/alert-rules", data);

export const updateAlertRule = (id, data) =>
    api.put(`/alert-rules/${id}`, data);

export const deleteAlertRule = (id) =>
    api.delete(`/alert-rules/${id}`);

export const updateAlertStatus = async (id, status) => {
    const response = await api.put(`/alerts/${id}/status?status=${status}`);
    return response.data;
};