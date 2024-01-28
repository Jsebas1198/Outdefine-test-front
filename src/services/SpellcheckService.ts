import { AxiosResponse } from "axios";
import axiosInstance from "../config/axios";
import { IGetSpellcheckResponse } from "../interfaces/spellcheck/IGetSpellcheckResponse";

export default class SpellcheckService {
  /**
   * Retrieves spellcheck for a given word.
   *
   * @param {string} word - the word to spellcheck
   * @return {Promise<AxiosResponse<IGetSpellcheckResponse>>} the spellcheck response
   */
  public static async getSpellcheck(
    word: string
  ): Promise<AxiosResponse<IGetSpellcheckResponse>> {
    try {
      const response = await axiosInstance.get(`spell/${word}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
