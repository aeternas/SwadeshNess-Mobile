import {
  TranslationRequest,
  TotalResults,
  LanguageGroup,
} from '../interfaces/models/TranslationTypes';
import {ApiClient} from '../networking/ApiClient';

class TranslationService {
  translate(request: TranslationRequest): Promise<TotalResults> {
    let groups = request.groups.reduce(function(query, current) {
      return query + '&group=' + current;
    }, '');
    let fetchQuery = `https://${process.env['BASE_URL']}/v1/?translate=${
      request.word
    }${groups}`;
    return ApiClient.getSharedInstance().api(fetchQuery);
  }

  getGroups(): Promise<LanguageGroup[]> {
    return ApiClient.getSharedInstance().api(`https://${process.env['BASE_URL']}/v1/groups`);
  }
}

export {TranslationService};
