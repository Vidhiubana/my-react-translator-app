import React, { useEffect } from "react";
import countries from "../data";

const Translate = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const exchangeIcon = document.querySelector(".exchange");
    const selectTag = document.querySelectorAll("select");
    const icons = document.querySelectorAll(".icons i");
    const translateBtn = document.querySelector("button");

    const populateSelectTags = () => {
      selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
          let selected =
            id === 0
              ? country_code === "en-GB"
                ? "selected"
                : ""
              : country_code === "hi-IN"
              ? "selected"
              : "";
          let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
          tag.insertAdjacentHTML("beforeend", option);
        }
      });
    };

    const handleExchangeClick = () => {
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    };

    const handleKeyUp = () => {
      if (!fromText.value) {
        toText.value = "";
      }
    };

    const handleTranslateClick = () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach((data) => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute("placeholder", "Translation");
        });
    };

    const handleIconClick = (event) => {
      const target = event.target;
      if (target.classList.contains("fa-copy")) {
        let textToCopy = "";
        if (target.id === "from") {
          textToCopy = fromText.value || fromText.placeholder;
        } else if (target.id === "to") {
          textToCopy = toText.value || toText.placeholder;
        }
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            alert("Text copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      } else {
        let utterance;
        if (target.id === "from") {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTag[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
      }
    };

    populateSelectTags();
    exchangeIcon.addEventListener("click", handleExchangeClick);
    fromText.addEventListener("keyup", handleKeyUp);
    translateBtn.addEventListener("click", handleTranslateClick);
    icons.forEach((icon) => icon.addEventListener("click", handleIconClick));

    // Cleanup function to remove event listeners
    return () => {
      exchangeIcon.removeEventListener("click", handleExchangeClick);
      fromText.removeEventListener("keyup", handleKeyUp);
      translateBtn.removeEventListener("click", handleTranslateClick);
      icons.forEach((icon) =>
        icon.removeEventListener("click", handleIconClick)
      );
    };
  }, []); // Empty dependency array to run only once

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="mb-3">
            <label htmlFor="fromTextarea" className="form-label">
              From Text
            </label>
            <textarea
              className="form-control from-text"
              id="fromTextarea"
              rows="3"
              spellCheck="false"
              placeholder="Enter Text"
            ></textarea>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="toTextarea" className="form-label">
              Translation
            </label>
            <textarea
              readOnly
              className="form-control to-text"
              id="toTextarea"
              rows="3"
              spellCheck="false"
              placeholder="Translation"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <select className="form-select me-2"></select>
          <div className="icons">
            <i id="from" className="fas fa-volume-up me-2"></i>
            <i id="from" className="fas fa-copy"></i>
          </div>
        </div>
        <div className="exchange mx-3">
          <i className="fas fa-exchange-alt"></i>
        </div>
        <div className="d-flex align-items-center">
          <select className="form-select me-2"></select>
          <div className="icons">
            <i id="to" className="fas fa-volume-up me-2"></i>
            <i id="to" className="fas fa-copy"></i>
          </div>
        </div>
      </div>

      <button className="btn btn-primary w-100">Translate Text</button>
    </div>
  );
};

export default Translate;
