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
     
          },
       
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