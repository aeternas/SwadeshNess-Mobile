class TranslationService {
  constructor(props) {
    this.baseURL = '';
  }
  translate(string) {
    return fetch(
      'https://' + baseURL + '/v1/?translate=' + string + '&group=turkic',
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
