import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthProvider";
import { testAuthenticatedApi } from "./services/api";

function Home() {
    const { auth } = useContext(AuthContext);
    const [testResponse, setTestResponse] = useState();

    useEffect( () => {
        if(auth.length > 0 ) {
            testAuthenticatedApi( {"Authorization": "Bearer " + auth}
            ).then(
                res => {
                    setTestResponse(res.data.response);
                }
            )
        }
    }, [auth])

    return(
        <>
            <h1>Home</h1>
            {auth.length > 0 && <p>{testResponse}</p>}
        </>
    )
}

export default Home;