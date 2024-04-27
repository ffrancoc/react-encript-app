import "./App.css";
import CopyIcon from './assets/copy.svg';

function App() {
  return (
    <div className="container">
      <div className="padlock">
        <div>
          <input type="text" placeholder="INGRESE TEXTO" />
        </div>

        <div>
          <button>AES</button>
          <button>MD5</button>
          <button>SHA256</button>
          <button>SHA512</button>
        </div>

        <div>
          <textarea className="resultado" cols={30} rows={6} disabled></textarea>
          <button><img src={CopyIcon} alt="..."/></button>
        </div>
      </div>
    </div>
  );
}

export default App;
