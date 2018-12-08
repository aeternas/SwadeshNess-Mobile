import {
  TranslationRequest,
  TotalResults,
  LanguageGroup
} from '../interfaces/models/TranslationTypes';

class TranslationService {
  private async api<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  translate(request: TranslationRequest): Promise<TotalResults> {
    let groups = request.groups.reduce(function(query, current) {
      return query + '&group=' + current;
    }, '');
    let fetchQuery = `https://${process.env['BASE_URL']}/v1/?translate=${
      request.word
    }${groups}`;
    return this.api(fetchQuery);
  }

  getGroups(): Promise<LanguageGroup[]> {
    return this.api(`https://${process.env['BASE_URL']}/v1/groups`);
  }
}

export {TranslationService};
