class TranslationService {
  translate(parameters, cb) {
    fetch(
      'https://' +
        process.env['BASE_URL'] +
        '/v1/?translate=' +
        parameters.word +
        '&group=' +
        parameters.group,
    )
      .then(response => response.json())
      .then(responseJson => {
        cb(responseJson.results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getGroups(cb) {
    fetch('https://' + process.env['BASE_URL'] + '/v1/groups')
      .then(response => response.json())
      .then(responseJson => {
        cb(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export {TranslationService};
