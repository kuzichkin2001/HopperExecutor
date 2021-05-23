function saveCurrentSession(event, id) {
    event.preventDefault();
    const csrf_token = Cookies.get('csrftoken');
    const code = document.getElementById("command-input").value;
    console.log(code, id);
    fetch(`/save_session`, {
        method: 'PATCH',
        headers: {
            "X-CSRFToken": csrf_token,
        },
        body: JSON.stringify({
            id: id,
            code: code,
            kuz_place: 0,
        }),
    });
}