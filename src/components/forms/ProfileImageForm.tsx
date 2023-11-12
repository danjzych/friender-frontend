import {useState} from 'react'
import {useNavigate} from 'react-router-dom';
interface ProfileImageFormProps {
    handleSubmit: ({ }) => void;
}

function ProfileImageform({handleSubmit}: ProfileImageFormProps) {
    const navigate = useNavigate();
    const [file, setFile] = useState()

    function onFileChange(evt) {
        setFile(evt.target.files[0])
    }


    function handleFileSubmit(evt){
        evt.preventDefault();
        //JS way is to grab whole form, then convert that into form data:
        const formData = new FormData();
        formData.append('image', file)
        handleSubmit(formData);
        navigate("/profile");
    }

    return (<form onSubmit={handleFileSubmit} className='ProfileImageForm'>
        <h2>Add an Image</h2>
        <input type='file' accept=".jpg,.png,.jpeg" name='image' onChange={onFileChange}/>
        <button>Add Profile Photo</button>
    </form>)
}
export default ProfileImageform