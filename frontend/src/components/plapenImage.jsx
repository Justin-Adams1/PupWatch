
import '../components/css/main.css';
const PlaypenImage = (props)=>{

  return(
      <div className="ownerImg">
          <img src={props.url} alt="" width="fit" height="fit"></img> 
      </div>
  )
}

export default PlaypenImage;