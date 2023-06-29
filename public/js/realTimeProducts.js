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
            <button onclick=eliminarProd("${prod.id}")>Eliminar producto</button>
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
  eliminarProd(deleteId);
  document.getElementById("idDel").value = "";
});

const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const prod = {
    title: postForm.elements["title"].value,
    description: postForm.elements["description"].value,
    price: postForm.elements["price"].value,
    stock: postForm.elements["stock"].value,
    thumbnail: postForm.elements["thumbnail"].value,
    code: postForm.elements["code"].value,
  };
  socket.emit("newProd", prod);
  for (let i = 0; i < postForm.elements.length; i++) {
    const element = postForm.elements[i];

    // Verificar si el elemento es un campo de entrada editable
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
      // Establecer el valor en blanco o en un valor predeterminado
      element.value = "";
    } else if (element.tagName === "SELECT") {
      // Restablecer la opción seleccionada al primer elemento
      element.selectedIndex = 0;
    }
  }
});
