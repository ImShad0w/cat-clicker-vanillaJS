//Model part
class CatModel {
  constructor() {
    this.cats = [
      { image: "./images/xuxa_the_kitten.jpg", name: "Xuxa", counter: 0 },
      { image: "./images/fluffy_cat.jpg", name: "Fluffy", counter: 0 },
      { image: "./images/browny.jpg", name: "Browny", counter: 0 },
      { image: "./images/grayish.jpg", name: "Grayish", counter: 0 },
      { image: "./images/oreo.jpg", name: "Oreo", counter: 0 },
    ];
    this.selectedCat = null;
  }

  getAllCats() {
    return this.cats;
  }

  getCat(index) {
    return this.cats[index];
  }

  setSelectedCat(index) {
    this.selectedCat = this.cats[index];
  }

  incrementCounter() {
    if (this.selectedCat) {
      this.selectedCat.counter++;
    }
  }

  getSelectedCat() {
    return this.selectedCat;
  }
}

//View part
class CatView {
  constructor() {
    this.catListDiv = document.getElementById("catclicker");
    this.catShow = document.getElementById("catImg");
  }

  renderCatList(cats, onCatSelected) {
    this.catListDiv.innerHTML = "";
    cats.forEach((cat, index) => {
      const name = document.createElement("h1");
      name.textContent = cat.name;

      const catItem = document.createElement("li");
      catItem.classList.add("cat");
      catItem.dataset.id = index;

      catItem.appendChild(name);
      this.catListDiv.appendChild(catItem);
    });

    // Click event for selecting a cat
    this.catListDiv.addEventListener("click", (e) => {
      const catItem = e.target.closest(".cat");
      if (catItem) {
        const catIndex = Number(catItem.dataset.id);
        onCatSelected(catIndex);
      }
    });
  }

  renderCatDetails(cat, onImageClick) {
    this.catShow.innerHTML = "";
    if (!cat) return;

    const name = document.createElement("h1");
    const counter = document.createElement("p");
    const img = document.createElement("img");

    name.textContent = cat.name;
    counter.textContent = `Clicks: ${cat.counter}`;
    img.src = cat.image;
    img.alt = cat.name;
    img.style.width = "150px";

    img.addEventListener("click", onImageClick);

    this.catShow.appendChild(name);
    this.catShow.appendChild(counter);
    this.catShow.appendChild(img);
  }
}

//Controller part
class CatController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.renderCatList(this.model.getAllCats(), (index) =>
      this.selectCat(index),
    );
  }

  selectCat(index) {
    this.model.setSelectedCat(index);
    this.view.renderCatDetails(this.model.getSelectedCat(), () =>
      this.incrementCat(),
    );
  }

  incrementCat() {
    this.model.incrementCounter();
    this.view.renderCatDetails(this.model.getSelectedCat(), () =>
      this.incrementCat(),
    );
  }
}
//Start the app
document.addEventListener("DOMContentLoaded", () => {
  const app = new CatController(new CatModel(), new CatView());
  app.init();
});
