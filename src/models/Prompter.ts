import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";
import { useCanvasStore } from "@stores/canvas";

export class Prompter {
  apiKey: string;
  prompt: string;

  constructor(apiKey: string, prompt: string) {
    this.apiKey = apiKey;
    this.prompt = prompt;
  }

  private static canvasStore = useCanvasStore();

  static rulesDescription = `
    rules,
    example: X=F[-X][+X],
    allowed rules:
      G = Move forward by line length,
      F = Move forward by line length,
      + = Turn left by turning angle,
      - = Turn right by turning angle,
      | = Turn 180 degrees,
      [ = Push current state onto stack,
      ] = Pop state from stack`;

  static axiomDescription = `axiom, example: X or XY`;

  static formInputSchema = z.object({
    iterations: z.number().describe("iterations"),
    angle: z.number().describe("angle"),
    axiom: z.string().describe(Prompter.axiomDescription),
    rules: z.string().describe(Prompter.rulesDescription),
    length: z
      .number()
      .describe("line length, example: 10, suggested length 20"),
  });

  async askAI() {
    const oai = new OpenAI({
      apiKey: this.apiKey ?? undefined,
      dangerouslyAllowBrowser: true,
    });

    const client = Instructor({
      client: oai,
      mode: "FUNCTIONS",
    });

    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: this.prompt }],
      model: "gpt-3.5-turbo",
      response_model: {
        schema: Prompter.formInputSchema,
        name: "L-System",
      },
    });

    return response;
  }
}
