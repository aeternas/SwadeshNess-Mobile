class TranslationService {
  translate(word, cb) {
    fetch(
      'https://' +
        process.env['BASE_URL'] +
        '/v1/?translate=' +
        word +
        '&group=turkic',
    )
      .then(response => response.json())
      .then(responseJson => {
        cb(responseJson.results);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export {TranslationService};
