class TranslationService {
  translate(string) {
    return fetch(
      'https://' +
        process.env['BASE_URL'] +
        '/v1/?translate=' +
        string +
        '&group=turkic',
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

export {TranslationService};
