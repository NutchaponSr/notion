import { departments, positions } from "@/db/schema";
import { z } from "zod";

export const RequestSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().email(),
  department: z.enum([...departments.enumValues, ""], { required_error: "Required" }),
  position: z.enum([...positions.enumValues, ""], { required_error: "Required" }),
  description: z.string().trim().nullable(),
});