export async function ADD_FRIEND(name) {
  const res = await fetch("http://localhost:5000/Friends", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });
  const data = await res.json();
  return data;
}
export async function EDIT_FRIEND(id, editedName) {
  const originalFriend = await GET_FRIEND(id);
  const res = await fetch(`http://localhost:5000/Friends/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: editedName, id: originalFriend.id }),
  });
  const data = await res.json();
  return data;
}
export async function REMOVE_FRIEND(id) {
  const res = await fetch(`http://localhost:5000/Friends/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}
async function GET_FRIEND(id) {
  const res = await fetch(`http://localhost:5000/Friends/${id}`);
  const data = await res.json();
  return data;
}
