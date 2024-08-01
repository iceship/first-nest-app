import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto): Movie {
    const newMovie = {
      id: this.movies.length + 1,
      ...movieData,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  update(id: number, updateData: UpdateMovieDto): Movie {
    const movie = this.getOne(id);
    this.deleteOne(id);
    const updateMovie = { ...movie, ...updateData };
    this.movies.push(updateMovie);
    return updateMovie;
  }

  search(movieTitle: string): Movie {
    return this.movies.find((movie) => movie.title.includes(movieTitle));
  }

  getGenres(): string[] {
    return this.movies.reduce((acc, movie) => {
      movie.genres.forEach((genre) => {
        if (!acc.includes(genre)) {
          acc.push(genre);
        }
      });
      return acc;
    }, []);
  }

  getMovieByGenre(genre: string): Movie[] {
    return this.movies.filter((movie) => movie.genres.includes(genre));
  }

  getMovieByYear(year: number): Movie[] {
    return this.movies.filter((movie) => movie.year === year);
  }

  getMovieByYearAndGenre(year: number, genre: string): Movie[] {
    return this.movies.filter(
      (movie) => movie.year === year && movie.genres.includes(genre),
    );
  }

  getMovieByTitle(title: string): Movie {
    return this.movies.find((movie) => movie.title === title);
  }

  getMovieByTitleAndGenre(title: string, genre: string): Movie {
    return this.movies.find(
      (movie) => movie.title === title && movie.genres.includes(genre),
    );
  }
}
