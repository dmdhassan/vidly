import React, {Component} from 'react';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';


class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like', content: (movie) => <Like onClick={() => this.props.onLike(movie)} liked={movie.liked}/>},
        {key: 'delete', content: (movie) => this.props.user && this.props.user.isAdmin && <button className='btn btn-danger' onClick={() => this.props.onDelete(movie._id)}>Delete</button>}
    ]
    
    
    getUser = () => {
        try {
            let user = auth.getUser()
            return user;

        } catch(ex) {

            return null;
        }
    }

    render() { 
        const {movies, onSort, sortColumn} = this.props;
        const user = this.getUser()
        let columns = [];
        if (user && user.isAdmin) {
            columns = [...this.columns]

        } else {
            columns = this.columns.filter(column => column['key'] !== "delete");
            console.log(columns)
        }

        return (
            <Table data={movies} onSort={onSort} columns={columns} sortColumn={sortColumn} />
            
        );
    }
}
 
export default MoviesTable;