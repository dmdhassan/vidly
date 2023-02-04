import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

class MoviesForm extends Form {
    state = { 
        data: {
            title:  "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
     } 


     schema = {
        _id: Joi.string(),

        title: Joi.string()
                .required()
                .label("Title"),

        genreId: Joi.string()
                .label("Genre"),

        numberInStock: Joi.number()
                .required()
                .min(0)
                .max(100)
                .label("Number In Stock"),

        dailyRentalRate: Joi.number()
                .required()
                .min(0)
                .max(10)
                .label("Rate"),
    }

    async populateGenre() {
        const { data } = await getGenres();
        const genres = [...data]
        this.setState({ genres })
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') return;

            const { data:movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) })

        } catch(ex) {
            if (ex.response && ex.response.status === 404)
                return this.props.history.replace('/not-found');
        }
    }

    async componentDidMount() {
        await this.populateGenre();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return ({

            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate

        })
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);
        this.props.history.replace('/movies');
    }

    render() { 
        return (
            <div>
                <h2>Movie Form - {this.props.match.params.id}</h2>
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("title", "Title")}
                        {this.renderSelect("genreId", "Genre", this.state.genres)}
                        {this.renderInput("numberInStock", "Number In Stock", "number")}
                        {this.renderInput("dailyRentalRate", "Rate", "number")}
                        {this.renderButton("Save")}
                    </form>
            </div>
        );
    }
};

export default MoviesForm;