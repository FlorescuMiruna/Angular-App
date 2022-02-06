import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private afs:AngularFirestore) { }
  bookOldObj: Book = {
    id: '',
    title: '',
    author: '',
    genre: ''

  };

    // add book
    addBook(book : Book) {
      book.id = this.afs.createId();
      return this.afs.collection('/Books').add(book);
    }
    // get all books
  getAllBooks() {
    return this.afs.collection('/Books').snapshotChanges();
  }
  // delete book
  deleteBook(book : Book) {
    return this.afs.doc('/Books/'+book.id).delete();
  }

  // update book
  updateBook(book : Book) {
    // this.deleteBook(book);
    // this.addBook(book);
    return this.afs.collection('/Books').doc(book.id).update(book);

  }

  setMyBook(book: Book){
    this.bookOldObj = book;
  }
  getMyBook(){
    return this.bookOldObj;
  }
}
