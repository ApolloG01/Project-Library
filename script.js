"use strict";

const dialogX = document.querySelector("dialog");
const container = document.querySelector(".container");
const closeDialogButton = document.querySelector("#close-dialog");

const myLibrary = [];

// Book constructor
function Book(title, author, pages, read, notes) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.notes = notes || "No notes";
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
    "Banksy<br/> The man behind the wall",
    "Will Ellsworth-Jones",
    302,
    true,
    "Read 50 pages"
  )
);
addBookToLibrary(
  new Book(
    "Professional Javascript for<br/> Web Developers",
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
      <button id="delete" data-delete-${index}>x</button>
    </div>
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read}</p>
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

      // Clear container
      container.innerHTML = "";

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
    dialogX.showModal();
  });
}
displayBooks();

// Handle form submission
dialogX.addEventListener("close", () => {
  if (dialogX.returnValue === "confirm") {
    console.log(dialogX.returnValue);

    const formData = new FormData(dialogX.querySelector("form"));
    console.log("Form data:", formData);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read") ? "Yes" : "No";
    const notes = formData.get("notes");

    console.log("Form data:", { title, author, pages, read, notes });

    const newBook = new Book(title, author, pages, read, notes);
    addBookToLibrary(newBook);

    container.innerHTML = "";

    displayBooks();

    form.reset();
  }
});
