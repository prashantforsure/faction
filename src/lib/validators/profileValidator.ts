import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  about: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  username: z.string().nullable(),
  image: z.string().nullable(),
 
});

type User = z.infer<typeof UserSchema>;

export { UserSchema };
export type { User };
