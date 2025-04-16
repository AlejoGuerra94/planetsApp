import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { planetImages } from "../Planets/constants";
import Loader from "../../component/Loader";
import useFavorites from "../../utils/favorite";
import { heart,heartRed } from "../../assets";

import styles from "./planetDetail.module.scss";

const PlanetDetail = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const [planet, setPlanet] = useState<IPlanet | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(planetId || "");

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await fetch(
          `https://api.le-systeme-solaire.net/rest/bodies/${planetId}`
        );
        const data = await response.json();
        setPlanet(data);
      } catch (error) {
        console.error("Error fetching planet details:", error);
      }
    };

    fetchPlanet();
  }, [planetId]);

  if (!planet) return <Loader />;
 
  return (
    <div className={styles.detailContainer}>
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        Volver
      </button>

      <div className={styles.detailHeader}>
        <h2>{planet.englishName}</h2>
        <button
          onClick={() => toggleFavorite(planetId!)}
          className={styles.favoriteButton}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          {isFavorite ? (
            <img
              src={heartRed}
              alt="Icono corazón rojo"
              className={styles.favoriteIcon}
            />
          ) : (
            <img
              src={heart}
              alt="Icono corazón blanco"
              className={styles.favoriteIcon}
            />
          )}
        </button>
      </div>
      <div className={styles.details}>
        <img
          src={planetImages[planet.id]}
          alt={planet.englishName}
          className={styles.detailImage}
        />
        <div className={styles.detailInfo}>
          <p>
            <strong>Gravedad:</strong> {planet.gravity} m/s²
          </p>
          <p>
            <strong>Densidad:</strong> {planet.density} g/cm³
          </p>
          <p>
            <strong>Lunas:</strong>
            {planet.moons ? planet.moons.length : 0}
          </p>
          <p>
            <strong>Inclinación:</strong> {planet.inclination}
          </p>
          <p>
            <strong>Descubierto por:</strong>{" "}
            {planet.discoveredBy ? planet.discoveredBy : "Desconocido"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
