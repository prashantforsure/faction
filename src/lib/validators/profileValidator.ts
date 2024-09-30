import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  emailVerified: z.date().nullable(),
  username: z.string().nullable(),
  image: z.string().nullable(),
  
  createdSubreddits: z.array(z.unknown()),  // Placeholder for Subreddit type
  subscriptions: z.array(z.unknown()),      // Placeholder for Subscription type
  votes: z.array(z.unknown()),              // Placeholder for Vote type
  accounts: z.array(z.unknown()),           // Placeholder for Account type
  sessions: z.array(z.unknown()),           // Placeholder for Session type
  Post: z.array(z.unknown()),               // Placeholder for Post type
  Comment: z.array(z.unknown()),            // Placeholder for Comment type
  CommentVote: z.array(z.unknown()),        // Placeholder for CommentVote type
});

type User = z.infer<typeof UserSchema>;

export { UserSchema };