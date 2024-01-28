import { ISpellcheck } from "../interfaces/spellcheck/ISpellcheck";

export default class MSpellcheck {
  public suggestions: string[];
  public correct: boolean;

  constructor(spellcheck: ISpellcheck) {
    this.suggestions = spellcheck.suggestions;
    this.correct = spellcheck.correct;
  }
}
