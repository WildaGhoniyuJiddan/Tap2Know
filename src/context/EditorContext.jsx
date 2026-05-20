"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export const fontStyleMap = {
  // Display Fonts
  'Anton': 'var(--font-anton), sans-serif',
  'Bebas Neue': 'var(--font-bebas-neue), sans-serif',
  'Space Grotesk': 'var(--font-space-grotesk), sans-serif',
  'Syne': 'var(--font-syne), sans-serif',
  'Oswald': 'var(--font-oswald), sans-serif',
  'Playfair Display': 'var(--font-playfair-display), serif',
  "'Playfair Display'": 'var(--font-playfair-display), serif',
  
  // Body Fonts
  'Inter': 'var(--font-inter), sans-serif',
  'Plus Jakarta Sans': 'var(--font-plus-jakarta-sans), sans-serif',
  'DM Sans': 'var(--font-dm-sans), sans-serif',
  'Space Mono': 'var(--font-space-mono), monospace',
  'Lexend': 'var(--font-lexend), sans-serif',
  'Poppins': 'var(--font-poppins), sans-serif',
};

export const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
  // Typography
  const [displayFont, setDisplayFont] = useState('Anton');
  const [bodyFont, setBodyFont] = useState('Inter');

  // Colors
  const [bgColor, setBgColor] = useState('#0a0a0a');
  const [cardColor, setCardColor] = useState('#324444');
  const [textColor, setTextColor] = useState('#ffffff');

  // Effects
  const [blur, setBlur] = useState(4);
  const [transparency, setTransparency] = useState(0.01);

  // Content
  const [header, setHeader] = useState("Hi, I'm Max Reed! Turning bold ideas into reality.");
  const [description, setDescription] = useState("Digital product designer focusing on immersive experiences and fluid interfaces.");
  const [email, setEmail] = useState("hello@maxreed.design");
  const [phone, setPhone] = useState("+1 (555) 234-5678");
  
  // Career Data
  const [careerData, setCareerData] = useState([
    { id: 1, role: 'Lead Designer', company: 'Acme Corp', year: '2023', description: 'Led product design team', source: 'manual' },
    { id: 2, role: 'Senior UX', company: 'Globex', year: '2021', description: 'Redesigned core platform', source: 'manual' },
    { id: 3, role: 'UI Designer', company: 'Initech', year: '2019', description: 'Design system creation', source: 'manual' },
    { id: 4, role: 'Intern', company: 'Stark Ind.', year: '2018', description: 'Prototyping & testing', source: 'manual' },
  ]);

  const [careerGridLayout, setCareerGridLayout] = useState('4-col');

  // Media URLs
  const [mediaUrls, setMediaUrls] = useState({
    backgroundVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4',
    tenMVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4',
    dailySoftwareVideo: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4',
    clientVoiceImage: '',
    reachMeImage: ''
  });

  // Portfolio Cards
  const [portfolioCards, setPortfolioCards] = useState([
    { 
      id: 'card-1', type: 'quote', title: 'Client Voice', width: 1, height: 'auto', order: 0,
      content: { quote: "Max completely transformed our digital presence with a stunning eye for detail.", attribution: "Elena Brooks, Creative Director — Halcyon", bgColor: '#324444' }
    },
    { 
      id: 'card-2', type: 'stats', title: 'Statistics', width: 1, height: 'tall', order: 1,
      content: { number: '10M+', label: 'Raised for startups', icon: 'TrendingUp' }
    },
    { 
      id: 'card-3', type: 'image', title: 'Daily Software', width: 2, height: 'tall', order: 2,
      content: { mediaUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4', overlayText: 'DAILY SOFTWARE' }
    },
    { 
      id: 'card-4', type: 'contact', title: 'Reach Me', width: 1, height: 'auto', order: 3,
      content: { email: 'hello@maxreed.design', phone: '+1 (555) 234-5678', socialLinks: [] }
    }
  ]);

  // Career Functions
  const addCareer = (careerItem) => setCareerData(prev => [...prev, { ...careerItem, id: Date.now() }]);
  const deleteCareer = (id) => setCareerData(prev => prev.filter(item => item.id !== id));
  const updateCareer = (id, updates) => setCareerData(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  const reorderCareer = (fromIndex, toIndex) => {
    setCareerData(prev => {
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  // Portfolio Card Functions
  const addCard = (type) => {
    const newCard = {
      id: `card-${Date.now()}`,
      type,
      title: `New ${type} Card`,
      width: 1,
      height: 'auto',
      order: portfolioCards.length,
      content: {}
    };
    setPortfolioCards(prev => [...prev, newCard]);
  };
  
  const deleteCard = (id) => setPortfolioCards(prev => prev.filter(card => card.id !== id));
  
  const updateCard = (id, updates) => {
    setPortfolioCards(prev => prev.map(card => card.id === id ? { ...card, ...updates } : card));
  };
  
  const reorderCard = (fromIndex, toIndex) => {
    setPortfolioCards(prev => {
      const updated = [...prev].sort((a, b) => a.order - b.order);
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated.map((card, index) => ({ ...card, order: index }));
    });
  };

  const updateCardSize = (id, width, height) => {
    updateCard(id, { width, height });
  };

  const updateMediaUrl = (mediaKey, url) => setMediaUrls(prev => ({ ...prev, [mediaKey]: url }));

  // Firestore Sync Logic — driven by Firebase Auth session
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Listen to the actual Firebase Auth session
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user.uid === the username (set via adminAuth.createUser({ uid: username }) during activation)
        const uid = user.uid;
        setUsername(uid);

        // Listen to Firestore profile document for this authenticated user
        const unsubSnapshot = onSnapshot(doc(db, 'profiles', uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.header) setHeader(data.header);
            if (data.bio) setDescription(data.bio);
            if (data.email) setEmail(data.email);
            if (data.phone) setPhone(data.phone);
            if (data.themeColors) {
              setBgColor(data.themeColors.bgColor || '#0a0a0a');
              setCardColor(data.themeColors.cardColor || '#324444');
              setTextColor(data.themeColors.textColor || '#ffffff');
            }
            if (data.typography) {
              setDisplayFont(data.typography.displayFont || 'Anton');
              setBodyFont(data.typography.bodyFont || 'Inter');
            }
            if (data.effects) {
              setBlur(data.effects.blur ?? 4);
              setTransparency(data.effects.transparency ?? 0.01);
            }
            if (data.chosenLayout) setCareerGridLayout(data.chosenLayout);
            if (data.careerData) setCareerData(data.careerData);
            if (data.widgetStates) setPortfolioCards(data.widgetStates);
            if (data.mediaUrls) setMediaUrls(data.mediaUrls);
          }
          // If doc doesn't exist, keep the default mock template (first-time user)
        }, (error) => {
          console.error("Error fetching profile:", error);
        });

        // Cleanup snapshot listener when auth state changes
        return () => unsubSnapshot();
      } else {
        setUsername(null);
      }
    });

    return () => unsubAuth();
  }, []);

  const saveProfile = async () => {
    if (!username) {
      toast.error('You must be logged in to save.');
      return;
    }
    setIsSaving(true);
    try {
      const profileRef = doc(db, 'profiles', username);
      const dataToSave = {
        header,
        bio: description,
        email,
        phone,
        themeColors: { bgColor, cardColor, textColor },
        typography: { displayFont, bodyFont },
        effects: { blur, transparency },
        chosenLayout: careerGridLayout,
        careerData,
        widgetStates: portfolioCards,
        mediaUrls,
        updatedAt: Date.now()
      };
      await setDoc(profileRef, dataToSave, { merge: true });
      // Returns true so caller can show inline feedback
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save. Check your connection.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const publishProfile = async () => {
    if (!username) {
      toast.error('You must be logged in to publish.');
      return false;
    }
    setIsPublishing(true);
    try {
      const profileRef = doc(db, 'profiles', username);
      const dataToSave = {
        header,
        bio: description,
        email,
        phone,
        themeColors: { bgColor, cardColor, textColor },
        typography: { displayFont, bodyFont },
        effects: { blur, transparency },
        chosenLayout: careerGridLayout,
        careerData,
        widgetStates: portfolioCards,
        mediaUrls,
        updatedAt: Date.now(),
        isPublished: true,
        lastPublishedAt: Date.now()
      };
      await setDoc(profileRef, dataToSave, { merge: true });
      // Returns true so caller can open the success modal
      return true;
    } catch (error) {
      console.error('Error publishing profile:', error);
      toast.error('Failed to publish. Check your connection.');
      return false;
    } finally {
      setIsPublishing(false);
    }
  };

  const displayFontFamily = fontStyleMap[displayFont] || displayFont;
  const bodyFontFamily = fontStyleMap[bodyFont] || bodyFont;

  const value = {
    displayFont, setDisplayFont,
    bodyFont, setBodyFont,
    displayFontFamily,
    bodyFontFamily,
    bgColor, setBgColor,
    cardColor, setCardColor,
    textColor, setTextColor,
    blur, setBlur,
    transparency, setTransparency,
    header, setHeader,
    description, setDescription,
    email, setEmail,
    phone, setPhone,
    careerData, setCareerData,
    careerGridLayout, setCareerGridLayout,
    addCareer, deleteCareer, updateCareer, reorderCareer,
    mediaUrls, updateMediaUrl,
    portfolioCards, setPortfolioCards, addCard, deleteCard, updateCard, reorderCard, updateCardSize,
    saveProfile, publishProfile, isSaving, isPublishing, isPublic: false, username
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};