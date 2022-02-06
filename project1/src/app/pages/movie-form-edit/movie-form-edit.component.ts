import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';
import { MovieComponent } from '../movie/movie.component';
@Component({
  selector: 'app-movie-form-edit',
  templateUrl: './movie-form-edit.component.html',
  styleUrls: ['./movie-form-edit.component.scss']
})
export class MovieFormEditComponent implements OnInit {

  moviesList: Movie[] = [];
  moviekObj: Movie = {
    id: '',
    name: '',
    director: '',
    rating: ''

  };
  // movieOldObj: Movie = {
  //   id: '',
  //   name: '',
  //   director: '',
  //   rating: ''
  // }

  id: string = '';
  name: string = '';
  director: string = '';
  rating: string = '';

  constructor(private movie:MovieService, private router: Router) { }

  ngOnInit(): void {
   this.getAllMovies();
   this.populateForm();
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

  updateMovie() {
    console.log("MOVIE:",this.movie.getMyMovie().id);

    // if (this.name == '' || this.director == '' || this.rating == '' ) {
    //   alert('Fill all input fields');
    //   return;
    // }

    this.moviekObj.id = this.movie.getMyMovie().id;

    this.moviekObj.name = this.name;
    this.moviekObj.director = this.director;
    this.moviekObj.rating = this.rating;

    console.log("obj",this.moviekObj);

    this.movie.updateMovie(this.moviekObj);
    this.router.navigate(['/movie']);
  
    
  }

  deletMovie(movie: Movie) {
    if (window.confirm('Are you sure you want to delete ' + movie.name + ' ?')) {
      this.movie.deleteMovie(movie);
    }
  }
  populateForm(){


    this.id = this.movie.getMyMovie().id;
    this.name = this.movie.getMyMovie().name;
    this.director = this.movie.getMyMovie().director;
    this.rating = this.movie.getMyMovie().rating;
 
  }

}
