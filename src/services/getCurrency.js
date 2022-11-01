const getCurrency = async () => {
  const link = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(link);
  const data = await request.json();
  return data;
};

export default getCurrency;
