"use client";
import React from 'react';
import { EditorContext } from '../context/EditorContext';

const PublicProvider = ({ children, data }) => {
  const value = {
    displayFont: data.typography?.displayFont || 'Anton',
    bodyFont: data.typography?.bodyFont || 'Inter',
    bgColor: data.themeColors?.bgColor || '#0a0a0a',
    cardColor: data.themeColors?.cardColor || '#324444',
    textColor: data.themeColors?.textColor || '#ffffff',
    blur: data.effects?.blur ?? 4,
    transparency: data.effects?.transparency ?? 0.01,
    header: data.header || '',
    description: data.bio || '',
    email: data.email || '',
    phone: data.phone || '',
    careerData: data.careerData || [],
    careerGridLayout: data.chosenLayout || '4-col',
    portfolioCards: data.widgetStates || [],
    mediaUrls: data.mediaUrls || {},
    isPublic: true,
    // Dummy functions — public view is read-only
    setBgColor: () => { }, setCardColor: () => { }, setTextColor: () => { },
    setDisplayFont: () => { }, setBodyFont: () => { },
    setBlur: () => { }, setTransparency: () => { },
    setHeader: () => { }, setDescription: () => { },
    addCard: () => { }, deleteCard: () => { }, updateCard: () => { }, reorderCard: () => { },
    updateMediaUrl: () => { }, addCareer: () => { }, deleteCareer: () => { }, updateCareer: () => { }, reorderCareer: () => { }
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export default PublicProvider;
