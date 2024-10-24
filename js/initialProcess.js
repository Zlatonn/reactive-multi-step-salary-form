export let pageStores = [
  {
    name: "Income",
    leftDetail: ["Salary", "Extra", "Bonus", "Investment", "Other"],
    rightDetail: 2,
  },
  {
    name: "Expenses",
    leftDetail: ["Housing", "Food", "Transportation", "Healthcare", "Education", "Other"],
    rightDetail: 2,
  },
  {
    name: "Summary",
    leftDetail: 2,
    rightDetail: 2,
  },
];

/** Create Bullet */
export function createBullet() {
  const stepContainer = document.querySelector(".step-container");

  pageStores.forEach((e, i) => {
    const stepBox = createStepBox(i, e.name);
    stepContainer.appendChild(stepBox);

    if (i < pageStores.length - 1) {
      const stepLine = document.createElement("div");
      stepLine.classList.add("step-line");
      stepContainer.appendChild(stepLine);
    }
  });
}

function createStepBox(i, name) {
  const stepBox = document.createElement("div");
  stepBox.classList.add("step-box");

  const stepNum = document.createElement("div");
  stepNum.classList.add("step-num");
  stepNum.innerHTML = i + 1;

  const stepDetail = document.createElement("div");
  stepDetail.classList.add("step-detail");
  stepDetail.innerHTML = name;

  stepBox.append(stepNum, stepDetail);

  return stepBox;
}

/** Create Card */
export function createCard() {
  const cardContainer = document.querySelector(".card-container");

  pageStores.forEach((e) => {
    const cardBox = createCardBox(e);
    cardContainer.appendChild(cardBox);
  });
}

function createCardBox(e) {
  const cardBox = document.createElement("div");
  cardBox.classList.add("card-box");

  const cardTitle = createCardTitle(e.name);
  const cardDetail = createCardDetail(e);

  cardBox.append(cardTitle, cardDetail);

  return cardBox;
}

function createCardTitle(name) {
  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title");
  cardTitle.innerHTML = name;

  return cardTitle;
}

function createCardDetail(e) {
  const cardDetail = document.createElement("div");
  cardDetail.classList.add("card-detail");

  const leftBox = createDetailBox(e.leftDetail, "left", e.name);
  const rightBox = createDetailBox(e.rightDetail, "right", e.name);

  cardDetail.append(leftBox, rightBox);
  return cardDetail;
}

function createDetailBox(detailData, side, name) {
  const box = document.createElement("div");
  box.classList.add(`${side}-box`);

  if (Array.isArray(detailData)) {
    detailData.forEach((detail) => box.appendChild(createSubDetail(detail, side, name)));
  } else {
    for (let count = 0; count < detailData; count++) {
      box.appendChild(createSubDetail("", side, name, count));
    }
  }

  return box;
}

function createSubDetail(text, side, name, count = "") {
  const subDetail = document.createElement("div");
  subDetail.classList.add("sub-detail");

  const pText = document.createElement("p");
  const input = text ? createInputField(name, text) : "";

  pText.innerHTML = text
    ? (text === "Bonus" && name === "Income") || (text === "Investment" && name === "Income")
      ? `${text} <span style="color: rgb(94, 146, 242);">/year</span>`
      : `${text} <span style="color: rgb(94, 146, 242);">/month</span>`
    : ``;
  pText.id = text ? `` : `${name.toLowerCase()}-${side}-text-${count + 1}`;
  subDetail.appendChild(pText);

  if (input) {
    subDetail.appendChild(input);
  }

  return subDetail;
}

function createInputField(name, text) {
  const input = document.createElement("input");
  input.type = "number";
  input.value = 0;
  input.min = "0";
  input.id = `${name.toLowerCase()}-${text.toLowerCase()}-input`;

  return input;
}

/** Create Handle */
export function createHandler() {
  const bodyBox = document.querySelector(".body-box");

  const handler = document.createElement("div");
  handler.classList.add("handler");
  bodyBox.appendChild(handler);

  const prevBtn = createHandlerButton("prev");
  const nextBtn = createHandlerButton("next");
  const clearBtn = createHandlerButton("clear");

  handler.append(prevBtn, nextBtn, clearBtn);
}

function createHandlerButton(typeBtn) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = `${typeBtn}-btn`;

  switch (typeBtn) {
    case "prev":
      btn.innerHTML = `<i class="ri-arrow-left-s-fill"></i> Prev`;
      break;
    case "next":
      btn.innerHTML = `Next <i class="ri-arrow-right-s-fill"></i>`;
      break;
    case "clear":
      btn.innerHTML = `Clear`;
      break;
  }

  return btn;
}
