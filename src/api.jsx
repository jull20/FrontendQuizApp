import { useEffect } from 'react';

useEffect(() => {
    fetch("data.json").then((response) => {
        if(!response.ok) console.log("Bad data!");
        console.log(localStorage.getItem(response))
        return response.json();
    })
    .then(data => {
        data.quizzes.forEach(theme => {
            localStorage.setItem(theme.title, JSON.stringify(theme));
        })
    })
}, []);
