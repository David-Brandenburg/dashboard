export default async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch("http://localhost:5000" + url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
