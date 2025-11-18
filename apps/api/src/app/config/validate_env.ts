import dotEnv from "dotenv";
import path from "node:path";
import { envValidationSchema } from "./env_validation_schema.js";

dotEnv.config({ path: path.resolve(process.cwd(), ".env") });
dotEnv.config({ path: path.resolve(process.cwd(), ".env.local") });

const parsedEnv = envValidationSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:\n");
  parsedEnv.error.issues.forEach((issue) => {
    const key = issue.path.join(".") || "(root)";
    console.error(` . ${key} => ${issue.message}`);
  });
  console.error("\n");
  process.exit(1);
}

export const env = parsedEnv.data;
