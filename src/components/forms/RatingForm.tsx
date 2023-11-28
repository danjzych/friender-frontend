import thumbsUp from "../../images/icons/thumbs-up.svg";
import thumbsDown from "../../images/icons/thumbs-down.svg";


/**
 * Form to rate another user in Friender. Vestigial component from old version,
 * will be refactored out and into FriendCard.
 *
 * props: rater, rated, handleRating
 *
 * State: None
 *
 * Context: None
 *
 * FriendCard -> RatingForm -> None
 */
function RatingForm({rater, rated, handleRating}) {

  /** Submit rating for user */
  function handleClick(evt:React.MouseEvent<HTMLElement>): void {
    const rating = evt.currentTarget.dataset.isliked;
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