import thumbsUp from "../../images/icons/thumbs-up.svg";
import thumbsDown from "../../images/icons/thumbs-down.svg";

function RatingForm({rater, rated, handleRating}) {

  function handleClick(evt): void {
    const rating = evt.target.dataset.isliked
    // const isLiked = Boolean(rating);
    // console.log(evt.target.dataset.isliked);
    // console.log(rating)
    // console.log(isLiked)
    handleRating(rater, rated, rating);
  }

  return (
    <>
      <button className='btn btn-error btn-circle' data-isliked="false" onClick={handleClick}>
        <img src={thumbsDown} alt="Thumbs down icon" className="w-6" />
      </button>
      <button className='btn btn-success btn-circle' data-isliked="true" onClick={handleClick}>
        <img src={thumbsUp} alt="Thumbs up icon" className="w-6" />
      </button>
    </>
  );
}


export default RatingForm;