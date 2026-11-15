import './Card.css'

function Card({ title, mediaUrl, tags = [], metadata = [] }) {
  return (
    <div className="card">
      {mediaUrl && (
        <img
          src={mediaUrl}
          alt={title}
          className="card-image"
        />
      )}

      <div className="card-content">
        <h3>{title}</h3>

        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        )}

        {metadata.length > 0 && (
          <div className="card-metadata">
            {metadata.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card