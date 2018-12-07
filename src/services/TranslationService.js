class TranslationService {
  translate(parameters, cb) {
    let groups = parameters.groups.reduce(function(query, current) {
      return query + '&group=' + current;
    }, '');
    let fetchQuery = `https://${process.env['BASE_URL']}/v1/?translate=${
      parameters.word
    }${groups}`;
    fetch(fetchQuery)
      .then(response => response.json())
      .then(responseJson => {
        cb(responseJson.results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getGroups(cb) {
    fetch(`https://${process.env['BASE_URL']}/v1/groups`)
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
