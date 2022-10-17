import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks=createAsyncThunk("books/getBooks",async(_, thunkAPI)=> {
    try{
        // Connect with API
        const result= await fetch("http://localhost:3005/books");
        const data = await result.json();
        return data;

    } catch(error){
        console.log(error);
    }

});

const bookSlice= createSlice({
    name:"book",
    initialState:{books:[], isLoading:false},
    extraReducers:{
        [getBooks.pending]:(state , action)=>{
            state.isLoading=true;
            
        },
        [getBooks.fulfilled]:(state , action)=>{
            state.isLoading=false;
            // save data into satate reducer books
            state.books=action.payload;
        },
        [getBooks.rejected]:(state , action)=>{
            state.isLoading=false;
            
        }
    }
});


export default bookSlice.reducer;