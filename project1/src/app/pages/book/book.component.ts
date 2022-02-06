import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

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
     this.router.navigate(['/movie'])

  }



  updateBook() {

  }

  deleteBook(book: Book) {
    if (window.confirm('Are you sure you want to delete ' + book.title + ' ?')) {
      this.book.deleteBook(book);
    }
  }
  goToBookForm(){
    this.router.navigate(['/book-form'])
  }
  goToBookEditForm(book : Book){
    
    this.router.navigate(['/book-form-edit'])
    console.log(book);
    this.book.setMyBook(book);
 
  }
  goHome(

  ){    this.router.navigate(['/dashboard'])}




}
