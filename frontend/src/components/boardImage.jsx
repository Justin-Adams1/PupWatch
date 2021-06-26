const BoardImage = (props)=>{

  return(
      <div className="d-flex p-2 col-example">
          <img src={props.url} alt="" width="420" height="500"></img> 
      </div>
  )
}

export default BoardImage;