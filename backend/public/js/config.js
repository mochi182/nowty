// checks if either the notasCookie or actividadesCookie exists. If so, both cookies are deleted

const deleteCookiesAndReload = () => {
    const notasCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('notas='));
const actividadesCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('actividades='));
  if (notasCookie || actividadesCookie) {
    document.cookie = 'notas=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'actividades=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    alert('The cookies were deleted.');
    location.reload();
  } else {
    alert('No cookies were deleted.');
  }
};

const button = document.querySelector('#delete-cookies-button');
button.addEventListener('click', deleteCookiesAndReload);
