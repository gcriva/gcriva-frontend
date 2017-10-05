import { MdSnackBar } from '@angular/material';

export function handleErrorResponse(snackbar: MdSnackBar) {
  return (errorResponse) => {
    console.log(errorResponse);
    const fallbackMessage = errorResponse.status === 500
      ? 'Ocorreu um erro no servidor'
      : 'Não foi possível conectar ao servidor';
    let { errors, message } = errorResponse.json();
    if (errors) {
      if (errors.message) {
        message = errors.message;
      } else if (Object.keys(errors).length) {
        const firstKey = Object.keys(errors)[0];
        message = `${firstKey}: ${errors[firstKey].message}`;
      }
    }

    snackbar.open(message || fallbackMessage, null, {
      duration: 2000
    });
  };
}

export const isMobile =
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
