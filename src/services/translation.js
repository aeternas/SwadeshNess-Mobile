class TranslationService {
  translate(string) {
    return fetch(
      'https://vpered.su:8080/dev/?translate' + string + '&group=turkic',
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.result;
      })
      .catch(error => {
        // NOOP
      });
  }
}
