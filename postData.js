export async function postData(url, data) {
  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'text/plain'
          },
          body: JSON.stringify(data)
      });

      console.log('trying to send POST request', url, 'with data:', data);

      if (!response.ok) {
          throw new Error('Failed to perform POST request');
      }

      const result = await response.json();
      return result;

  } catch (error) {
      console.error(error);
      return null;
  }
}