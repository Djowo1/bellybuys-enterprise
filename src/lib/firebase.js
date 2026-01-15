import { PRESET_REVIEWS } from '../utils/constants';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut, onAuthStateChanged, updateEmail, sendEmailVerification } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Lazy-loaded Firebase modules
let app = null;
let db = null;
let storage = null;
let auth = null;

const getFirebaseApp = async () => {
  if (!app) {
    const { initializeApp, getApps } = await import('firebase/app');
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
};

const getFirestoreDb = async () => {
  if (!db) {
    const { getFirestore } = await import('firebase/firestore');
    const app = await getFirebaseApp();
    db = getFirestore(app);
  }
  return db;
};

const getStorageInstance = async () => {
  if (!storage) {
    const { getStorage } = await import('firebase/storage');
    const app = await getFirebaseApp();
    storage = getStorage(app);
  }
  return storage;
};

const getAuthInstance = async () => {
  if (!auth) {
    const { getAuth } = await import('firebase/auth');
    const app = await getFirebaseApp();
    auth = getAuth(app);
  }
  return auth;
};

// Blog Functions
export const createBlog = async (blogData) => {
  try {
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    const db = await getFirestoreDb();
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
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore');
    const db = await getFirestoreDb();
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
    const { doc: docFn, updateDoc, serverTimestamp } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const blogRef = docFn(db, 'blogs', blogId);
    await updateDoc(blogRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to update blog post. Please try again.' };
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const { doc: docFn, deleteDoc } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    await deleteDoc(docFn(db, 'blogs', blogId));
    return { success: true };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to delete blog post. Please try again.' };
  }
};

export const getBlogById = async (blogId) => {
  try {
    const db = await getFirestoreDb();
    const docRef = doc(db, 'blogs', blogId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting blog by ID:', error);
    return null;
  }
};

export const approveBlog = async (blogId) => {
  return await updateBlog(blogId, { approved: true });
};

// Review Functions
export const createReview = async (reviewData) => {
  try {
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to submit review. Please try again.' };
  }
};

export const getReviews = async () => {
  try {
    const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const dbReviews = [];
    querySnapshot.forEach((doc) => {
      dbReviews.push({ id: doc.id, ...doc.data() });
    });

    // Combine presets and DB reviews, shuffle
    const allReviews = [...PRESET_REVIEWS, ...dbReviews];
    const shuffled = allReviews.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Return up to 10 mixed reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return PRESET_REVIEWS; // Fallback to presets
  }
};

// Order Functions
export const createOrder = async (orderData) => {
  try {
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to create order. Please try again.' };
  }
};

export const getOrders = async () => {
  try {
    const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return [];
  }
};

// Image Upload Function (using Cloudinary)
export const uploadImage = async (file, path = 'images') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Set in env
    formData.append('folder', path);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.secure_url) {
      return { success: true, url: data.secure_url };
    } else {
      return { success: false, error: data.error?.message || 'Upload failed' };
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: error.message };
  }
};

// Admin Profile Functions
export const updateAdminProfile = async (profileData) => {
  try {
    const { doc: docFn, updateDoc, serverTimestamp } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const profileRef = docFn(db, 'adminProfiles', 'currentAdmin');
    await updateDoc(profileRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to update profile. Please try again.' };
  }
};

export const getAdminProfile = async () => {
  try {
    const { doc: docFn, getDoc } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const profileRef = docFn(db, 'adminProfiles', 'currentAdmin');
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      return { success: true, data: profileSnap.data() };
    } else {
      return { success: false, error: 'Profile not found' };
    }
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return { success: false, error: 'Failed to load profile. Please try again.' };
  }
};

// Business Data Functions (for analytics)
export const getBusinessData = async () => {
  try {
    const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
    const db = await getFirestoreDb();
    const dataRef = collection(db, 'businessData');
    const q = query(dataRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    // Silent error handling - don't show console errors to users
    return [];
  }
};

// Auth Utility Functions
export const loginAdmin = async (email, password) => {
  try {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    const auth = await getAuthInstance();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    let friendlyError = 'Login failed. Please try again.';
    if (error.code === 'auth/invalid-credential') {
      friendlyError = 'Invalid email or password.';
    } else if (error.code === 'auth/user-disabled') {
      friendlyError = 'Your account has been disabled.';
    } else if (error.code === 'auth/user-not-found') {
      friendlyError = 'Account not found.';
    } else if (error.code === 'auth/wrong-password') {
      friendlyError = 'Incorrect password.';
    } else if (error.code === 'auth/too-many-requests') {
      friendlyError = 'Too many failed attempts. Try again later.';
    } else if (error.code === 'auth/network-request-failed') {
      friendlyError = 'Network error. Check your connection.';
    }
    return { success: false, error: friendlyError, code: error.code };
  }
};

export const changeAdminPassword = async (currentPassword, newPassword) => {
  try {
    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import('firebase/auth');
    const auth = await getAuthInstance();
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: 'No user is currently signed in' };
    }
    // Reauthenticate user with current password before updating
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    // Silent error handling - don't show console errors to users
    let friendlyError = 'Failed to change password. Please try again.';
    if (error.code === 'auth/wrong-password') {
      friendlyError = 'Current password is incorrect.';
    } else if (error.code === 'auth/weak-password') {
      friendlyError = 'New password is too weak.';
    } else if (error.code === 'auth/requires-recent-login') {
      friendlyError = 'Please log in again before changing your password.';
    }
    return { success: false, error: friendlyError, code: error.code };
  }
};

export const changeAdminEmail = async (currentPassword, newEmail) => {
  try {
    const { EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendEmailVerification } = await import('firebase/auth');
    const auth = await getAuthInstance();
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: 'No user is currently signed in' };
    }
    // Reauthenticate user with current password before updating
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updateEmail(user, newEmail);
    // Send verification email to the new email
    await sendEmailVerification(user);
    return { success: true, message: 'Email updated. Please check your new email for verification.' };
  } catch (error) {
    console.error('Error changing admin email:', error);
    return { success: false, error: error.message, code: error.code };
  }
};

export const logoutAdmin = async () => {
  try {
    const { signOut } = await import('firebase/auth');
    const auth = await getAuthInstance();
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out admin:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = async () => {
  const auth = await getAuthInstance();
  return auth.currentUser;
};

export const reauthenticateUser = async (email, password) => {
  try {
    const { EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth');
    const auth = await getAuthInstance();
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: 'No user is currently signed in' };
    }
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    return { success: true };
  } catch (error) {
    console.error('Error reauthenticating user:', error);
    return { success: false, error: error.message };
  }
};

export { db, storage, auth };