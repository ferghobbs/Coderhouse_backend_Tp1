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
            </div>`;
    })
    .join(" ");

  document.getElementById("prods").innerHTML = html;
});
