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

  this.toggleRead = () => {
    this.read = !this.read
  }
}

function addBookToLibrary(title = '', author = '', read = false) {
  if (title !== '' && author !== '') {
    const newBook = new Book(title, author, read)
    console.log(newBook, read)
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

function updateBookRead(index) {
  myLibrary[index].toggleRead()
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
      updateBookRead(index)
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
  addBookToLibrary(title.value, author.value, read.checked)
  addBookDialog.close()
  reset()
})

function reset() {
  title.value = ''
  author.value = ''
  read.checked = false
}


