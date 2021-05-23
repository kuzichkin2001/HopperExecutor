function toggleModalVisibility() {
    const modalForm = document.getElementsByClassName('modal-form')[0];
    const input = document.getElementById('session_name');
    if (modalForm.style.display === 'none') {
        modalForm.style.display = 'flex';
        input.focus();
    } else {
        modalForm.style.display = 'none';
    }
}