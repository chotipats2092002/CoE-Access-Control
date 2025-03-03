import { PureComponent } from "react";
import Gallery from "../components/Gallery";

export class ShowImage extends PureComponent {
  render() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
        <Gallery />
      </div>
    );
  }
}

export default ShowImage;
