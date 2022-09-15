import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FilmDetail from './FilmDetail'
import './FilmLibrary.css'
import './FilmRow.css'
import FilmRow from './FilmRow'

function FilmLibrary() {
  const [selectedFilmId, setSelectedFilmId] = useState()
  const [selectedFilm, setSelectedFilm] = useState()
  const [currentFilm, setCurrentFilm] = useState()
  const [favFilm, setFavFilm] = useState([])
  const [allFilm, setAllFilm] = useState([])
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY
  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&primary_release_year=2022`
    fetch(movieUrl)
      .then((response) => response.json())
      .then((result) => {
        setAllFilm(result.results)
        setCurrentFilm(result.results)
      })
  }, [])

  let params = useParams()

  useEffect(() => {
    if (params.filmId) {
      setSelectedFilmId(params.filmId)
    } else {
      setSelectedFilm()
    }
  })

  useEffect(() => {
    if (selectedFilmId) {
      const TMDBUrl = `https://api.themoviedb.org/3/movie/${selectedFilmId}?api_key=${TMDB_API_KEY}`

      fetch(TMDBUrl)
        .then((response) => response.json())
        .then((result) => {
          setSelectedFilm(result)
        })
        .catch((error) => {
          'Opps, error here!'
        })
    }
  }, [selectedFilmId])

  const allFilmHandler = (event) => {
    setCurrentFilm(allFilm)
    event.currentTarget.className = 'film-list-filter is-active'
    document.getElementById('favButton').className = 'film-list-filter'
  }

  const favHandler = (event) => {
    setCurrentFilm(favFilm)
    event.currentTarget.className = 'film-list-filter is-active'
    document.getElementById('allButton').className = 'film-list-filter'
  }

  const addToFavHandler = (event) => {
    const selectedFilm = event.currentTarget.value * 1
    const newFavFilm = allFilm.filter((x) => x.id === selectedFilm)
    setFavFilm([...favFilm, ...newFavFilm])
  }

  const deleteFavHandler = (event) => {
    const selectedFilm = event.currentTarget.value * 1
    const newFavFilm = favFilm.filter((x) => x.id !== selectedFilm)
    setFavFilm(newFavFilm)
    setCurrentFilm(newFavFilm)
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button
            id="allButton"
            onClick={allFilmHandler}
            className="film-list-filter is-active"
          >
            ALL
            <span className="section-count">{allFilm.length}</span>
          </button>
          <button
            id="favButton"
            onClick={favHandler}
            className="film-list-filter"
          >
            FAVES
            <span className="section-count">{favFilm.length}</span>
          </button>
        </div>

        {Array.isArray(currentFilm)
          ? currentFilm.map((x) => (
              <FilmRow
                key={x.id}
                id={x.id}
                title={x.title}
                poster_path={x.poster_path}
                backdrop_path={x.backdrop_path}
                overview={x.overview}
                release_date={x.release_date}
                addToFavHandler={addToFavHandler}
                deleteFavHandler={deleteFavHandler}
                isFav={
                  favFilm.some((film) => film.id === x.id)
                    ? 'remove_from_queue'
                    : 'add_to_queue'
                }
              />
            ))
          : ''}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <FilmDetail film={selectedFilm} />
      </div>
    </div>
  )
}

export default FilmLibrary
