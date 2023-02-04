import React, { Component } from 'react';
import  { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import ListGroup from './common/listGroup';
import MoviesTable from './moviestable';
import { NavLink } from 'react-router-dom';
import Pagination from './common/pagination';
import { paginate } from './utils/paginate';
import { toast } from 'react-toastify';
import _ from 'lodash';
import SearchBox from './searchBox';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: '',
        selectedGenre: null,
        sortColumn: {path:'', order: 'asc'}
    }


    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{name: 'All Genres'}, ...data];
        const { data: movies} = await getMovies();
        this.setState({ movies, genres });
    }
    getPageData = () => {
        const {pageSize, currentPage, selectedGenre, searchQuery, sortColumn, movies: allMovies} = this.state;
        let filteredMovies = allMovies;
        
        if (searchQuery) {
            filteredMovies = allMovies.filter(m => _.includes(m.title, searchQuery));
            
        } else if (selectedGenre && selectedGenre._id) {
            filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id)

        }
        
        const sorted = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, pageSize, currentPage);

        return {totalNumber: filteredMovies.length, data: movies}
    }

    handleDelete = async (id) => {
        const originalMovies = this.state.movies;
        let movies = originalMovies.filter(movie => movie._id !== id)
        this.setState({movies})

        try {
            await deleteMovie(id)

        } catch(err) {
            if (err.response && err.response.status === 404) {
                toast.error("This movie has been deleted");
            }

            this.setState({movies: originalMovies})
        }
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !(movies[index].liked);
        this.setState({ movies });
    }

    handlePageChange = (page) => {
        const currentPage = page;
        this.setState({ currentPage })
    }

    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, searchQuery: '', currentPage: 1})
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }


    
    
    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, searchQuery} = this.state;
        const {data: movies, totalNumber} = this.getPageData();
        
        // if (count === 0) return <p>There is no movie in the database today</p>
        
        return (
                <div className="row mt-5">
                    <div className='col-3'>
                        <ListGroup 
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                    </div>
                    <div className='col'>
                        {
                            this.props.user && (
                                <NavLink className="btn btn-primary mb-4" to="/movies/new">
                                    New Movie
                                </NavLink>
                            )
                        }
                        <p>Showing {totalNumber} movies today</p>

                        <SearchBox value={searchQuery} onChange={this.handleSearch}/> 
                        <MoviesTable 
                            movies={movies}
                            sortColumn={this.state.sortColumn}
                            onDelete={this.handleDelete}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                        />
                        
                        <Pagination 
                        itemCount={totalNumber} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChange={this.handlePageChange}
                        />
                    </div>

                </div>

        );
    }

}
 
export default Movies;