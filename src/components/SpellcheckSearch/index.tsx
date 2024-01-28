import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { images } from "../../constants/images";
import { IProps } from "./IProps";
import CustomButton from "../common/CustomButton";
import SpellcheckService from "../../services/SpellcheckService";
import SuggestionsModal from "../SuggestionsModal";
import { ISearchFormData } from "./ISearchFormData";

const SpellcheckSearch = ({ actionType }: IProps) => {
  const { handleSubmit, register } = useForm<ISearchFormData>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /**
   * Handles the search functionality.
   *
   * @param {ISearchFormData} data - the form data for the search
   * @return {void}
   */
  const handleSearch: SubmitHandler<ISearchFormData> = (data) => {
    const { word } = data;

    if (!word) {
      toast.warning("Please enter a word before searching.");
      return;
    }

    if (actionType === "search") {
      SpellcheckService.getSpellcheck(String(word))
        .then((response) => {
          if (response.correct) {
            toast.success("The word is found and correct.");
          } else {
            setSuggestions(response.suggestions);
            setShowModal(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            toast.error("The word is not found.");
          } else {
            toast.error("An error occurred. Please try again.");
            console.error("Error during spellcheck request:", error);
          }
        });
    }
  };

  /**
   * Handle modal close.
   */
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-md-6 col-lg-4">
            <h1
              className="text-center mb-4"
              style={{
                color: "#232323",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              {actionType === "search" ? "Search for a word" : ""}
            </h1>
            <div className="text-center">
              {actionType === "search" ? (
                <img
                  src={images.Search}
                  alt="Imagen"
                  className="imagen"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                ""
              )}
            </div>
            <form onSubmit={handleSubmit(handleSearch)}>
              <div className="input-group mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="word"
                  {...register("word")}
                />
                <CustomButton
                  type={"submit"}
                  className={`btn ${
                    actionType === "search" ? "btn-primary" : "btn-danger"
                  }`}
                  label={actionType === "search" ? "search" : ""}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <SuggestionsModal
        show={showModal}
        onHide={handleModalClose}
        onConfirm={() => setShowModal(false)}
        title="Suggestions"
        message={`Suggestions: ${suggestions.join(", ")}`}
      />
    </div>
  );
};

export default SpellcheckSearch;
