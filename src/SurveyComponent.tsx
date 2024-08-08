import React, { useCallback } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";

const json = {
    "elements": [
      {
        "type": "paneldynamic",
        "name": "employment-history",
        "title": "Employment History",
        "templateElements": [
          {
            "type": "text",
            "name": "company",
            "title": "Company",
            "isRequired": true
          },
          {
            "type": "multipletext",
            "name": "employment-dates",
            "title": "Employment dates",
            "items": [
              {
                "name": "start",
                "isRequired": true,
                "inputType": "date",
                "title": "Start",
                "maxValueExpression": "today()"
              },
              {
                "name": "end",
                "isRequired": true,
                "inputType": "date",
                "title": "End",
                "minValueExpression": "{panel.employment-dates.start}",
                "maxValueExpression": "today()"
              }
            ]
          },
          {
            "type": "expression",
            "name": "days-employed",
            "title": "Days employed by {panel.company}:",
            "visibleIf": "{panel.company} notempty and {panel.employment-dates.start} notempty and {panel.employment-dates.end} notempty",
            "titleLocation": "left",
            "expression": "diffDays({panel.employment-dates.start}, {panel.employment-dates.end})"
          }
        ],
        "panelCount": 1,
        "panelAddText": "Add company"
      },
      {
        "type": "expression",
        "name": "total-days-employed",
        "title": "Total days employed:",
        "titleLocation": "left",
        "expression": "sumInArray({employment-history}, 'days-employed')"
      }
    ],
    "showQuestionNumbers": false,
    "checkErrorsMode": "onValueChanged"
  }

function SurveyComponent() {
    const survey = new Model(json);
    const alertResults = useCallback((sender) => {
        const results = JSON.stringify(sender.data);
        alert(results);
      }, []);

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onComplete.add(alertResults);
    return (<Survey model={survey} />);
}

export default SurveyComponent;