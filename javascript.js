let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  addBookToLibrary(this)
}

function addBookToLibrary(newBook) {
  // do stuff here
  myLibrary.push(newBook)
  deleteCards()
  createCards()
}

const container = document.querySelector(".container")

function createCards() {
    for (i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div")
        card.classList.add("card")

        for (let prop in myLibrary[i]) {
            if (myLibrary[i].hasOwnProperty(prop)) {
                let proper = document.createElement("div")
                proper.classList.add(`${prop}`)
                if (`${myLibrary[i][prop]}` === "true") {
                    proper.textContent = `Has read`
                } else if (`${myLibrary[i][prop]}` === `false`) {
                    proper.textContent = `Has not read`
                } else {
                    proper.textContent = `${myLibrary[i][prop]}`
                }
                card.appendChild(proper)
            }
        }

        let removeButton = document.createElement("button")
        removeButton.setAttribute(`id`, `${i}`)
        removeButton.addEventListener("click", () => removeCard())
        removeButton.textContent = "Remove"
        card.appendChild(removeButton)

        let readButton = document.createElement("button")
        readButton.setAttribute(`id`, `${i}x`)
        readButton.addEventListener("click", () => changeRead())
        readButton.textContent = "Change read"
        card.appendChild(readButton)

        card.classList.add(`${i}`)

        container.appendChild(card)
    }
}

function changeRead() {
    let number = event.srcElement.id
    let n2 = number.substring(0,1)

    console.log(myLibrary)
    console.log(n2)
    console.log(myLibrary[n2])

    if (myLibrary[n2].read === `false` ) {
        myLibrary[n2].read = "true"
    } else {
        myLibrary[n2].read = `false`
    }
    deleteCards()
    createCards()
}

function deleteCards() {
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

function removeCard() {
    number = event.srcElement.id
    container.removeChild(container.children[number])
    myLibrary = myLibrary.filter(book => book !== myLibrary[number])
}

const showBookForm = document.querySelector(".add-book")
showBookForm.addEventListener("click", () => showForm())
const formContainer = document.querySelector(".form-container")
const addBookButton = document.querySelector(".add")
addBookButton.addEventListener("click", () => addBook())

function showForm() {
    showBookForm.style.display = "none"
    formContainer.style.display = "block"
}

function addBook() {
    showBookForm.style.display = "block"
    formContainer.style.display = "none"
    createBook()
}

function createBook() {
    let inputTitle = document.querySelector(".title-input").value
    let inputAuthor = document.querySelector(".author-input").value
    let inputPages = document.querySelector(".pages-input").value
    let inputRead = document.querySelector(".read-input").checked
    document.querySelector(".title-input").value = ""
    document.querySelector(".author-input").value = ""
    document.querySelector(".pages-input").value = ""
    document.querySelector(".read-input").value = ""
    new Book(inputTitle, inputAuthor, inputPages, inputRead)
}