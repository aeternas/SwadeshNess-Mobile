class CachedWordsUpdateService {
  private async api<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export {CachedWordsUpdateService};
