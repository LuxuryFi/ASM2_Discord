$(document).ready(() => {

    $('#form').submit(function (event) {
        const username = $('#username').val();
        const password = $('#password').val();

        const data = {
            username : username,
            password : password
        }

        // if (validate('localhost:3000/auth', data)) {
        //     console.log('hehe');
        // }
        // else {
        //     alert('Broke');
        // }

        const result = await validate('localhost:3000/auth', data);

        event.preventDefault();
    })

    async function validate(url, data) {
        console.log('hehe')
        fetch(url, {
            method: "GET",
            mode: "cors",
            cache:"no-cache",
            headers:{
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrer:"no-referrer",
            body: JSON.stringify(data)
        }).then( (response) => {
            alert(response);
        })
    }



})
