import { Property} from "@/types/property";
import axios from "axios";


const BASE_URL = "http://localhost:4000";

export const PropertyService = {
  async getAll(): Promise<Property[]> {
    const res = await axios.get(`${BASE_URL}/properties`)
    return res.data
  },

  async getById(id: number) : Promise<Property> {
    const res = await axios.get(`${BASE_URL}/properties/${id}`)
    return res.data
  },

  async create(data: Omit<Property, "id">) : Promise<Property> {
    const res = await axios.post(`${BASE_URL}/properties`, data)
    return res.data
  },

  async update(id: number, data: Partial<Property>): Promise<Property> {
    const res = await axios.put(`${BASE_URL}/properties/${id}`, data)

    return res.data
  },
  async delete(id: number,): Promise<void> {
    await axios.delete(`${BASE_URL}/properties/${id}`, )
  }
};
