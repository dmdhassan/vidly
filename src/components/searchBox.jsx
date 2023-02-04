import React from 'react';


const SearchBox = ({value, onChange}) => {
    return ( 
        <input
            name="search" 
            type="search"
            className='form-control my-2'
            placeholder='search movie...'
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        /> 
     );
}
 
export default SearchBox;