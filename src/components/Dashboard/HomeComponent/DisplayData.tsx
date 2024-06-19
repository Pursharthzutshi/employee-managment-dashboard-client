import React, { useEffect } from "react";
import {useQuery,useLazyQuery,gql} from "@apollo/client"


const showUsersEmailIdsQuery = gql`
query fetchEmailUsersIds{
  fetchEmailUsersIds {
    emailId
  }
}
`

function DisplayData(){
    const {data,loading,error,refetch} = useQuery(showUsersEmailIdsQuery,{
        onCompleted: (data) => {
            // console.log('User data:', data);
            // Optionally refetch data here
          },
              onError:(error)=>{
            console.log(error);
          } 
    });

    return{
        data,
        loading,
        error,
        refetch,
        showUsersEmailIdsQuery
    }
}

export  default DisplayData