const PupImg = (props)=>{

  return(
      <div className="d-flex p-2 col-example">
          <img src={props.url} alt="" width="310" max-height="600px"></img> 
      </div>
  )
}

export default PupImg;