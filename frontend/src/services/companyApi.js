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
  return res.data
};
