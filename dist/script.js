const data = fetch("/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => getData(data));

function getData(data) {
  //  data.filter((eventData)=>{
  //     if(chipArray.length === 0){
  //       return eventData;
  //     }
  //     else if(eventData.languages.includes(chipArray.values)){
  //       return eventData;
  //     }
  //   })
  // console.log(data.forEach((entry)=>{console.log(entry.languages.includes(chipArray.values))}));
  // console.log(data.forEach((entry)=>{console.log(entry.languages.some(r=> chipArray.includes(r)))}));
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
        <div class="item-role">${item.position}</div>
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

    // let tagSelect = document.querySelectorAll(".tag");
    // let chipSection = document.querySelector(".filter-chips");
    // let chipArray = [];

    // for (let i = 0; i < tagSelect.length; i++) {
    // tagSelect[i].onclick = () => {
    // chipSection.classList.remove("invisible");
    // if (!chipArray.includes(tagSelect[i].innerText)) {
    //   chipArray.push(tagSelect[i].innerText);
    //   chipSection.insertAdjacentHTML(
    //     "beforeend",
    //     `<div class="filter-tag">
    //     <p class="filter-label">${tagSelect[i].innerText}</p>
    //     <img src="images/icon-remove.svg" alt="close-icon" class="filter-close" onclick=closeFilter(event)>
    //     </div>`
    //   );
    // }
    // };
    // }
  });

  // let itemSelect = document.querySelectorAll('.item');
  // itemSelect.forEach((value)=>{
  //   let featuredText = value.childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[3];
  //   if(featuredText == undefined){
  //     value.style.border='none';
  //   }
  // })
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

  console.log(chipArray);


    // const data = fetch("/data.json")
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   // let filteredData = data.filter((x) => x.role === "Frontend");
    //   let filteredData = data.filter((x) => x.languages.includes('HTML'));
    //   console.log(filteredData);

    //   let container = document.querySelector(".main-container");
    //   let firstItem = container.firstElementChild;
    //   //using for loop
    //   for (i = 0; i < container.children.length;) {
    //     container.children[0].remove();
    //   }
    //   getData(filteredData);
    // });
}

function closeFilter(e) {
  let chipSection = document.querySelector(".filter-chips");
  let remEl = e.target.parentNode.children[0].innerText;
  chipArray = chipArray.filter((chip) => chip !== remEl);

  e.target.parentNode.remove();
  if (chipSection.children.length == 0) {
    chipSection.classList.add("invisible");
  }



  const data = fetch("/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    getData(data);
  });
}
