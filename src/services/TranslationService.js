class TranslationService {
  translate(parameters, cb) {
    var groupsQuery = parameters.groups.reduce(function(query, current) {
      return query + '&group=' + current;
    }, '');
    fetch(
      'https://' +
        process.env['PROD_BASE_URL'] +
        '/v1/?translate=' +
        parameters.word +
        groupsQuery,
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
    fetch('https://' + process.env['PROD_BASE_URL'] + '/v1/groups')
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
