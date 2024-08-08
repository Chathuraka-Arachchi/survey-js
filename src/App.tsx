// Uncomment the following line if you are using Next.js:
// 'use client'

import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const surveyJson = {
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
}

function App() {
  const survey = new Model(surveyJson);
  // console.log()
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);

  survey.onCompleting.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
