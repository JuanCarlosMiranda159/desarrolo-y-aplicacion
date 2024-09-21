const firebaseConfig = {
  apiKey: "AIzaSyBUeKmIliOkzdnfcCwLqqZ0QX6ieRyQ9HU",
  authDomain: "cafeteria-6a672.firebaseapp.com",
  projectId: "cafeteria-6a672",
  storageBucket: "cafeteria-6a672.appspot.com",
  messagingSenderId: "374050151958",
  appId: "1:374050151958:web:949cc694a4796478559f37",
  measurementId: "G-VH30DWCPKE"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();
  
  // Agregar documentos
  function guardar() {
    var comida = document.getElementById('comida').value;
    var descripcion = document.getElementById('descripcion').value;
    var valor = document.getElementById('valor').value;
    var tipo = document.getElementById('tipo').value;
    var sabor = document.getElementById('sabor').value;
  
    db.collection("comidas").add({
      first: comida,
      last: descripcion,
      born: valor,
      tipo: tipo,
      sabor: sabor
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('comida').value = '';
      document.getElementById('descripcion').value = '';
      document.getElementById('valor').value = '';
      document.getElementById('tipo').value = '';
      document.getElementById('sabor').value = '';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
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
          <td><button class="btn btn-danger" onclick=eliminar('${doc.id}')>Eliminar</button></td>
          <td><button class="btn btn-warning" onclick=editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}','${doc.data().tipo}','${doc.data().sabor}')>Editar</button></td>
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
    document.getElementById('comida').value = comida;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('valor').value = valor;
    document.getElementById('tipo').value = tipo;
    document.getElementById('sabor').value = sabor;
    
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
        document.getElementById('comida').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('sabor').value = '';
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
  }