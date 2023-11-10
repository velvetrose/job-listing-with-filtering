const data = fetch("/job-listing-with-filtering/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => getData(data));

function getData(data) {

  data.forEach((item) => {
    let twClass = item.featured
      ? " border-l-4 border-l-cyan-desaturated-dark"
      : "";
    let container = document.querySelector(".main-container");
    container.insertAdjacentHTML(
      "beforeend",
      `
    <div class="item ${twClass}">
    <div class="item-info">
      <img src="${item.logo}" alt="company-logo" class="profile-icon">
      <div class="item-details">
        <div class="item-header">
          <div class="item-name">${item.company}</div>
          <div class="item-badges">
          ${checkTrue(item)}
          </div>
        </div>
        <div class="item-role" onclick="filterRole('${item.role}')">${item.position}</div>
        <ul class="item-desc">
          <li>${item.postedAt}</li>
          <li>${item.contract}</li>
          <li>${item.location}</li>
        </ul>
      </div>
    </div>
    <div class="tags">
      <div class="tag" onclick=addFilter(event)>${item.role}</div>
      <div class="tag" onclick=addFilter(event)>${item.level}</div>
      ${child(item.languages)}
      ${child(item.tools)}
    </div>
  </div>`
    );

  });
}
function child(param) {
  let str = "";
  param.forEach((val) => {
    str = str + `<div class="tag" onclick=addFilter(event)>${val}</div>`;
  });
  return str;
}
function checkTrue(a) {
  let str = "";
  if (a.new == true) str += `<div div class="item-badge-new">NEW!</div>`;
  if (a.featured == true)
    str += `<div class="item-badge-featured">FEATURED</div>`;
  return str;
}

let chipArray = [];

function filterRole(role) {
  console.log(role);
  let chipSection = document.querySelector(".filter-chips");
  chipSection.classList.remove("invisible");

  if (!chipArray.includes(role)) {
    chipArray.push(role);
    // console.log(chipArray);
    chipSection.insertAdjacentHTML(
      "beforeend",
      `<div class="filter-tag">
      <p class="filter-label">${role}</p>
      <img src="images/icon-remove.svg" alt="close-icon" class="filter-close" onclick=closeFilter(event)>
      </div>`
    );
  }

  const data = fetch("/job-listing-with-filtering/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let filteredData = data.filter((x) =>
        chipArray.every(
          (i) =>
            x.role.includes(i) ||
            x.level.includes(i) ||
            x.languages.includes(i) ||
            x.tools.includes(i)
        )
      );
      let container = document.querySelector(".main-container");
      let firstItem = container.firstElementChild;
      //using for loop
      for (i = 0; i < container.children.length; ) {
        container.children[0].remove();
      }
      getData(filteredData);
    });
}
function addFilter(e) {
  let chipSection = document.querySelector(".filter-chips");
  chipSection.classList.remove("invisible");

  if (!chipArray.includes(e.target.innerText)) {
    chipArray.push(e.target.innerText);
    // console.log(chipArray);
    chipSection.insertAdjacentHTML(
      "beforeend",
      `<div class="filter-tag">
      <p class="filter-label">${e.target.innerText}</p>
      <img src="images/icon-remove.svg" alt="close-icon" class="filter-close" onclick=closeFilter(event)>
      </div>`
    );
  }

  console.log("Chip Values ", chipArray);

  const data = fetch("/job-listing-with-filtering/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // let filteredData = data.filter((x) => x.role === "Frontend");
      // let filteredData = data.filter((x) => x.languages.includes('HTML'));
      let filteredData = data.filter((x) =>
        chipArray.every(
          (i) =>
            x.role.includes(i) ||
            x.level.includes(i) ||
            x.languages.includes(i) ||
            x.tools.includes(i)
        )
      );
      console.log("Active Chips ", filteredData);
      // filteredData.sort((a, b) => a.id - b.id);
      let container = document.querySelector(".main-container");
      let firstItem = container.firstElementChild;
      //using for loop
      for (i = 0; i < container.children.length; ) {
        container.children[0].remove();
      }
      getData(filteredData);
    });
}

function closeFilter(e) {
  let chipSection = document.querySelector(".filter-chips");
  let remEl = e.target.parentNode.children[0].innerText;
  chipArray = chipArray.filter((chip) => chip !== remEl);

  e.target.parentNode.remove();
  if (chipSection.children.length == 0) {
    chipSection.classList.add("invisible");
  }

  console.log(chipArray.length);

  const data = fetch("/job-listing-with-filtering/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      let filteredData = data.filter((x) =>
        chipArray.every(
          (i) =>
            x.role.includes(i) ||
            x.level.includes(i) ||
            x.languages.includes(i) ||
            x.tools.includes(i)
        )
      );
      console.log("Active Chips after Closing ", filteredData);
      let container = document.querySelector(".main-container");
      let firstItem = container.firstElementChild;
      //using for loop
      for (i = 0; i < container.children.length; ) {
        container.children[0].remove();
      }
      getData(filteredData);
    });
}
