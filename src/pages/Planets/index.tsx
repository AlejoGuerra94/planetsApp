import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../component/Card/Index";
import { planetImages } from "./constants";
import Loader from "../../component/Loader";
import { Input } from "../../component/Input";
import { Select } from "../../component/Select";
import { Pagination } from "../../component/Pagination";

import styles from "./planets.module.scss";

const PlanetsApp = () => {
  const ITEMS_PER_PAGE = 4;

  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") || "asc";
  const page = parseInt(searchParams.get("page") || "1");

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
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const filterPlanets = planets.filter((planet) =>
    planet.englishName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAndSortedPlanets = [...filterPlanets].sort((a, b) => {
    const nameA = a.englishName.toLowerCase();
    const nameB = b.englishName.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const totalPages = Math.ceil(
    filteredAndSortedPlanets.length / ITEMS_PER_PAGE
  );
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedPlanets = filteredAndSortedPlanets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const searchChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", value);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const sortChange = (value: "asc" | "desc") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  const pageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Planetas del sistema solar</h1>

      <div className={styles.filtersContainer}>
        <Input
          type="text"
          placeholder="Buscar Planeta"
          value={search}
          onChange={(e) => searchChange(e.target.value)}
        />
        <Select
          value={sortOrder}
          onChange={(value) => sortChange(value)}
        />
      </div>
      </div>
      <div className={styles.cardContainer}>
        {paginatedPlanets.map((planet) => (
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
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={pageChange}
        />
      )}
    </div>
  );
};

export default PlanetsApp;
