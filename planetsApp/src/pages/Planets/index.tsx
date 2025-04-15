import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../component/Card/Index";
import { planetImages } from "./constants";
import Loader from "../../component/Loader";

import styles from "./planets.module.scss";

const PlanetsApp = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch(
          "https://api.le-systeme-solaire.net/rest/bodies/"
        );
        const data = await response.json();
        const realPlanets = data.bodies.filter(
          (body: IPlanet) => body.isPlanet
        );
        setPlanets(realPlanets);
      } catch (error) {
        console.error("Error en la carga de los planetas:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1>Planetas del Sistema Solar</h1>
      <div className={styles.cardContainer}>
        {planets.map((planet) => (
          <div
            key={planet.id}
            onClick={() => navigate(`/planets/${planet.id}`)}
            className={styles.card}
          >
            <Card
              title={planet.englishName}
              className={styles.cardPlanet}
              image={{
                src: planetImages[planet.id],
                alt: planet.name,
                classNameImg: styles.img,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetsApp;
