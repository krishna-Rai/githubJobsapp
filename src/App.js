import React, {useState} from 'react'
import useFetchJobs from './useFetchJobs'
import { Container } from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'
import ParamForm from './ParamForm'

function App() {
  const [params,setParams] = useState({})
  const [page,setPage] = useState(1)

  const {jobs,loading,error,hasNextPage} = useFetchJobs(params,page)

  const handleParamChange=(e)=>{
    const name = e.target.name
    const value = e.target.value
    setParams((prevParams)=>{
      return {...prevParams,[name]:value}
    })
  }

  return (
    <Container className="my-4">
      <h1>Github Jobs</h1>
      <ParamForm params={params} handleParamChange={handleParamChange}/>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading</h1>}
      {error && <h1>Error Try Reloading</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
