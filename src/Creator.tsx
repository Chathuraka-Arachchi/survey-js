// Uncomment the following line if you are using Next.js:
// 'use client'

import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showThemeTab: true
};

const defaultJson = {
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            "type": "panel",
            "name": "personal-information",
            "title": "Personal Information",
            "state": "expanded",
            "elements": [
              {
                "type": "text",
                "name": "first-name",
                "title": "First name",
                "isRequired": true
              },
              {
                "type": "text",
                "name": "first-name",
                "title": "First name",
                "isRequired": true
              },
              {
                "type": "text",
                "name": "last-name",
                "startWithNewLine": false,
                "title": "Last name",
                "isRequired": true
              },
              {
                "type": "text",
                "name": "birthdate",
                "title": "Birthdate",
                "isRequired": true,
                "inputType": "date",
                "autocomplete": "bday",
                "maxValueExpression": "today()"
              },
              {
                "type": "dropdown",
                "name": "country",
                "startWithNewLine": false,
                "title": "Country",
                "choicesByUrl": {
                  "url": "https://surveyjs.io/api/CountriesExample",
                  "valueName": "name"
                }
              }
            ]
          },
          {
            "type": "panel",
            "name": "contact-information",
            "title": "Contact Information",
            "state": "expanded",
            "elements": [
              {
                "type": "text",
                "name": "email",
                "title": "E-mail address",
                "inputType": "email",
                "autocomplete": "email"
              },
              {
                "type": "text",
                "name": "phone",
                "startWithNewLine": false,
                "title": "Phone number",
                "inputType": "tel",
                "autocomplete": "tel"
              },
              {
                "type": "text",
                "name": "skype",
                "startWithNewLine": false,
                "title": "Skype"
              }
            ]
          }
        ]
      }
    ],
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom"
  };

export function SurveyCreatorWidget() {
  const creator = new SurveyCreator(creatorOptions);
  creator.text =  JSON.stringify(defaultJson);
  creator.saveSurveyFunc = (saveNo, callback) => { 
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
    // saveSurveyJson(
    //     "https://your-web-service.com/",
    //     creator.JSON,
    //     saveNo,
    //     callback
    // );
  };
  return (
    <SurveyCreatorComponent creator={creator} />
  )
}

function saveSurveyJson(url, json, saveNo, callback) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(json)
  })
  .then(response => {
    if (response.ok) {
      callback(saveNo, true);
    } else {
      callback(saveNo, false);
    }
  })
  .catch(error => {
    callback(saveNo, false);
  });
}