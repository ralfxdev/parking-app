/**
 * Es una función que toma una ruta y datos como parámetros y
 * devuelve una promesa que se resuelve en un JSON object.
 * @param path - The path to the API endpoint.
 * @returns The response from the server.
 */
const API = "http://localhost:8000/api/";

export function getData(path) {
  return fetch(API + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
}

export function postData(path, data) {
  return fetch(API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export function deleteData(path) {
  return fetch(API + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function putData(path, data) {
  return fetch(API + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}
