import apiClient from "./apiClient";

/*
 * =========================================================
 * QUANTITY MEASUREMENT SERVICE
 * =========================================================
 * Base URL: /api/v1/quantities  (matches backend controller)
 */

const conversionService = {
  /*
   *  COMPARE
   * POST /api/v1/quantities/compare
   */
  compare: async (data) => {
    const res = await apiClient.post("/api/v1/quantities/compare", data);
    return res.data;
  },

  /*
   *  CONVERT
   * POST /api/v1/quantities/convert
   */
  convert: async (data) => {
    const res = await apiClient.post("/api/v1/quantities/convert", data);
    return res.data;
  },

  /*
   *  ADD
   * POST /api/v1/quantities/add
   */
  add: async (data) => {
    const res = await apiClient.post("/api/v1/quantities/add", data);
    return res.data;
  },

  /*
   *  SUBTRACT
   * POST /api/v1/quantities/subtract
   */
  subtract: async (data) => {
    const res = await apiClient.post("/api/v1/quantities/subtract", data);
    return res.data;
  },

  /*
   *  DIVIDE
   * POST /api/v1/quantities/divide
   */
  divide: async (data) => {
    const res = await apiClient.post("/api/v1/quantities/divide", data);
    return res.data;
  },

  /*
   *  HISTORY BY TYPE
   * GET /api/v1/quantities/history/type/{type}
   */
  getByType: async (type) => {
    const res = await apiClient.get(`/api/v1/quantities/history/type/${type}`);
    return res.data;
  },

  /*
   *  COUNT
   * GET /api/v1/quantities/count/{operation}
   */
  getCount: async (operation) => {
    const res = await apiClient.get(`/api/v1/quantities/count/${operation}`);
    return res.data;
  },
};

export default conversionService;
