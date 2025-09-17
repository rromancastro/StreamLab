export async function apiCall(endpoint, method = 'GET', data = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (data) options.body = JSON.stringify(data);
  const res = await fetch('https://c2871218.ferozo.com/server/api.php/' + endpoint, options);
  return await res.json();
}