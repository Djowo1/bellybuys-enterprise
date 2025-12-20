// src/lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Blog Functions
export const createBlog = async (blogData) => {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      approved: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating blog:', error);
    return { success: false, error: error.message };
  }
};

export const getBlogs = async (approvedOnly = true) => {
  try {
    const blogsRef = collection(db, 'blogs');
    let q = approvedOnly 
      ? query(blogsRef, where('approved', '==', true), orderBy('createdAt', 'desc'))
      : query(blogsRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const updateBlog = async (blogId, updateData) => {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    await updateDoc(blogRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBlog = async (blogId) => {
  try {
    await deleteDoc(doc(db, 'blogs', blogId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: error.message };
  }
};

export const approveBlog = async (blogId) => {
  return await updateBlog(blogId, { approved: true });
};

// Review Functions
export const createReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, error: error.message };
  }
};

export const getReviews = async () => {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

// Order Functions
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

export const getOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Image Upload Function
export const uploadImage = async (file, path = 'images') => {
  try {
    const timestamp = Date.now();
    const fileName = `${path}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
};

export { db, storage, auth };