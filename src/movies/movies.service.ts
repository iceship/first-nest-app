import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData) {
    movieData.id = this.movies.length + 1;
    this.movies.push({
      ...movieData,
    });
    return movieData;
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
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
