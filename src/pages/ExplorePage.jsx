import { useParams } from "react-router-dom"
import { discoverApi } from "../data/discoverApi";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const ExplorePage = () => {
  const [discoverResponse, setDiscoverResponse] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [totalPageNo, setTotalPageNo] = useState(0)

  const params = useParams();

  // console.log(params.explore);

  const getDiscover = async () => {
    const response = await discoverApi.getDiscoverApi(params.explore)
    setDiscoverResponse((prevData) => [...prevData, ...response.results])
    setPageNo(response.page = pageNo)
    setTotalPageNo(response.total_pages)
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (pageNo < totalPageNo) {
        setPageNo(pageNo + 1)
      }
    }
  }

  useEffect(() => {
    getDiscover()
  }, [params.explore, pageNo])
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  },[handleScroll])

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-2xl font-semibold my-3">Popular {params.explore} Show</h3>

        <div className="flex flex-wrap justify-center lg:justify-between gap-5">
          {
            discoverResponse && discoverResponse.map((item, i) => (
              <Card data={item} key={i} media_type={params.explore} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage