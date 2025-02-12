import './App.css'
import UploadButton from './components/ImageUpload'


function App() {
  const handleFileSelect = (file:File | null) => {
    if(file){
      console.log(file.name)
    }
  }

  return (
    <div>
      < UploadButton onImageSelect={handleFileSelect}/>
    </div>
  );
};

export default App
