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

function showErrorProvider(message) {
    const errorProvider = document.getElementsByClassName('error-provider')[0];
    const modalInput = document.getElementById('session_name');
    const paragraph = document.createElement('p');
    paragraph.className = 'errorProviderText';
    paragraph.innerHTML = message;
    errorProvider.appendChild(paragraph);
    errorProvider.style.display = 'flex';
    setTimeout(() => {
        errorProvider.style.display = 'none';
        errorProvider.removeChild(paragraph);
    }, 5000);
}