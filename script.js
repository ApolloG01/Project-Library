"use strict";

const dialogX = document.querySelector("dialog");
const container = document.querySelector(".container");
const cancelButton = document.querySelector('button[value="cancel"]');
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[required]");

// Add error spans for each input
inputs.forEach((input) => {
  input.addEventListener("input", validateField);
  input.addEventListener("invalid", handleInvalid);
});

const myLibrary = [];

class Book {
  constructor(title, author, pages, read, notes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.notes = notes || "No notes";
  }
}

// Add book to library
function addBookToLibrary(book) {
  return myLibrary.push(book);
}

// Beginning list of books
addBookToLibrary(
  new Book("MESSAGGIO AL POPOLO", "Marcus Mosiah Garvey", 295, false)
);
addBookToLibrary(new Book("Metamorphosis", "Franz kafka", 243, false));
addBookToLibrary(
  new Book(
    "The African Origin of Civilization",
    "Cheikh Anta Diop",
    312,
    true,
    "Read 22 pages"
  )
);
addBookToLibrary(
  new Book("Skin in the Game", "Nassim Nicholas Taleb", 277, true)
);
addBookToLibrary(
  new Book("WISE WORDS FROM BLACK ICONS", "EDGAR CHECKERA", 100, false)
);
addBookToLibrary(
  new Book("History of West Africa", "Captivating History", 134, true)
);
addBookToLibrary(
  new Book("THE ART OF WAR", "SUN TZU", 100, true, "Read 44 pages")
);
addBookToLibrary(new Book("STOLEN LEGACY", "GEORGE G.M. JAMES", 151, false));
addBookToLibrary(
  new Book(
    "TACCUINO DI UN VECCHIO SPORCACCIONE",
    "CHARLES BUKOWSKI",
    142,
    false
  )
);
addBookToLibrary(
  new Book("Feel the fear and do it anyway", "Susan Jeffers", 100, true)
);
addBookToLibrary(new Book("Post Office", "Charles Bukowski", 100, true));
addBookToLibrary(new Book("Novecento", "Alessandro Baricco", 62, false));
addBookToLibrary(
  new Book("The Terrible Privacy of Maxwell Sim", "Jonathan Coe", 339, false)
);
addBookToLibrary(
  new Book("Il Segreto di Ninkinanka", "Sokhna Benga", 174, false)
);
addBookToLibrary(
  new Book("L'idiota", "Fedor Dostoevskij", 500, true, "Read 100 pages")
);
addBookToLibrary(
  new Book(
    "Banksy: The man behind the wall",
    "Will Ellsworth-Jones",
    302,
    true,
    "Read 50 pages"
  )
);
addBookToLibrary(
  new Book(
    "Professional Javascript for Web Developers",
    "Nicholas C. Zakas",
    1111,
    true,
    "Read 149 pages"
  )
);
// End list of books

function displayBooks() {
  container.innerHTML = "";

  for (let book of myLibrary) {
    const index = myLibrary.indexOf(book);

    container.insertAdjacentHTML(
      "beforeend",
      `
          <div class="card">
            <div class="delete">
              <button id="delete" data-delete="${index}">x</button>
            </div>
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: <span class="read-status ${
              book.read ? "read-true" : "read-false"
            }">${book.read ? "Yes" : "No"}</span></p>
            <p>Notes: ${book.notes}</p>
          </div>
        `
    );
  }

  const deleteButton = document.querySelectorAll("#delete");

  deleteButton.forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.dataset.delete;
      myLibrary.splice(index, 1);
      displayBooks();
    });
  });

  // Button to add new book
  container.insertAdjacentHTML(
    "beforeend",
    `
        <div class="addBook">
          <button id="addBook">+</button>
        </div>
      `
  );

  const addBookButton = document.querySelector("#addBook");

  addBookButton.addEventListener("click", function () {
    form.reset();
    clearErrors();
    dialogX.showModal();
  });
}

// Custom validation functions
function validateField(e) {
  const field = e.target;
  const errorElement = document.getElementById(`${field.id}-error`);

  // Clear previous error
  field.setCustomValidity("");

  // Check validity
  if (field.validity.valid) {
    errorElement.textContent = "";
    field.style.borderColor = "#ced6e0";
  } else {
    showError(field);
  }
}

function handleInvalid(e) {
  e.preventDefault();
  showError(e.target);
}

function showError(field) {
  const errorElement = document.getElementById(`${field.id}-error`);

  if (field.validity.valueMissing) {
    field.setCustomValidity(`Please enter the ${field.name}`);
  } else if (field.validity.rangeUnderflow && field.id === "pages") {
    field.setCustomValidity("Book must have at least 1 page");
  } else {
    field.setCustomValidity(`Invalid value for ${field.name}`);
  }

  errorElement.textContent = field.validationMessage;
  field.style.borderColor = "#ff4757";
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((el) => {
    el.textContent = "";
  });

  inputs.forEach((input) => {
    input.style.borderColor = "#ced6e0";
    input.setCustomValidity("");
  });
}

function validateForm() {
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showError(input);
      isValid = false;
    }
  });

  return isValid;
}

// Form submission handling
form.addEventListener("submit", (event) => {
  if (!validateForm()) {
    event.preventDefault();
  }
});

dialogX.addEventListener("close", () => {
  if (dialogX.returnValue === "confirm") {
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read") ? true : false;
    const notes = formData.get("notes");

    const newBook = new Book(title, author, pages, read, notes);
    addBookToLibrary(newBook);

    displayBooks();
  }
});

// Cancel button
cancelButton.addEventListener("click", function () {
  dialogX.close("cancel");
});

// Initial display of books
displayBooks();
