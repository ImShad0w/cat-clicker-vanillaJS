const catDiv = document.getElementById("catclicker");
const catShow = document.getElementById("catImg");

const cats = [
  { image: "./images/xuxa_the_kitten.jpg", name: "Xuxa", counter: 0 },
  { image: "./images/fluffy_cat.jpg", name: "Fluffy", counter: 0 },
  { image: "./images/browny.jpg", name: "Browny", counter: 0 },
  { image: "./images/grayish.jpg", name: "Grayish", counter: 0 },
  { image: "./images/oreo.jpg", name: "Oreo", counter: 0 },
];

let id = 0;
cats.forEach((cat) => {
  //Create the elements
  const name = document.createElement("h1");
  const catItem = document.createElement("li");

  //Add styles and text
  catItem.classList.add("cat");
  name.textContent = cat.name;
  catItem.dataset.id = id++;

  //Append all elements
  catItem.appendChild(name);
  catDiv.appendChild(catItem);
});

catDiv.addEventListener("click", (event) => {
  // Find the closest `.cat` element to whatever was clicked
  const catItem = event.target.closest(".cat");
  if (!catItem) return; // Clicked outside a cat item

  // Make sure the click was on an text
  if (event.target.tagName === "H1") {
    const catId = Number(catItem.dataset.id);
    const cat = cats[catId];
    if (!cat) return;

    //If found we first clear out the previous cat that was inside of the container
    catShow.innerHTML = "";
    //We add the click
    cat.counter++;
    //Create the elements
    const name = document.createElement("h1");
    const counter = document.createElement("p");
    const img = document.createElement("img");

    name.textContent = cat.name;
    counter.textContent = `Clicks: ${cat.counter}`;
    img.src = cat.image;
    img.style.width = "150px";
    img.alt = cat.name;

    catShow.appendChild(name);
    catShow.appendChild(counter);
    catShow.appendChild(img);
  }
});
