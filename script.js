const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    for(let i = 0; ; i++){
        if(!myLibrary[i]){
            myLibrary[i] = new Book(title, author, pages, read);
            break;
        }
    }
}

const libraryDiv = document.querySelector(".library");

function displayLibrary(){
    while(libraryDiv.hasChildNodes()){
        libraryDiv.removeChild(libraryDiv.firstChild);
    }
    const FirstRow = document.createElement("tr");
    libraryDiv.appendChild(FirstRow);
    const title = document.createElement("th");
    title.textContent = "Title";
    FirstRow.appendChild(title);
    const author = document.createElement("th");
    author.textContent = "Author";
    FirstRow.appendChild(author);
    const pages = document.createElement("th");
    pages.textContent = "Pages";
    FirstRow.appendChild(pages);
    const read = document.createElement("th");
    read.textContent = "Have you read it?";
    FirstRow.appendChild(read);
    const remove = document.createElement("th");
    remove.textContent = "";
    FirstRow.appendChild(remove);

    for(let index = 0; index < myLibrary.length; index++){
        if(myLibrary[index]){
            const row = document.createElement("tr");
            row.setAttribute("data-book-number", index.toString());
            Object.keys(myLibrary[index]).forEach(attribute => {
                const cell = document.createElement("td");
                if(attribute == "read"){
                    const readButton = document.createElement("button");
                    readButton.setAttribute("data-book-read", index); 
                    readButton.addEventListener("click", () =>{
                        // myLibrary[index][attribute] = !myLibrary[index][attribute]; Simple way, the excercise says to use a function
                        myLibrary[index].toggleRead();
                        displayLibrary();
                    });
                    myLibrary[index][attribute] ? readButton.textContent = "Read" : readButton.textContent = "Not Read";
                    cell.appendChild(readButton);
                }
                else{
                    cell.textContent = myLibrary[index][attribute];
                }
                row.appendChild(cell);
                
            });
            const cell = document.createElement("td");
            const remButton = document.createElement("button");
            remButton.textContent = "Remove";
            remButton.setAttribute("data-book-number", index.toString());
            remButton.addEventListener("click", removeBook);
            cell.appendChild(remButton);
            row.appendChild(cell);
            libraryDiv.appendChild(row);
        }
    }
}

function removeBook(e){
    myLibrary[e.srcElement.dataset.bookNumber] = null;
    const libraryBooks = libraryDiv.childNodes;
    for(let i = 0; i < libraryDiv.childElementCount; i++){
        if (libraryBooks[i]){
            if(libraryBooks[i].getAttribute("data-book-number") == e.srcElement.dataset.bookNumber){
                libraryDiv.removeChild(libraryBooks[i]);
                break;
            }
        }
    }
    
}

function addBookButtonPressed(){
    const dialog = document.querySelector("dialog");
    dialog.setAttribute("open", true);
}


function handleForm(event){
    event.preventDefault();
    const title = document.querySelector(".title");
    const author = document.querySelector(".author");
    const pages = document.querySelector(".pages");
    const read = document.querySelector(".read");
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
    displayLibrary()
    const dialog = document.querySelector("dialog");
    dialog.removeAttribute("open");
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

var form = document.querySelector("form");
form.addEventListener('submit', handleForm);

const addButton = document.querySelector(".new");
addButton.addEventListener("click", addBookButtonPressed);

addBookToLibrary("Umineko When They Cry", "Ryukishi07", 2830, false);
displayLibrary(myLibrary);

