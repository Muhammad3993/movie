import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchCollection } from '../data/searchCollection';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchResponse, setSearchResponse] = useState([]);
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)


  const [query, setQuery] = useState("");

  const getSearchCollection = async () => {
    const response = await searchCollection.getSearchCollection(query)
    setSearchResponse((prevData) => [...prevData, ...response.results])
    setPage(response.page = page)
    setTotalPage(response.total_pages)
  }


  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("q");
    if (searchQuery) {
      setQuery(searchQuery);
      setPage(1);
      setSearchResponse([]);
    }
  }, [location.search])

  useEffect(() => {
    if (query) {
      getSearchCollection();
    }
  }, [query, page]);


  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (page < totalPage) {
        setPage(page + 1)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  },[handleScroll])


  return (
    <div className='py-16'>

      <div className='lg:hidden container mx-auto sticky top-20 z-50'>
          <input 
            type="text"
            placeholder='Search here...'
            onChange={(e) => {
              navigate(`/search?q=${e.target.value}`)
            }}
            className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
          />
      </div>

      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-2xl font-semibold my-3">Search Results</h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 transition-all justify-center lg:justify-start">
          {
            searchResponse && searchResponse.map((item, i) => (
              <Card data={item} key={i} media_type={item.media_type} />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default SearchPage