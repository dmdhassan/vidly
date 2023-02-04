import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';

const Pagination = (props) => {
    const {itemCount, pageSize, currentPage, onPageChange} = props
    const pageCount = Math.ceil(itemCount / pageSize)
    const pages = _.range(1, pageCount + 1)

    if (pageCount === 1) return null

    return ( 
        <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className="page-item">
                    <a className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                    </li>
                    {
                        pages.map(page => {
                            return (
                                <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'} onClick={() => onPageChange(page)}><a className="page-link">{page}</a></li>
                            )
                        })
                    }
                    <li className="page-item">
                    <a className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
        </nav>
     );
}

Pagination.propTypes = {
    itemCount: propTypes.number.isRequired, 
    pageSize: propTypes.number.isRequired, 
    currentPage: propTypes.number.isRequired, 
    onPageChange: propTypes.func.isRequired
}
 
export default Pagination;