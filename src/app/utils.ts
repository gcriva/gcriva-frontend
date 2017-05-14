import { MdSnackBar } from '@angular/material';

export function handleErrorResponse(snackbar: MdSnackBar) {
  return (errorResponse) => {
    console.log(errorResponse);
    const fallbackMessage = errorResponse.status === 500
      ? 'Ocorreu um erro no servidor'
      : 'Não foi possível conectar ao servidor';

    snackbar.open(errorResponse.json().message || fallbackMessage, null, {
      duration: 2000
    });
  };
}
