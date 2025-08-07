// 🟢 Classe représentant un utilisateur
class User {
  constructor(first_name, name, email,phone, localisation,password) {
    this.first_name = first_name;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.localisation = localisation;
    this.password = password;
  }
  createField(titre,valeur,classname){
    let b=document.createElement('b');
    b.textContent=titre + "   ";
    let span=document.createElement('span');
    span.textContent=valeur + "     ";
    let div =document.createElement('div');
    div.appendChild(b);
    div.appendChild(span);
    div.classList.add(classname);
    return div

  }
  convertToHtml(id){
    const prenom=this.createField("PRENOM",this.first_name,'prenom');
    const nom=this.createField("NOM",this.name,'nom');
    const email=this.createField("EMAIL",this.email,'email');
    const localisation=this.createField("LOCALISATION",this.localisation,'localisation');
    const phone=this.createField("phone",this.phone,'phone');
    const password=this.createField("mot de passe ",this.password,'password');
    const element=document.createElement('div');
    const deleted=document.createElement('button');
    element.appendChild(prenom);
    element.appendChild(nom);
    element.appendChild(email);
    element.appendChild(phone);
    element.appendChild(localisation);
    element.appendChild(password);
    element.appendChild(deleted)
    deleted.classList.add('del');
    deleted.textContent="SUPPRIMER"
    element.id="User_id"+ id
    return element;
  }
}

// 🟢 Classe pour gérer la base IndexedDB
class UserDB {
  constructor() {
    this.dbName = "DBpharmatrix"; // Nom de la base
    this.storeName = "users"; //Nom du "store" (équivalent d'une table)
    this.db = null; // Si déjà ouverte, on la retourne
  }

  // 🟢 Méthode pour ouvrir la base
  async openDB() {
    // ✅ Si la base est déjà ouverte, on la retourne directement
    if (this.db) {
      return this.db;
    }

    // ❌ ERREUR 1 : mauvaise orthographe de "request"
    // const resquest = indexedDB.open(this.dbName, 1);
    // ✅ CORRECTION :
    const request = indexedDB.open(this.dbName, 1);

    // ✅ Retourner une promesse pour attendre l'ouverture
    return new Promise((resolve, reject) => {
      // ❌ ERREUR 2 : usage incorrect de this.db ici
      // if (!this.db.objectStoreNames.contains(this.storeName)) {
      //   this.db.createObjectStore(this.storeName, { keyPath: "id" });
      // }
      // ✅ CORRECTION :
      request.onupgradeneeded = (event) => {
        const db = event.target.result; // On récupère la base
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "id", // Clé primaire
            autoIncrement: true, // ✅ Ajouté pour que l'id soit généré automatiquement
          });
        }
      };

      // ✅ Gestion du succès de l'ouverture
      request.onsuccess = (event) => {
        this.db = event.target.result; // On stocke la base
        resolve(this.db); // On résout la promesse avec la base ouverte
      };

      // ❌ ERREUR 3 : "Request" avec R majuscule et mauvaise gestion
      // Request.onerror = (event) => PromiseRejectionEvent(event.target.error);
      // ✅ CORRECTION :
      request.onerror = (event) => {
        reject(event.target.error); // On rejette proprement la promesse avec l'erreur
      };
    });
  }

  // 🟢 Méthode pour ajouter un utilisateur
  async addUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.add(user); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);

      // ❌ ERREUR 4 : variable `e` non définie ici
      // request.onerror = () => reject(e.target.error);
      // ✅ CORRECTION :
      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }
//Méthode pour mettre à jour un utilisateur
async updateUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.put(user); // 
      request.onsuccess = () => resolve(user);

      // ❌ ERREUR 4 : variable `e` non définie ici
      // request.onerror = () => reject(e.target.error);
      // ✅ CORRECTION :
      request.onerror = (e) => reject(e.target.error+"merci"); // On capture l'erreur correctement
    });
  }
  //Méthode pour lire un utilisateur
async readUser(id) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.get(id); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = (e) => {
        const user=e.target.result;
        if(user){
          resolve(user);
        }else{
          reject(new Error("Utilisateur non trouvé"));
        }
      };

     request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }

async deleteUser(user) {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.delete(user); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(user);

      // ❌ ERREUR 4 : variable `e` non définie ici
      // request.onerror = () => reject(e.target.error);
      // ✅ CORRECTION :
      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }

//Récupérer tous les utilisateurs
  async readAllUser() {
    const db = await this.openDB(); // On attend que la base soit prête

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(this.storeName); // Accès au store
      const request = store.getAll (); // Insertion de l'utilisateur

      // ✅ Si succès, on retourne l'utilisateur
      request.onsuccess = () => resolve(request.result);

      // ❌ ERREUR 4 : variable `e` non définie ici
      // request.onerror = () => reject(e.target.error);
      // ✅ CORRECTION :
      request.onerror = (e) => reject(e.target.error); // On capture l'erreur correctement
    });
  }

  printUser(){
    //Affichage de tous les utilisateurs
    document.querySelector("#user").innerHTML = " ";
const users= this.readAllUser();
if(users!=null){
  users.then((result)=>{
    if(result.length>0){
      for(let i=0;i<result.length;i++){
       const user= new User(
          result[i].first_name,result[i].name,result[i].email,result[i].phone,result[i].localisation,result[i].password
        );
        document.querySelector('#user').appendChild(user.convertToHtml(result[i].id));
      }
    }
  })
}

  }
}



/*//Déclaration des objets
const userDb=new UserDB();
/*let user=null;*/



//gerer le formulaire
const userDB = new UserDB();
let me=new User();
let id=null;

userDB.printUser();


document.addEventListener("DOMContentLoaded", () => {

  //selectionner les inputs
  const inputs=document.querySelectorAll(".papa8");
  const btn=document.querySelector(".papa11");
  const delet=document.querySelector('.delete');
  const updat =document.querySelector('.update');

  //empecher le button de recharger la page
  btn.addEventListener('click', async(e)=>
    {
      e.preventDefault();
      const [prenom,nom,email,tel,localisation,password]=Array.from(inputs).map(input=>input.value);
      if (!prenom || !nom || !email || !tel || !localisation || !password) 
      {
        alert("Veuillez Remplir tous les champs.")
        return;
      }
      const user = new User( prenom,nom,email,tel,localisation,password);
      await userDB.addUser(user);
      inputs.forEach(input=>input.value="");
      alert("Utilisateur ajouter avec success")
      userDB.printUser();
  })

  //jkhjjjjjjjjjjjjjjjjjjjjjjjjjj



  updat.addEventListener('click',async()=>{
    
     const [prenom,nom,email,tel,localisation,password]=Array.from(inputs).map(input=>input.value);
      if (!prenom || !nom || !email || !tel || !localisation || !password) 
      {
        alert("Veuillez Remplir tous les champs afin d'effectuer une mise à jour de vos infos.")
        return;
      }
      const user = new User( prenom,nom,email,tel,localisation,password); 
        /*db= await userDB.openDB();
        const tx = db.transaction(userDB.storeName, "readwrite"); // Création transaction
      const store = tx.objectStore(userDB.storeName);*/
     /* const bd=await userDB.readUser(email)
      bd.then(res=>{
        const user = new User( prenom,nom,email,tel,localisation,password); 
      if(res!=null){
        console.log(res)
      }
      
      })*/

      const users= userDB.readAllUser();
if(users!=null){
  users.then((result)=>{
    if(result.length> 0){
      for(let i=0;i<result.length;i++){
       const users= new User(
          result[i].first_name,result[i].name,result[i].email,result[i].phone,result[i].localisation,result[i].password
        );
        if(user.email==result[i].email){
          id=result[i].id;
          console.log('merci');
        if(user.prenom!=result[i].first_name){
          result[i].first_name=user.prenom
          
        }
        if(user.nom!=result[i].name){
          result[i].name=user.nom;
        }
        if(user.tel!=result[i].phone){
          result[i].phone=user.tel;
        }
        if(user.localisation!=result[i].localisation){
          result[i].localisation=user.localisation;
        }
        if(user.password!=result[i].password){
          result[i].password=user.password;
        }

        me.first_name=result[i].first_name
        me.name=result[i].name
        me.email=result[i].email
        me.phone=result[i].phone
        me.localisation=result[i].localisation
        me.password=result[i].password
        /*me={
          first_name:result[i].first_name,
          name:result[i].name,
          email:result[i].email,
          phone:result[i].phone,
          localisation:result[i].localisation,
          password:result[i].password
         }*/
        }
       
      }}
})
await userDB.updateUser(me);
inputs.forEach(input=>input.value="");
      alert("Utilisateur mis a jour  avec success") 
      userDB.printUser();
}else{
       inputs.forEach(input=>input.value="");
      alert("Utilisateur inexistant") 
      userDB.printUser();
        }
 //await userDB.updateUser(user);
})
})
  