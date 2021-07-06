$(document).ready(() => {

    $('#form').submit(async function (event) {
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

        const result = await validate('http://www.uncen.net/auth', data);
        console.log(result)
    })

    async function validate(url, data) {
        await fetch(url, {
            method: "POST",
            cache:"no-cache",
            mode: "cors",
            headers:{
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrer:"no-referrer",
            body: JSON.stringify(data)
        }).then( res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }



})
