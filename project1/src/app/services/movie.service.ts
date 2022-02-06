import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private afs:AngularFirestore) { }
 

  movieOldObj: Movie = {
    id: '',
    name: '',
    director: '',
    rating: ''

  };
  // add movie
  addMovie(movie : Movie) {
    movie.id = this.afs.createId();
    return this.afs.collection('/Movies').add(movie);
  }
  // get all movies
getAllMovies() {
  return this.afs.collection('/Movies').snapshotChanges();
}
// delete movie
deleteMovie(movie : Movie) {
  return this.afs.doc('/Movies/'+movie.id).delete();
}

// update movie
updateMovie(movie : Movie) {
  // this.deleteMovie(movie);
  // this.addMovie(movie);
  return this.afs.collection('/Movies').doc(movie.id).update(movie);
  // console.log("id" ,movie.id);
}

setMyMovie(movie: Movie){
  this.movieOldObj = movie;
}
getMyMovie(){
  return this.movieOldObj;
}

}

