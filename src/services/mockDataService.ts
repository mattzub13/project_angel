import mockData from '../data/data_mock.json';

export interface Pyme {
  id: string;
  nombre: string;
  categoria: string;
  rating: number;
  descripcionCorta: string;
  necesidad: string;
  ubicacion: {
    lat: number;
    lng: number;
  };
  montoNecesario: number;
  ai_analysis: {
    success: boolean;
    analysis: {
      relevance_score: number;
      analysis_summary: string;
    };
  };
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
}

export interface MockData {
  pymes: Pyme[];
  features: Feature[];
}

export const getMockData = (): MockData => {
  return mockData as MockData;
};

export const getPymes = (): Pyme[] => {
  return mockData.pymes;
};

export const getFeatures = (): Feature[] => {
  return mockData.features;
};

export const getPymeById = (id: string): Pyme | undefined => {
  return mockData.pymes.find(pyme => pyme.id === id);
}; 