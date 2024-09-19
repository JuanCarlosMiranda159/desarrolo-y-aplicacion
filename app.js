const firebaseConfig = {
  apiKey: "AIzaSyCDVtzBACE4aS4iCF_UKZS02vmZ9dSp4bQ",
  authDomain: "cafeteria-1ce83.firebaseapp.com",
  projectId: "cafeteria-1ce83",
  storageBucket: "cafeteria-1ce83.appspot.com",
  messagingSenderId: "87934821084",
  appId: "1:87934821084:web:0bc4dff37fbadada6eca19",
  measurementId: "G-GGVLE2PZXN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Fires´tore and get a reference to the service
const db = firebase.firestore();

//Agregar documentos
function guardar(){
	var comida = document.getElementById('comida').value;
	var descripcion= document.getElementById('descripcion').value;
	var valor = document.getElementById('valor').value;
  db.collection("comidas").add({
    first: comida,
    last: descripcion,
    born: valor
  })

  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    var comida = document.getElementById('comida').value='';
	  var descripcion= document.getElementById('descripcion').value='';
	  var valor = document.getElementById('valor').value='';
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("comidas").onSnapshot((querySnapshot) => {
  tabla.innerHTML =``;
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().first}`);
      tabla.innerHTML += `
      <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().first}</td>
      <td>${doc.data().last}</td>
      <td>${doc.data().born}</td>
      <td><button class="btn btn-danger" onclick=eliminar('${doc.id}')>Eliminar</button></td>
      <td><button class="btn btn-warning" onclick=editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')>Editar</button></td>
      </tr> `        
  });
});

//borrar documentos
function eliminar(id){
  db.collection("comidas").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

//editar documentos
function editar(id,comidas,descripcion,valor){
  document.getElementById('comida').value=comida
  document.getElementById('descripcion').value=descripcion
  document.getElementById('valor').value=valor
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar'

  boton.onclick = function(){
    var washingtonRef = db.collection("comidas").doc(id);
    
    var comida = document.getElementById('comida').value
    var descripcion = document.getElementById('descripcion').value
    var valor = document.getElementById('valor').value

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
      first: comidas,
      last: descripcion,
      born: valor
    })
    .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar'
        var comidas = document.getElementById('comidas').value='';
	      var descripcion= document.getElementById('descripcion').value='';
	      var valor = document.getElementById('valor').value=''
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}