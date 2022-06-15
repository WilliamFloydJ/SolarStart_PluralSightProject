/*jslint browser:true */
"use strict";

const addMonths = (el) => {
  const months = document.getElementById(el).getElementsByTagName("input");
  let annualUseKw = 0;
  for (let i = 0; i < months.length; i++) {
    let add = 0;
    add = Number(months[i].value);
    annualUseKw += add;
  }
  let dailyUseKw = annualUseKw / 365;
  return dailyUseKw;
};

const sunHours = () => {
  let hours;
  let theZone = document.forms.solarForm.zone.selectedIndex;

  theZone += 1;

  switch (theZone) {
    case 1:
      hours = 6;
      break;
    case 2:
      hours = 5.5;
      break;
    case 3:
      hours = 5;
      break;
    case 4:
      hours = 4.5;
      break;
    case 5:
      hours = 4;
      break;
    case 6:
      hours = 3.5;
      break;
    default:
      hours = 0;
      break;
  }
  return hours;
};

const outputCalc = () => {
  const selectedPanel = document.forms.solarForm.panel.selectedIndex;
  const panelOptions = document.forms.solarForm.panel.options;

  const powerOutput = panelOptions[selectedPanel].value;
  const panelName = panelOptions[selectedPanel].text;

  const panelInfo = [powerOutput, panelName];

  return panelInfo;
};

const calculateSun = () => {
  const sunHoursPerDay = sunHours();

  const dailyUseKw = addMonths("mpc");

  const minKwNeeds = dailyUseKw / sunHoursPerDay;

  const realKwNeeds = minKwNeeds * 1.25;

  const realWattNeeds = realKwNeeds * 1000;

  const panelInfo = outputCalc();

  const powerOutput = panelInfo[0];
  const panelName = panelInfo[1];

  const panelsNeeded = Math.ceil(realWattNeeds / powerOutput);

  let feedback = ``;
  feedback += `<p> Based on your average daily power usage of ${Math.round(
    dailyUseKw
  )} Kws, You will need to purchase ${panelsNeeded} ${panelName} panels in order to offset 100% of your electricity bill.</p>`;
  feedback += `<h2>Additional Details</h2>`;
  feedback += `<p> Your average daily consumption per day is ${Math.round(
    dailyUseKw
  )}.</p> `;
  feedback += `<p> Your average sunshine hours per day is ${sunHoursPerDay} hours.</p>`;
  feedback += `<p> Realistic Watts needed per hour is ${Math.round(
    realWattNeeds
  )} W/H </p>`;
  feedback += `<p> The ${panelName} panel you selected generates roughly ${powerOutput} Watts per hour.`;

  document.getElementById("feedback").innerHTML = feedback;
};
