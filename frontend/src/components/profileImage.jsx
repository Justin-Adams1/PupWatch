const ProfileImage = (props)=>{

  console.log("img page", props.url);

  return(
      <div className="d-flex p-2 col-example">
          <img src={props.url} alt="" width="400"></img> 
      </div>
  )
}

export default ProfileImage;