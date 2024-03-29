// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	writeBatch,
	query,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpAoGIQpY8uxRd1iBQmj8uOM1LiLLyQaQ",
  authDomain: "crown-clothing-db-87ce8.firebaseapp.com",
  projectId: "crown-clothing-db-87ce8",
  storageBucket: "crown-clothing-db-87ce8.appspot.com",
  messagingSenderId: "884964496482",
  appId: "1:884964496482:web:925a79e8aaa832e900ed3b",
  measurementId: "G-T5F07Y6RBS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionKey);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
}

export const getCategoriesAndDocuments = async() => {
	const collectionRef = collection(db, 'collections');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
	return categoryMap;
}


export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
	if(!userAuth) return;
	
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { 
				displayName, email, createdAt, ...additionalInformation,});

		} catch(error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
	if(!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
	if(!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth,callback);
}