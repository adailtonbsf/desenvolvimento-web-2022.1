import { collection, getDocs, onSnapshot, query, addDoc, getDoc, doc, updateDoc, deleteDoc} from "firebase/firestore"

export default class FirebaseService {
    static unscribe = null

    static listStudents = (firestore, callback) => {
        getDocs(collection(firestore, 'students'))
            .then((querySnapshot) => {
                let students = []
                querySnapshot.forEach(
                    (doc) => {
                        const { name, course, ira } = doc.data()
                        students.push({ _id: doc.id, name, course, ira })
                    }
                )
                callback(students)
            })
            .catch((error) => console.log(error))
    }

    static listStudents_onSnapshot(firestore, callback) {

        const q = query(collection(firestore, 'students'))
        FirebaseService.unscribe = onSnapshot(
            q,
            (querySnapshot) => {
                let students = []
                querySnapshot.forEach(
                    (doc) => {
                        const { name, course, ira } = doc.data()
                        students.push({ _id: doc.id, name, course, ira })
                    }
                )
                callback(students)
            })
    }

    static createStudents = (firestore, callback, data) => {
        addDoc(collection(firestore, 'students'), data)
            .then(
                (doc) => {
                    console.log("CREATE:" + doc.id)
                    callback()
                }
            )
            .catch((error) => console.log(error))
    }


    static retrieveStudents = async(firestore, callback, _id) => {

        const docRef = doc(firestore, "students", _id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            callback(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    }

    static retrieveStudents_promisse = (firestore, callback, _id) => {
        const docRef = doc(firestore, "students", _id);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists) callback(docSnap.data())
        })
        .catch(error=>console.log(error))
    }

    static updateStudents = (firestore,callback,_id,body) => {
        const docRef = doc(firestore, "students", _id);
        updateDoc(docRef,body)
        .then(
            ()=>{
                callback()
            }
        )
        .catch((error)=>console.log(error))
    }
    
    static deleteStudents = (firestore,callback,_id) => {
        const docRef = doc(firestore, "students", _id);
        deleteDoc(docRef)
        .then(
            ()=>{
                callback()
            }
        )
        .catch((error)=>console.log(error))
    }

    static listProfessors = (firestore, callback) => {
        getDocs(collection(firestore, 'professors'))
            .then((querySnapshot) => {
                let professors = []
                querySnapshot.forEach(
                    (doc) => {
                        const { name, university, degree } = doc.data()
                        professors.push({ _id: doc.id, name, university, degree })
                    }
                )
                callback(professors)
            })
            .catch((error) => console.log(error))
    }

    static listProfessors_onSnapshot(firestore, callback) {

        const q = query(collection(firestore, 'professors'))
        FirebaseService.unscribe = onSnapshot(
            q,
            (querySnapshot) => {
                let professors = []
                querySnapshot.forEach(
                    (doc) => {
                        const { name, university, degree } = doc.data()
                        professors.push({ _id: doc.id, name, university, degree })
                    }
                )
                callback(professors)
            })
    }

    static createProfessors = (firestore, callback, data) => {
        addDoc(collection(firestore, 'professors'), data)
            .then(
                (doc) => {
                    console.log("CREATE:" + doc.id)
                    callback()
                }
            )
            .catch((error) => console.log(error))
    }


    static retrieveProfessors = async(firestore, callback, _id) => {

        const docRef = doc(firestore, "professors", _id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            callback(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    }

    static retrieveProfessors_promisse = (firestore, callback, _id) => {
        const docRef = doc(firestore, "professors", _id);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists) callback(docSnap.data())
        })
        .catch(error=>console.log(error))
    }

    static updateProfessors = (firestore,callback,_id,body) => {
        const docRef = doc(firestore, "professors", _id);
        updateDoc(docRef,body)
        .then(
            ()=>{
                callback()
            }
        )
        .catch((error)=>console.log(error))
    }
    
    static deleteProfessors = (firestore,callback,_id) => {
        const docRef = doc(firestore, "professors", _id);
        deleteDoc(docRef)
        .then(
            ()=>{
                callback()
            }
        )
        .catch((error)=>console.log(error))
    }

}