import React from 'react';

const BooksList = ({isLoading , data}) => {
const bookTitle = data.length > 0 ? (data.map((item) => (
 <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
          <div>{item.title}</div>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-primary'>
              Read
            </button>
            <button type='button' className='btn btn-danger'>
              Delete
            </button>
          </div>
        </li> )))
        :
          (<div className='alert alert-secondary' role='alert'>
          There is no books inserted yet!
        </div>);
        



// const bookTitle = data.map(el => (<li>{el.title}</li>))
  return (
    <div> 
      <h2>Books List</h2>
      {
        isLoading ? 'loading...': <ul className='list-group'>
          
          {bookTitle}
          
          </ul>
        }
        
          
        
       
    </div>
  );
};

export default BooksList;
