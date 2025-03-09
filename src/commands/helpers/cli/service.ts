import {
  Checkbox,
  Confirm,
  Input,
  Number,
  prompt,
  PromptOptions,
} from 'jsr:@cliffy/prompt@1.0.0-rc.7';

const getType = (
  type: string,
): typeof Input | typeof Confirm | typeof Number | typeof Checkbox => {
  switch (type) {
    case 'string':
      return Input;
    case 'confirm':
      return Confirm;
    case 'number':
      return Number;
    case 'array':
      return Checkbox;
    default:
      throw new Error(`Invalid question type: ${type}`);
  }
};

export interface ServiceQuestion {
  name: string;
  type: 'string' | 'confirm' | 'number' | 'array';
  message: string;
  default?: string;
}

export const getServiceQuestions = async (questions: ServiceQuestion[]) => {
  const prompts = questions.map((question) => {
    console.log('question:', question);
    const type = getType(question.type);

    return { ...question, type };
  });

  console.log(prompts);

  if (prompts.length > 0) {
    return await prompt(prompts as [PromptOptions<string, any>]);
  } else {
    throw new Error('No prompts available');
  }
};

export const importQuestionJson = async (service: string) => {
  try {
    const jsonPath =
      `${Deno.cwd()}/src/commands/init/questions/${service}.json`;

    console.log(jsonPath);

    const rawJson = await Deno.readTextFile(jsonPath);
    const questionsData = JSON.parse(rawJson) as ServiceQuestion[];

    return questionsData;
  } catch (error) {
    console.error(
      `There was an error trying to import questions for ${service}: ${error}`,
    );
  }
};
