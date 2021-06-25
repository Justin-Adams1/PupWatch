
import '../components/css/main.css';
const ProfileImage = (props)=>{

  return(
      <div className="ownerImg">
          <img src={props.url} alt="" width="400" height="fit"></img> 
      </div>
  )
}

export default ProfileImage;