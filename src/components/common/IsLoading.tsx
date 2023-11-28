import './IsLoading.css'

/**
 * Loading Spinner used throughout Friender.
 *
 * Props: None
 *
 * State: None
 *
 * Context: None
 *
 * A component making API request -> LoadingSpinner
 */
function IsLoading() {
  return (
    <div className='IsLoading'>
      <div className='IsLoading-spinner'></div>
    </div>
  );
}

export default IsLoading;