import React, { useEffect, useState } from 'react'
import { TbSearch } from "react-icons/tb";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";


const SearchUser = ({onClose}) => {
  const [searchUser,setSearchUser]=useState([])
  const [loading,setLoading]=useState(false)
  const [search,setSearch]=useState("")

  const handleSearchUser=async()=>{
  const URL=`${process.env.REACT_APP_BACKEND_URL}/api/search-user`

    try {
      setLoading(true)
      const response=await axios.post(URL,{
        search:search
      })
      setLoading(false)
      setSearchUser(response.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  useEffect(()=>{
     handleSearchUser()
  },[search])
  console.log("search User",searchUser)
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 pd-2 z-10 overflow-y-scroll'>
       <div className='w-full max-w-lg mx-auto mt-10 '>
        {/* Input search user */}
        <div className='bg-white rounded-full h-12 overflow-hidden flex'>
          <input 
          type='text'
          placeholder='search user by name,email...'
          className='w-full outline-none py-1  h-full px-4'
          onChange={(e)=>setSearch(e.target.value)}
          value={search}
          />
          <div className='h-12 w-12 flex justify-center items-center'>
            <TbSearch
            size={20}/>
          </div>

        </div>
        {/* display search user */}
        <div className='bg-white mt-2 w-full p-4 rounded '>
          {/* No user found */}
          {
            searchUser.length===0 && !loading && (
              <p className='text-center text-slate-500'>No user found!</p>
            )
          }

          {
            loading &&(
              <p><Loading/></p>
            )
          }

          {
            searchUser.length !==0 && !loading &&(
              searchUser.map((user,index)=>{
                return(
                  <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                )
              })
            )
          }

        </div>
       </div>
       <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
         <button>
          <AiOutlineClose size={20}/>
         </button>
       </div>
    </div>
  )
}

export default SearchUser