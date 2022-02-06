import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';


@Component({
  selector: 'app-book-form-edit',
  templateUrl: './book-form-edit.component.html',
  styleUrls: ['./book-form-edit.component.scss']
})
export class BookFormEditComponent implements OnInit {

  booksList: Book[] = [];
  bookObj: Book = {
    id: '',
    title: '',
    author: '',
    genre: ''

  };

  id: string = '';
  title: string = '';
  author: string = '';
  genre: string = '';

  constructor(private book:BookService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.populateForm();
  }
  getAllBooks() {

    this.book.getAllBooks().subscribe(res => {

      this.booksList = res.map((e: any) => {
        const book = e.payload.doc.data();
        book.id = e.payload.doc.id;
        return book;
      })

    }, err => {
      alert('Error while fetching book data');
    })

  }
  resetForm() {
    this.id = '';
    this.title = '';
    this.author = '';
    this.genre = '';

  }

  addBook() {
    if (this.title == '' || this.author == '' || this.genre == '' ) {
      alert('Fill all input fields');
      return;
    }

    this.bookObj.id = '';
    this.bookObj.title = this.title;
    this.bookObj.author = this.author;
    this.bookObj.genre = this.genre;


    this.book.addBook(this.bookObj);
    this.resetForm();
     this.router.navigate(['/book'])

  }



  updateBook() {
    console.log("BOOK:",this.book.getMyBook().id);

  

    this.bookObj.id = this.book.getMyBook().id;

    this.bookObj.title = this.title;
    this.bookObj.author = this.author;
    this.bookObj.genre = this.genre;

    console.log("obj",this.bookObj);

    this.book.updateBook(this.bookObj);
    this.router.navigate(['/book']);
  
    
  }

  deleteBook(book: Book) {
    if (window.confirm('Are you sure you want to delete ' + book.title + ' ?')) {
      this.book.deleteBook(book);
    }
  }
  populateForm(){


    this.id = this.book.getMyBook().id;
    this.title = this.book.getMyBook().title;
    this.author = this.book.getMyBook().author;
    this.genre = this.book.getMyBook().genre;
 
  }


}
