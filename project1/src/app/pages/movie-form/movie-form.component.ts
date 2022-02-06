import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

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
    this.router.navigate(['/movie']);

  }

  updateBook() {

  }

  deletMovie(movie: Movie) {
    if (window.confirm('Are you sure you want to delete ' + movie.name + ' ?')) {
      this.movie.deleteMovie(movie);
    }
  }
  populateForm(movie: Movie){
    this.id = movie.id;
    this.name = movie.name;
    this.director = movie.director;
    this.rating = movie.rating;
 
  }

}
