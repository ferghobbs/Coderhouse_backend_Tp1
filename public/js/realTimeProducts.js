const socket = io();

const emitirMsj = () => {
  const message = document.getElementById("msgBox").value;

  socket.emit("new-message", message);
};

socket.on("prods", (prods) => {
  const html = prods
    .map((prod, inde) => {
      return `<div>
            <em> ID=${prod.id} - ${prod.title} - ${prod.description}: $${prod.price} stock: ${prod.stock} </em>
            <button onclick=eliminarProd(${prod.id})>Eliminar producto</button>
            </div>`;
    })
    .join(" ");

  document.getElementById("prods").innerHTML = html;
});
//Eliminar automatico
function eliminarProd(id) {
  fetch(`product/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Item deleted successfully");
      } else {
        console.log("Error deleting item");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Eliminar generico
const deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener("submit", (event) => {
  const deleteId = document.getElementById("idDel").value;
  event.preventDefault();
  fetch(`${deleteForm.action}/${deleteId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Item deleted successfully");
      } else {
        console.log("Error deleting item");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
