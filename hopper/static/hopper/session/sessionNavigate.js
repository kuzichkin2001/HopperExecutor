function createSession(event) {
    event.preventDefault();
    const form = document.getElementsByClassName("new_session_form")[0];
    const modalInput = document.getElementById('session_name');
    if (modalInput.value.length <= 0) {
        showErrorProvider('Введите верное название проекта (оно должно быть непустым)');
    } else {
        const csrf_token = Cookies.get('csrftoken');
        fetch(form.action, {
            method: 'POST',
            headers: {
                "X-CSRFToken": csrf_token,
            },
            body: JSON.stringify({
                "name": document.getElementById("session_name").value,
                "creationDate": Date.now(),
                "code": '',
                "kuz_place": 0,
            }),
        })
            .then(response => response.json())
            .catch(error => console.error(error))
            .finally(data => console.log(data));
        setTimeout(() => {
            location.reload();
        }, 350);
    }
}

function deleteSession(event, id) {
    event.preventDefault();
    const csrf_token = Cookies.get('csrftoken');
    fetch(`/delete_session/${id}`, {
        headers: {
            "X-CSRFToken": csrf_token,
        },
        method: "DELETE",
    });
    setTimeout(() => {
        location.reload();
    }, 250);
}

function onSubmit() {
    const sessionForm = document.getElementsByClassName("new_session_form")[0];
    sessionForm.addEventListener('click', (event) => {
        event.preventDefault();
    });
}