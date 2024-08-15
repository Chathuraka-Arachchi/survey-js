import React from "react";
import { Model, Serializer, CustomWidgetCollection } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";

// Define the custom widget
const searchStringWidget = {
  name: "searchstring",
  isFit: function (question) {
    return question.getType() === "comment";
  },
  init() {
    Serializer.addProperty("comment", {
      name: "hasSearch:switch",
      category: "general",
    });
  },
  isDefaultRender: true,
  afterRender: function (question, el) {
    var mainDiv = document.createElement("div");
    var searchEl = document.createElement("input");
    searchEl.style.width = "calc(100% - 120px)";
    var btnEl = document.createElement("button");
    btnEl.innerText = "Search";
    btnEl.style.width = "120px";
    var searchIndex = 0;
    searchEl.onchange = function () {
      searchIndex = 0;
    };
    btnEl.onclick = function () {
      alert(JSON.stringify(question));
      var searchText = searchEl.value;
      var text = el.value;
      if (!searchText || !text) return;
      var index = text.indexOf(searchText, searchIndex + 1);
      if (index < 0 && searchIndex > -1) {
        index = text.indexOf(searchText, 0);
      }
      searchIndex = index;
      if (index > -1) {
        el.focus();
        el.setSelectionRange(index, index + searchText.length);
      }
    };
    mainDiv.appendChild(searchEl);
    mainDiv.appendChild(btnEl);
    el.parentElement.insertBefore(mainDiv, el.nextSibling);

    mainDiv.style.display = !question.hasSearch ? "none" : "";
    question.registerFunctionOnPropertyValueChanged("hasSearch", function () {
      mainDiv.style.display = !question.hasSearch ? "none" : "";
    });
  },
};

// Register the custom widget
CustomWidgetCollection.Instance.addCustomWidget(searchStringWidget, "customtype");

// Survey JSON
const json2 = {
  logoPosition: "right",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "comment",
          name: "feedback",
          title: "Please provide your feedback.",
          hasSearch: true, // This will toggle the search widget on
        },
        {
          type: "paneldynamic",
          name: "question2",
          title: "Last name",
          templateElements: [
            {
              type: "text",
              name: "lastname",
              title: "Lastname",
            },
          ],
        },
      ],
    },
  ],
};

// SurveyComponent
function SurveyComponent() {
  const survey = new Model(json2);

  return <Survey model={survey} />;
}

export default SurveyComponent;


// {
//     "total-days-employed": 14,
//     "employment-history": [
//        {
//           "days-employed": 14,
//           "company": "ch",
//           "address": "102",
//           "employment-dates": {
//              "start": "2024-08-01",
//              "end": "2024-08-15"
//           }
//        }
//     ]
//  }

// {
//     "total-days-employed": 7,
//     "employment-history": [
//        {
//           "days-employed": 7,
//           "address": "cd",
//           "company": "232",
//           "employment-dates": {
//              "start": "2024-08-01",
//              "end": "2024-08-08"
//           }
//        }
//     ]
//  }