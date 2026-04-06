import { COMPANY_API_END_PORT } from "@/utils/constant";
import axios from "axios";

export const createCompanyApi = async (companyName) => {
  const res = await axios.post(
    `${COMPANY_API_END_PORT}/register`,
    {
      companyName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
  return res.data;
};

export const editCompanyApi = async (companyId, formData) => {
  const res = await axios.put(
    `${COMPANY_API_END_PORT}/update/${companyId}`,
    formData,
  );
  return res.data;
};
