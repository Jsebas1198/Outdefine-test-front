import axiosInstance from "../config/axios";
import { ISpellcheck } from "../interfaces/spellcheck/ISpellcheck";
import MSpellcheck from "../models/MSpellcheck";

export default class SpellcheckService {
  /**
   * Asynchronously retrieves spellcheck data for a given word.
   *
   * @param {string} word - the word to perform spellcheck on
   * @return {Promise<MSpellcheck>} the spellcheck data wrapped in a Promise
   */
  public static async getSpellcheck(word: string): Promise<MSpellcheck> {
    try {
      const response = await axiosInstance.get<ISpellcheck>(`spell/${word}`);
      const spellcheckModel = new MSpellcheck(response.data);
      return spellcheckModel;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
