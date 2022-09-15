import './FilmDetail.css'

function FilmDetail(props) {
  if (!props.film) {
    return FilmDetailEmpty()
  }
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280${props.film.backdrop_path}`}
          alt={props.film.title}
        />
        <h1 className="film-title">{props.film.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780${props.film.poster_path}`}
            className="film-detail-poster"
            alt={props.film.title}
          />
          {props.film.overview}
        </p>
      </div>
    </div>
  )
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export default FilmDetail
