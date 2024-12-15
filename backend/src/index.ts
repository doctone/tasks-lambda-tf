export const handler = async (event) => {
  console.log('Event: ', event);
  let responseMessage = 'Next time we add dynamo';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: responseMessage,
    }),
  }
}
