import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

// Async for initail
export const getBooks=createAsyncThunk("books/getBooks",async(_, thunkAPI)=> {
    const {rejectWithValue}=thunkAPI;
    try{
        // Connect with API
        const result= await fetch("http://localhost:3005/books");
        const data = await result.json();
        return data;

    } catch(error){
        return rejectWithValue(error.message);
    }

});
// Async for insert books
export const insertBook= createAsyncThunk("books/insertBooks",async( dataBook,thunkAPI) => {
    const {rejectWithValue , getState}=thunkAPI;
try {
    dataBook.userName=getState().auth.name;
    const insert= await fetch("http://localhost:3005/books", {
        method:'POST',
        body: JSON.stringify(dataBook),
       headers:{
            'Content-type':'application/json; charset=UTF-8',
        },
    });
    const data=await insert.json();
    // console.log('data is');
    // console.log(data);
    // console.log('data up');
    return data;
    
} catch (error) {
    return rejectWithValue(error.message);
}
});

// Async for delete books
export const deleteBook = createAsyncThunk('books/deleteBooks',async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
         await fetch(`http://localhost:3005/books/${id}`, {
            method:'DELETE',
            headers:{
                'Content-type':'application/json; charset=UTF-8',
            },
        });
        return id;
    }
        catch(error)
        {
        return rejectWithValue(error.message);
    }
}) ;
const bookSlice= createSlice({
    name:"book",
    initialState:{books:[], isLoading:false,error:null},
    extraReducers:{

        // get books
         [getBooks.pending]:(state , action)=>{
            state.isLoading=true;
            state.error=null;
            
        },
        [getBooks.fulfilled]:(state , action)=>{
            state.isLoading=false;
            // save data into satate reducer books
            state.books=action.payload;
        },
        [getBooks.rejected]:(state , action)=>{
            state.isLoading=false;
            state.error=action.payload;
            
        },

        // insert books
        [insertBook.pending]:(state , action)=>{
            state.isLoading=true;
            state.error=null;
            
        },
        [insertBook.fulfilled]:(state , action)=>{
            state.isLoading=false;
            // push data into satate reducer books
            console.log(action.payload);
            state.books.push(action.payload);
        },
        [insertBook.rejected]:(state , action)=>{
            state.isLoading=false;
            state.error=action.payload;
            
        },
        // delete books
        [deleteBook.pending]:(state , action)=>{
            state.error=null;
            
        },
        [deleteBook.fulfilled]:(state , action)=>{
            
            // push data into satate reducer books
            state.books=state.books.filter(el=> el.id !== action.payload);
        },
        [deleteBook.rejected]:(state , action)=>{
           
            state.error=action.payload;
            
        }
    }
});


export default bookSlice.reducer;