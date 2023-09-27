/**
If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
All of your book objects are going to be stored in a simple array,
so add a function to the script (not the constructor) that can take user’s input and
store the new book objects into an array. Your code should look something like this:

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

Write a function that loops through the array and displays each book on the page.
You can display them in some sort of table, or each on their own “card”.
It might help for now to manually add a few books to your array so you can see the display.

Add a “NEW BOOK” button that brings up a form allowing users to input the details for the 
new book: author, title, number of pages, whether it’s been read and anything else you might want.
How you decide to display this form is up to you. For example, you may wish to have a form show in
a sidebar or you may wish to explore dialogs and modals using the <dialog> tag. However you do this,
you will most likely encounter an issue where submitting your form will not do what you expect it to do.
That’s because the submit input tries to send the data to a server by default. If you’ve done the bonus
section for the calculator assignment, you might be familiar with event.preventDefault();.
Read up on the event.preventDefault documentation again and see how you can solve this issue!

Add a button on each book’s display to remove the book from the library.

You will need to associate your DOM elements with the actual book objects in some way.
One easy solution is giving them a data-attribute that corresponds to the index of the library array.

Add a button on each book’s display to change its read status.

To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
NOTE: You’re not required to add any type of storage right now.
You will have the option to come back to this project later on in the course.

**/

const submit = document.getElementById('addBook')
const showForm = document.getElementById('showForm')
const addBookDialog = document.getElementById('addBookDialog')
const title = document.getElementById('addBookTitle')
const author = document.getElementById('addBookAuthor')
const read = document.getElementById('addBookRead')
const checkbox = document.querySelector('input[type="checkbox"]')

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, read) {
  // the constructor...
  this.title = title
  this.author = author
  this.read = read
}

function addBookToLibrary(title = '', author = '', read = false) {
  if (title !== '' && author !== '') {
    const newBook = new Book(title, author, read)
    console.log(newBook)
    myLibrary.push(newBook)
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    getAllBooks()
  }
}

function removeBookFromLibrary(index) {
  const updatedLibrary = myLibrary.filter((item, i) => i !== Number(index))
  myLibrary = [...updatedLibrary]
  localStorage.setItem("myLibrary", JSON.stringify(updatedLibrary))
  getAllBooks()
}

function updateBookRead(index, value) {
  myLibrary[index].read = value
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
  getAllBooks()
}

const getAllBooks = () => {
  const tableBody = document.querySelector('table tbody')
  tableBody.innerHTML = ''

  const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  myLibrary.map((book, index) => {
    const tableRow = document.createElement('tr')
    tableRow.setAttribute("data-index", index)
    const title = document.createElement('td')
    title.textContent = book.title

    const author = document.createElement('td')
    author.textContent = book.author

    const read = document.createElement('td')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    if(book.read !== false) {
      checkbox.checked = true
    }
    checkbox.addEventListener('change', (e) => {
      updateBookRead(index, e.target.checked)
    })
    read.appendChild(checkbox)

    const removeButton = document.createElement('button')
    removeButton.textContent = 'x'
    removeButton.id = 'delete'
    removeButton.setAttribute('data-index', index)

    removeButton?.addEventListener('click', (e) => {
      removeBookFromLibrary(e.target.getAttribute('data-index'))
    })

    tableRow.appendChild(title)
    tableRow.appendChild(author)
    tableRow.appendChild(read)
    tableRow.appendChild(removeButton)
    tableBody.appendChild(tableRow)
  })
}

getAllBooks()

showForm.addEventListener('click', () => {
  addBookDialog.show()
})

submit.addEventListener('click', (e) => {
  e.preventDefault()
  const readValue = read.value === false ? false : true;
  addBookToLibrary(title.value, author.value, readValue)
  addBookDialog.close()
  reset()
})

function reset() {
  title.value = ''
  author.value = ''
  read.value = false
}


