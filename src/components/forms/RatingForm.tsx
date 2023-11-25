import thumbsUp from "../../images/icons/thumbs-up.svg";
import thumbsDown from "../../images/icons/thumbs-down.svg";

function RatingForm({rater, rated, handleRating}) {

  function handleClick(evt:React.MouseEvent<HTMLElement>): void {
    const rating = evt.currentTarget.dataset.isliked;
    handleRating(rater, rated, rating);
  }

  return (
    <>
      <button className="btn btn-error btn-circle" data-isliked="false" onClick={handleClick}>
        <img src={thumbsDown} alt="Thumbs down icon" className="w-6" />
      </button>
      <button className="btn btn-success btn-circle" data-isliked="true" onClick={handleClick}>
        <img src={thumbsUp} alt="Thumbs up icon" className="w-6" />
      </button>
    </>
  );
}


export default RatingForm;