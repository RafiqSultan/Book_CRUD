import React, { Fragment, useEffect,useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { useDispatch , useSelector} from 'react-redux';
import { getBooks , deleteBook } from '../../store/bookSlice';

import './book.css';

const BookContainer = () => { 
  // books name of reducer
  const [selectBook, setSelectedBook] = useState({});
  const {isLoading , books }=useSelector((state)=>state.books);
  const {isLoggedIn} = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getBooks());
  },[dispatch]);

  // read book
  const getBookId=(id)=>{
    const selectInfo=books.find((item)=> item.id === id);
    setSelectedBook(selectInfo);
  }
  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList  isLoading={isLoading} 
          data={books} 
          isLoggedIn={isLoggedIn}
          deleteBook={deleteBook}
          dispatch={dispatch}
          getBookId={getBookId}/>
          
        </div>
        <div className='col side-line'>
          <BookInfo bookInfo={selectBook}/>
        </div>
      </div>
    </Fragment>
  );
};

export default BookContainer;
