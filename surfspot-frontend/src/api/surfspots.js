// src/api/surfspots.js

export async function fetchSurfspots(token) {
  const res = await fetch("http://localhost:3000/surfspots", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return await res.json();
}

export async function addSurfspot(data, token) {
  const res = await fetch("http://localhost:3000/surfspots/createspot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteSurfspot(id, token) {
  const res = await fetch(`http://localhost:3000/surfspots/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.status === 204;
}
