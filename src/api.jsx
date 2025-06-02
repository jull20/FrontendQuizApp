import { useEffect } from 'react';

fetch("data.json").then((response) => {
    if(!response.ok) console.log("Bad data!")
    return response.json();
})
.then(data => {
    data.quizzes.forEach(theme => {
        localStorage.setItem(theme.title, JSON.stringify(theme));
    })
})
