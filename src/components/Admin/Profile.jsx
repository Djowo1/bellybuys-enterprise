'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { updateAdminProfile, getAdminProfile, uploadImage, changeAdminPassword } from '../../lib/firebase';
import { useModal } from '../../hooks/useModal';
import Modal from '../UI/Modal';
import styles from './Profile.module.css';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@bellybuys.com',
    avatar: '/images/logo-3.png',
    bio: 'Administrator of BellyBuys Enterprise'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { modalState, showModal } = useModal();

  useEffect(() => {
    const loadProfile = async () => {
      const result = await getAdminProfile();
      if (result.success) {
        setProfile(result.data);
        localStorage.setItem('adminProfile', JSON.stringify(result.data));
      } else {
        // Fallback to localStorage
        const savedProfile = localStorage.getItem('adminProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      }
    };
    loadProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Upload image if changed
      let updatedProfile = { ...profile };
      if (profile.imageFile) {
        const uploadResult = await uploadImage(profile.imageFile, 'profiles');
        if (uploadResult.success) {
          updatedProfile.avatar = uploadResult.url;
        } else {
          await showModal('Upload Failed', uploadResult.error, 'error');
          return;
        }
      }
      // Update Firebase
      const result = await updateAdminProfile(updatedProfile);
      if (result.success) {
        localStorage.setItem('adminProfile', JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
        setIsEditing(false);
        await showModal('Success', 'Profile updated successfully!', 'success');
      } else {
        await showModal('Update Failed', result.error, 'error');
      }
    } catch (error) {
      await showModal('Error', 'An unexpected error occurred. Please try again.', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      await showModal('Password Mismatch', 'New passwords do not match!', 'warning');
      return;
    }
    const result = await changeAdminPassword(passwordData.currentPassword, passwordData.newPassword);
    if (result.success) {
      await showModal('Success', 'Password changed successfully!', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } else {
      await showModal('Password Change Failed', result.error, 'error');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    // Handle image upload if changed
    if (updatedData.pictureFile) {
      const storage = getStorage();
      const imageRef = ref(storage, `profiles/${Date.now()}_${updatedData.pictureFile.name}`);
      await uploadBytes(imageRef, updatedData.pictureFile);
      updatedData.picture = await getDownloadURL(imageRef);
    }
    // Update localStorage
    localStorage.setItem('adminProfile', JSON.stringify(updatedData));
    // Update Firebase
    const profileRef = doc(db, 'adminProfiles', 'adminId'); // Use actual ID
    await updateDoc(profileRef, updatedData);
    setIsEditing(false);
    await showModal('Success', 'Profile updated successfully!', 'success');
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1>Admin Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <Image
                src={profile.avatar}
                alt="Admin Avatar"
                fill
                className={styles.avatarImage}
              />
              <label className={styles.avatarUpload}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </label>
            </div>
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
          </div>

          <div className={styles.actions}>
            <button 
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className={styles.passwordBtn}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <circle cx="12" cy="16" r="1"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Change Password
            </button>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleProfileUpdate} className={styles.editForm}>
            <h3>Edit Profile Information</h3>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows="3"
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        )}

        {showPasswordForm && (
          <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
            <h3>Change Password</h3>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn}>Change Password</button>
              <button type="button" onClick={() => setShowPasswordForm(false)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={modalState.onClose}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
}