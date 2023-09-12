async function postLogin(username, password) {
    const url =`${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response =awaitfetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            "username": username,
            "password": password,
        }),
    });

    if (!response.ok) {
        const fallbackError =`Error trying to login`;

        const data =awaitresponse.json().catch(() =>{
            thrownewError(fallbackError);
        });

        const errorMessage = data?.detail?? fallbackError;
        thrownewError(errorMessage);
    }

    return await response.json();
}

export default postLogin;