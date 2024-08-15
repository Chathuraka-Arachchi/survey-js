// Uncomment the following line if you are using Next.js:
// 'use client'

import { useCallback } from 'react';

import 'survey-core/defaultV2.min.css';
import { Model, settings } from 'survey-core';
import { Survey } from 'survey-react-ui';
settings.lazyRender.enabled = false;
const surveyJson = {
  "pages": [
    {
      "name": "Patiant Questions",
      "elements": [
        {
          "type": "panel",
          "name": "personal-information",
          "title": "Allergies & reactive considerations",
          "state": "expanded",
          "elements": [
            {
              "type": "text",
              "name": "first-name",
              "title": "Allergy type",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "last-name",
              "startWithNewLine": false,
              "title": "Description",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "Date",
              "title": "Date",
              "isRequired": true,
              "inputType": "date",
              "autocomplete": "bday",
              "maxValueExpression": "today()"
            },
            {
              "type": "dropdown",
              "name": "country",
              "startWithNewLine": false,
              "title": "Allergy category",
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
          "title": "Patiant Details",
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
        },
        {
          "type": "paneldynamic",
          "name": "employment-history",
          "title": "Sorcial & personal summary",
          "templateElements": [
            {
              "type": "text",
              "name": "company",
              "title": "personal summary",
              "isRequired": true
            },
            {
              "type": "multipletext",
              "name": "employment-dates",
              "title": "Sorcial details",
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
        }
      ]
    }
  ],
  "showQuestionNumbers": "off",
  "questionErrorLocation": "bottom"
}

var searchStringWidget = {
  name: "searchstring",
  isFit: function (question) {
    return question.getType() == "text";
  },
  init() {
    Survey.Serializer.addProperty("text", {
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
    el.parentElement.insertBefore(mainDiv, el);

    mainDiv.style.display = !question.hasSearch ? "none" : "";
    question.registerFunctionOnPropertyValueChanged(
      "hasSearch",
      function () {
        mainDiv.style.display = !question.hasSearch ? "none" : "";
      }
    );
  },
};



function validateDomain(_, options) {
  if (options.name === "first-name") {
    const email = options.value;

    if (!email)
      return;

    const domain = email.trim().substring(email.indexOf("@") + 1);
    if (domain !== "surveyjs.io") {
      options.error = "Please enter an e-mail address hosted at surveyjs.io.";
    }
  }
}

function updateStringComponents(_, options) {
  // console.log(JSON.stringify(options, null, 3), '******');
    options.htmlElement.querySelectorAll('.sd-question__content').forEach((el) => {
     // Check if the button already exists to avoid adding multiple buttons
     if (!el.parentElement.querySelector('.custom-action-button')) {
      // Create a new button element
      const button = document.createElement('button');
      button.innerText = 'Custom Action';
      button.className = 'custom-action-button';

      // Add an event listener to the button
      button.addEventListener('click', () => {
          // Define what happens when the button is clicked
          //alert('Button clicked after: ' + strings[0]);

          // Get the previous sibling element
      const previousElement = button.previousElementSibling;
      if (previousElement) {
        // Find the input element within the previous sibling
        const inputElement = previousElement.querySelector('input');
        
        if (inputElement) {
            const inputElementId = inputElement.id;
            console.log('Input element id:', inputElementId);
            //alert('Input element id:' + inputElementId.slice(0, -1))
            // You can do something with inputElementId here

             // Get the element by its ID
          const element = document.getElementById(inputElementId.slice(0, -1));
    
          if (element) {
              // Get the value of the "data-name" attribute
              const dataNameValue = element.getAttribute('data-name');
              console.log(`data-name value for element with ID:`, dataNameValue);
              alert(dataNameValue + `data-name value for element with ID:` )
              return dataNameValue;
          } else {
              console.log(`Element with ID   not found.`);
              return null;
          }
            
        } else {
            console.log('No input element found in the previous sibling.');
        }
    } else {
        console.log('No previous element found.');
    }
      });

      // Append the button after the question element
      el.parentElement.appendChild(button);
    }
    });
}

function App() {
  const survey = new Model(surveyJson);
  // console.log()
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    alert(results);
  }, []);
  survey.onValidateQuestion.add(validateDomain);
  //survey.onAfterRenderQuestion.add(updateStringComponents);
  survey.onCompleting.add(alertResults);
  survey.onValueChanged.add((e, options) => {
   // console.log(JSON.stringify(options, null, 3), '******');
});

// Survey.CustomWidgetCollection.Instance.add(
//   searchStringWidget
// );

  return <Survey model={survey} />;
}

export default App;



// import React from 'react';
// import { createRoot } from 'react-dom/client';

// const AsyncParagraph = (props) => {
//   const { dataVersion, loadData } = props;
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     let isMounted = true;
//     loadData().then((result) => {
//       if (isMounted) setData(result);
//     });
//     return () => {
//       isMounted = false;
//     };
//   }, [dataVersion, loadData]);

//   return <p>{data}</p>;
// };

// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById("root"));

// root.render(<AsyncParagraph dataVersion="10"
//   loadData={ 
//              () => { 
//                return new Promise((resolve, reject) => { resolve("Data!"); }); 
//              } 
//            }
// />);

// setTimeout(() => console.log(document.getElementById("root").innerHTML), 300);