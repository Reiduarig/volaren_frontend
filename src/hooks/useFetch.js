import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useFetch = async(url) => {
        
    const [data, setData] = useState()
    const user = useSelector(s => auth);


    useEffect(() => {
      const opts = {};
      if(user.id){
        opts.headers = {'Authorization': 'Bearer ' + user.token}
      }
      fetch(url, opts)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }, [url, user])

    return data
  
}
