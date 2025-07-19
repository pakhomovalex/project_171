'use client';

import { projects } from "@/app/page";
import { Pagination } from "../Pagination/Pagination";
import styles from './ProjectsCategoryPagintaion.module.scss';
import ProjectCard from "../ProjectCard/ProjectCard";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation'

type CategoryKey = 'all' | 'painters' | 'jewerly' | 'decoration' | 'clothes' | 'games' | 'digital';

export default function ProjectCategoryPagination() {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const categoryMap: Record<string, keyof typeof category> = {
    'Всі проекти': 'all',
    'Мистецтво': 'painters',
    'Прикраси та аксесуари': 'jewerly',
    'Дім та декор': 'decoration',
    'Одяг': 'clothes',
    'Настільні ігри та іграшки': 'games',
    'Діджитал арт': 'digital',
  };

  const router = useRouter()
  const searchParams = useSearchParams()

  const urlFilters = searchParams.get('filters')?.split(',') || [];
  const urlPage = parseInt(searchParams.get('page') || '1', 10);

  const [page, setPage] = useState(isNaN(urlPage) || urlPage < 1 ? 1 : urlPage);

  const [category, setCategory] = useState<Record<CategoryKey, boolean>>({
    all: urlFilters.length === 0,
    painters: urlFilters.includes('painters'),
    jewerly: urlFilters.includes('jewerly'),
    decoration: urlFilters.includes('decoration'),
    clothes: urlFilters.includes('clothes'),
    games: urlFilters.includes('games'),
    digital: urlFilters.includes('digital'),
  })

  useEffect(() => {
    const params = new URLSearchParams()

    if (page > 1) params.set('page', page.toString())

    const activeFilters = Object.entries(category)
      .filter(([key, val]) => key !== 'all' && val)
      .map(([key]) => key)
      .join(',')

    if (activeFilters) {
      params.set('filters', activeFilters)
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }, [page, category, router])


  const itemsPerPage = 6;
  const totalItems = filteredProjects.length;

  const projectsAndPage = filteredProjects.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const reverseCategoryMap: Record<CategoryKey, string> = Object.entries(categoryMap).reduce(
    (acc, [uaName, key]) => {
      acc[key] = uaName;
      return acc;
    },
    {} as Record<CategoryKey, string>
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const [displayName, key] of Object.entries(categoryMap)) {
      const count = projects.filter(project =>
        project.category.includes(reverseCategoryMap[key])
      ).length;

      counts[displayName] = count;
    }

    return counts;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reverseCategoryMap]);

  const selectedCategoryNames = useMemo(() => {

    return Object.entries(category)
      .filter(([key, value]) => value && key !== 'all')
      .map(([key]) => reverseCategoryMap[key as CategoryKey]);
  }, [category, reverseCategoryMap]);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projectCategoryToKey: Record<string, keyof typeof category> = {
      'Мистецтво': 'painters',
      'Прикраси та аксесуари': 'jewerly',
      'Дім та декор': 'decoration',
      'Одяг': 'clothes',
      'Настільні ігри та іграшки': 'games',
      'Діджитал арт': 'digital',
    };

    const filteredProjects = category.all
      ? projects
      : projects.filter(p => {
        const key = projectCategoryToKey[p.category];
        return category[key];
      });

    setFilteredProjects(filteredProjects);
    setPage(1);
  }, [category]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.category}>
        <p className={styles.category__text}>
          Категорії:
        </p>
        <div className={styles.category__categoryBox}>
          <button
            className={styles.category__button}
            onClick={() => setIsOpen(true)}
          >
            <p>
              {selectedCategoryNames.length > 0 ?
                selectedCategoryNames.join(', ').length > 21 ?
                  `${selectedCategoryNames.join(', ').slice(0, 21)}...`
                  : selectedCategoryNames.join(', ')
                : 'Всі проекти'
              }
            </p>
            <Image
              src={"/arrow-bottom.svg"}
              alt={"arrow bottom"}
              width={18}
              height={18}
              className={styles.category__buttonImage}
            />
          </button>
          <div ref={boxRef} className={`${styles.category__checkboxBox} ${isOpen ? styles.open : styles.closed}`}>
            {[
              'Всі проекти',
              'Мистецтво',
              'Прикраси та аксесуари',
              'Дім та декор',
              'Одяг',
              'Настільні ігри та іграшки',
              'Діджитал арт'
            ].map(label => {
              const key = categoryMap[label];

              return (
                <label key={label} className={styles.category__label}>
                  <div className={styles.category__labelBox}>
                    <input
                      type="checkbox"
                      className={styles.category__input}
                      checked={category[key]}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setCategory(prev => {
                          if (key === 'all') {
                            return {
                              all: true,
                              painters: false,
                              jewerly: false,
                              decoration: false,
                              clothes: false,
                              games: false,
                              digital: false
                            };
                          } else {
                            const updated = {
                              ...prev,
                              [key]: checked,
                              all: false,
                            };
                            const anySelected = Object.entries(updated)
                              .filter(([k]) => k !== 'all')
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              .some(([_, val]) => val);
                            if (!anySelected) updated.all = true;
                            return updated;
                          }
                        });
                      }}
                    />
                    <span className={styles.category__span}></span>
                    {label}
                  </div>
                  <p>
                    {label === 'Всі проекти' ? projects.length : categoryCounts[label]}
                  </p>
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.line} />
      <p className={styles.projectsShown}>
        {(projectsAndPage.length === 1) ? ('Показано 1 проект')
          : (projectsAndPage.length < 5
            && `Показано ${projectsAndPage.length} проекти`
          )}
        {(projectsAndPage.length === 0 || projectsAndPage.length >= 5) && `Показано ${projectsAndPage.length} проектів`}
      </p>
      <div className={styles.projects}>
        {projectsAndPage.map(project => {
          const {
            id,
            title,
            percent,
            description,
            image,
            lastDate,
            category,
          } = project;

          return <ProjectCard
            key={id}
            id={id}
            title={title}
            percent={percent}
            description={description}
            image={image}
            lastDate={lastDate}
            category={category}
          />
        })}
      </div>
      <Pagination
        total={totalItems}
        currentPage={page}
        onPageChange={(currentPage: number) => {
          setPage(currentPage);
        }}
      />
    </>
  );
};