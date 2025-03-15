import Gallery from "../components/Gallery";


const ShowImage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full md:h-screen pt-20 ">
      <div className="w-full h-full flex flex-col justify-center">
        <div className=" bg-white p-4 h-full rounded-lg">
          <Gallery />
        </div>
      </div >
    </div>
  );

}

export default ShowImage;