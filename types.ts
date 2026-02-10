// Import React to resolve the 'Cannot find namespace React' error for React.ReactNode
import React from 'react';

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
  date?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface LeadData {
  name: string;
  whatsapp: string;
}