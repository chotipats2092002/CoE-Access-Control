import Gallery from "../components/Gallery";


const ShowImage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-full md:h-screen pt-20 ">
      <div className="w-full h-full flex flex-col justify-center p-4">
        <div className=" bg-white p-6 h-full rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
          <Gallery />
        </div>
      </div >
    </div>
  );

}

export default ShowImage;