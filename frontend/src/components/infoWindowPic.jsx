
import '../components/css/main.css';
const InfoWindowPic = (props)=>{

  return(
      <div className="ownerImg">
          <img src={"http://localhost:5000/" + props.url} alt="" width="250"></img> 
      </div>
  )
}

export default InfoWindowPic;