export async function fetchServerData(url: string): Promise<any> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res?.statusText}`);
    }
    return res.json();
  }
  