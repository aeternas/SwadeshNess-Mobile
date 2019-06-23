class ApiClient {
  static sharedInstance = null;

  static getSharedInstance() {
    if (ApiClient.sharedInstance == null) {
      ApiClient.sharedInstance = new ApiClient();
    }
    return this.sharedInstance;
  }

  async api<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export {ApiClient};
