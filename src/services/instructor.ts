import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
  organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
  client: oai,
  mode: "FUNCTIONS"
})

const UserSchema = z.object({
  // Description will be used in the prompt
  age: z.number().describe("The age of the user"), 
  name: z.string()
})

const formInputSchema = z.object({
  // Description will be used in the prompt
  iterations: z.number().describe("iterations"), 
  name: z.number().describe('angle'),
  axiom: z.string().describe('axiom, example: X'),
  rules: z.string().describe('rules, example: X=F[-X][+X]'),
  length: z.string().describe('length, example: 5'),
});

const responseForInput = await client.chat.completions.create({
  messages: [{ role: "user", content: "Jason Liu is 30 years old" }],
  model: "gpt-3.5-turbo",
  response_model: { 
    schema: formInputSchema, 
    name: "User"
  }
});


// User will be of type z.infer<typeof UserSchema>
const user = await client.chat.completions.create({
  messages: [{ role: "user", content: "Jason Liu is 30 years old" }],
  model: "gpt-3.5-turbo",
  response_model: { 
    schema: UserSchema, 
    name: "User"
  }
})

console.log(user)
// { age: 30, name: "Jason Liu" }
