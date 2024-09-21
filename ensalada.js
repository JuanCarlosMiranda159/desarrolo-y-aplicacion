// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Cloud Firestore
const db = firebase.firestore();

// Agregar documentos
function guardar() {
  var ensalada = document.getElementById('ensalada').value;
  var descripcion = document.getElementById('descripcion-ensalada').value;
  var valor = document.getElementById('valor-ensalada').value;
  var tipo = document.getElementById('tipo-ensalada').value;
  var sabor = document.getElementById('sabor-ensalada').value;

  db.collection("ensalada").add({
      first: ensalada,
      last: descripcion,
      born: valor,
      tipo: tipo,
      sabor: sabor
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      limpiarInputs();
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

// Limpiar inputs
function limpiarInputs() {
  document.getElementById('ensalada').value = '';
  document.getElementById('descripcion-ensalada').value = '';
  document.getElementById('valor-ensalada').value = '';
  document.getElementById('tipo-ensalada').value = '';
  document.getElementById('sabor-ensalada').value = '';
}

// Leer documentos
var tabla = document.getElementById('tabla');
db.collection("comidas").onSnapshot((querySnapshot) => {
  tabla.innerHTML = ``;
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().first}`);
      tabla.innerHTML += `
          <tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().first}</td>
              <td>${doc.data().last}</td>
              <td>${doc.data().born}</td>
              <td>${doc.data().tipo}</td>
              <td>${doc.data().sabor}</td>
              <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
              <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}', '${doc.data().tipo}', '${doc.data().sabor}')">Editar</button></td>
          </tr>
      `;
  });
});

// Borrar documentos
function eliminar(id) {
  db.collection("comidas").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}

// Editar documentos
function editar(id, comida, descripcion, valor, tipo, sabor) {
  document.getElementById('ensalada').value = comida;
  document.getElementById('descripcion-ensalada').value = descripcion;
  document.getElementById('valor-ensalada').value = valor;
  document.getElementById('tipo-ensalada').value = tipo;
  document.getElementById('sabor-ensalada').value = sabor;
  
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';

  boton.onclick = function() {
      var washingtonRef = db.collection("comidas").doc(id);
      
      return washingtonRef.update({
          first: comida,
          last: descripcion,
          born: valor,
          tipo: tipo,
          sabor: sabor
      })
      .then(() => {
          console.log("Document successfully updated!");
          boton.innerHTML = 'Guardar';
          limpiarInputs();
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
  }
}