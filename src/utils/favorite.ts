import { useState, useEffect } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoritePlanets');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritePlanets', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (planetId: string) => {
    setFavorites(prev => 
      prev.includes(planetId)
        ? prev.filter(id => id !== planetId) 
        : [...prev, planetId] 
    );
  };
  return { favorites, toggleFavorite };
};

export default useFavorites;