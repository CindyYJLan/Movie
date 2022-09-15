import './FilmRow.css'
import { Link } from 'react-router-dom'

function FilmRow(props) {
  return (
    <div>
      <div className="FilmRow">
        <img
          src={`https://image.tmdb.org/t/p/w780${props.poster_path}`}
          alt={props.title}
        />
        <div className="film-summary">
          <h3>{props.title}</h3>
          <p>{new Date(props.release_date).getFullYear()}</p>
        </div>

        <Link to={`/films/${props.id}`} className="action">
          <span className="material-icons">read_more</span>
        </Link>

        <button
          onClick={
            props.isFav === 'add_to_queue'
              ? props.addToFavHandler
              : props.deleteFavHandler
          }
          value={props.id}
          className="fave"
        >
          <span className="material-icons">{props.isFav}</span>
        </button>
      </div>
    </div>
  )
}

export default FilmRow
