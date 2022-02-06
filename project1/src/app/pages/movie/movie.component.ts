import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';
// import { Book } from 'src/app/interfaces/book';
// import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  moviesList: Movie[] = [];
  moviekObj: Movie = {
    id: '',
    name: '',
    director: '',
    rating: ''

  };

  id: string = '';
  name: string = '';
  director: string = '';
  rating: string = '';

  constructor(private movie:MovieService, private router: Router) { }

  ngOnInit(): void {
   this.getAllMovies();
  }
  getAllMovies() {

    this.movie.getAllMovies().subscribe(res => {

      this.moviesList = res.map((e: any) => {
        const movie = e.payload.doc.data();
        movie.id = e.payload.doc.id;
        return movie;
      })

    }, err => {
      alert('Error while fetching movie data');
    })

  }
  resetForm() {
    this.id = '';
    this.name = '';
    this.director = '';
    this.rating = '';

  }

  addMovie() {
    if (this.name == '' || this.director == '' || this.rating == '' ) {
      alert('Fill all input fields');
      return;
    }

    this.moviekObj.id = '';
    this.moviekObj.name = this.name;
    this.moviekObj.director = this.director;
    this.moviekObj.rating = this.rating;
   


    this.movie.addMovie(this.moviekObj);
    this.resetForm();

  }

  updateMovie(movie: Movie) {
    console.log(movie);

  }

  deleteMovie(movie: Movie) {
    if (window.confirm('Are you sure you want to delete ' + movie.name + ' ?')) {
      this.movie.deleteMovie(movie);
    }
  }
  goToMovieForm(){
    this.router.navigate(['/movie-form'])
    
  }
  goHome(

    ){    this.router.navigate(['/dashboard'])}
  goToMovieEditForm(movie : Movie){
    
    this.router.navigate(['/movie-form-edit'])
    console.log(movie);
    this.movie.setMyMovie(movie);
    //console.log("MOVIE:",this.movie.getMyMovie());
    //this.populateForm(movie);
    // console.log(this.name);
    // console.log("obj",this.moviekObj);
  }
  // populateForm(movie: Movie){
  //   this.id = movie.id;
  //   this.name = movie.name;
  //   this.director = movie.director;
  //   this.rating = movie.rating;
 
  // }
  

}
