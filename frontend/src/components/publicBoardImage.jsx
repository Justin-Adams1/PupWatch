const PublicBoardImage = (props)=>{

  return(
      <div className="d-flex p-2 col-example">
          <img src={props.url} alt="" width="100" height="100"></img> 
      </div>
  )
}

export default PublicBoardImage;