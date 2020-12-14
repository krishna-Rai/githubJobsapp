import axios from 'axios'
import {useReducer,useEffect} from 'react'
import { act } from 'react-dom/test-utils';

const ACTIONS = {
    'REQUEST_DATA' : 'load-data',
    'GET_DATA' : 'get-data',
    'ERROR' : 'error',
    'CHECK_NEXT_PAGE' : 'check-next-page'
}
const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const reducer = (state,action)=>{
    switch(action.type){
        case ACTIONS.REQUEST_DATA:
            return {loading:true,jobs:[]}
        case ACTIONS.GET_DATA:
            return {loading:false,jobs:action.payload.jobs}
        case ACTIONS.ERROR:
            return {...state,loading:false,error:action.payload.error,jobs:[]}
        
        case ACTIONS.CHECK_NEXT_PAGE:
            return {...state,hasNextPage:action.payload.hasNextPage}
        default:
            return state
    }
}

const useFetchJobs = (params,page) => {
    const [state,dispatch] = useReducer(reducer,{jobs:[],loading:true})

    useEffect(()=>{
        dispatch({type:ACTIONS.REQUEST_DATA})
        const cancelToken1 = axios.CancelToken.source()
        axios.get(BASE_URL,{
            cancelToken:cancelToken1.token,
            params:{markdown:true,page:page,...params}
        }).then(res=>{
            dispatch({type:ACTIONS.GET_DATA,payload:{jobs:res.data}})
        }).catch((e)=>{
            if(axios.isCancel(e)) return
            dispatch({type:ACTIONS.ERROR,payload:{error:e}})
        })
        const cancelToken2 = axios.CancelToken.source();
         axios
           .get(BASE_URL, {
             cancelToken: cancelToken2.token,
             params: { markdown: true, page: page+1, ...params },
           })
           .then((res) => {
             dispatch({ type: ACTIONS.CHECK_NEXT_PAGE, payload: { hasNextPage:res.data.length!==0} });
           })
           .catch((e) => {
             if (axios.isCancel(e)) return;
             dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
           });
        return ()=>{
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    },[params,page])

    return state
}

export default useFetchJobs
